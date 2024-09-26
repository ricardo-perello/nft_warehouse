use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData)]
pub struct OwnerReceipt {
    pub deposited_nft: NonFungibleGlobalId,
}
#[derive(ScryptoSbor)]
pub struct SaleConditions{
    price : Decimal,
    coin : ResourceAddress,
    vault_nft : Vault,
    vault_tokens : Vault,
    sold: bool,
}


#[blueprint] 
mod escrow {


    /// An Escrow is just a bunch of pools, each pool tied to the
    /// badge of its owner.
    struct Escrow {
        sale_condition : KeyValueStore<NonFungibleGlobalId, SaleConditions>,
         receipt_generator : ResourceManager,
        seller_badge_generator : ResourceManager,
    }

    impl Escrow {
        /// Note that the owner of an Escrow component has no
        /// particular power over it or its users.
        pub fn instantiate_escrow() -> Global<Escrow>
        {
            let resource = ResourceBuilder::new_ruid_non_fungible::<OwnerReceipt>(OwnerRole::None).create_with_no_initial_supply();
            let seller_badges_rm = ResourceBuilder::new_fungible(OwnerRole::None)
            .withdraw_roles(withdraw_roles!{
                withdrawer => rule!(deny_all);
                withdrawer_updater => rule!(deny_all);
            })
            .create_with_no_initial_supply();

            Self {
                sale_condition : KeyValueStore::new(),
                receipt_generator : resource,
                seller_badge_generator : seller_badges_rm,
            }
            .instantiate()
                .prepare_to_globalize(OwnerRole::None)
                .globalize()
        }

        /// Anyone can deposit NFTs into the escrow and get a corresponding receipt back.
        pub fn deposit_nft(&mut self,
                             nft: Bucket,
                             price : Decimal,
                             coin : ResourceAddress)
                             -> Bucket
        {
            let n = nft.as_non_fungible(); //Check bucket contains nft
            let resource_address = nft.resource_address();
            let global_id = NonFungibleGlobalId::new(resource_address, n.non_fungible_local_id());
            let nft_data : OwnerReceipt = OwnerReceipt {
                deposited_nft: global_id.clone()
            };
            
            let nft_receipt : Bucket = self.receipt_generator.mint_ruid_non_fungible(nft_data);
            self.sale_condition.insert(global_id, SaleConditions{price, coin, vault_nft : Vault::with_bucket(nft.into()), vault_tokens : Vault::new(coin), sold : false});
            nft_receipt
        }

        /// This function allows us to give the marketplaces a badge to sell our NFTs in escrow
        /// TODO : check needs to be added to seller, i.e (conceptually) Proof of authetic marketplace
        pub fn issue_seller_badge(&mut self) -> Bucket {
            self.seller_badge_generator.mint(1)
        }

        /// This function allows us to exchange the NFT for the requested resource that the user set as long as we have a proof from the seller that he has 
        /// the badge to sell the NFT issued by "issue_seller_badge"
        pub fn exchange(&mut self, seller_proof : Proof, requested_resource : Bucket, nft_global_id : NonFungibleGlobalId) -> NonFungibleBucket{
            seller_proof.check(self.seller_badge_generator.address());
            if self.sale_condition.get(&nft_global_id).unwrap().price >= requested_resource.amount() && self.sale_condition.get(&nft_global_id).unwrap().coin == requested_resource.resource_address(){
                self.sale_condition.get_mut(&nft_global_id).unwrap().sold = true;
                self.sale_condition.get_mut(&nft_global_id).unwrap().vault_tokens.put(requested_resource);
                self.sale_condition.get_mut(&nft_global_id).unwrap().vault_nft.as_non_fungible().take_non_fungible(nft_global_id.local_id())
            } else {
                panic!("The requested resource does not match the price of the NFT");
            }
        }



        /// The pool owner can use this function to withdraw funds
        /// from their pool. `caller` must be a proof of the pool
        /// owner.
        ///nted: Not implemented for non-wasm targets
        /// If the requested tokens aren't available we will panic.
        pub fn withdraw(&mut self,
                        nft_receipt: Bucket,
                        ) -> Bucket
        {
            
            let nft_data : OwnerReceipt = nft_receipt.as_non_fungible().non_fungible().data();
            let nft_global_id = nft_data.deposited_nft;
            let mut sale_condition = self.sale_condition.get_mut(&nft_global_id).unwrap();
            if sale_condition.sold {
                nft_receipt.burn();
                let amount = sale_condition.price;
                sale_condition.vault_tokens.take(amount)
            } else {
                panic!("The NFT has not been sold yet");
            }   
        }


        /// The pool owner can use this function to withdraw funds
        /// from their pool. `caller` must be a proof of the pool
        /// owner.
        ///
        /// If the requested tokens aren't available we will panic.
        pub fn cancel(&mut self,
            nft_receipt: Bucket,
            ) -> NonFungibleBucket
        {

            let nft_data : OwnerReceipt = nft_receipt.as_non_fungible().non_fungible().data();
            let nft_global_id = nft_data.deposited_nft;
            let mut sale_condition = self.sale_condition.get_mut(&nft_global_id).unwrap();
            if !sale_condition.sold {
                sale_condition.sold = true;
                nft_receipt.burn();
                sale_condition.vault_nft.as_non_fungible().take_non_fungible(nft_global_id.local_id())
            } else {
                panic!("The NFT has already been sold. You should withdraw the funds instead");
            }   
        }
    }
}