//! A component that stores funds for you and lets you access them
//! yourself or issue Allowance NFTs to let others access them.
//!
//! Think of an Escrow as an account component external to your
//! wallet, which is nevertheless under your control. You can use this
//! Escrow as a central place to hold funds that go into a variety of
//! services.
//!
// ! You can issue Allowance NFTs towards your Escrow and give those
// ! Allowances to others. Each Allowance NFT acts a bit like an IOU
// ! that the holder can use to extract funds from your Escrow, for as
// ! long as funds last.
// !
//! You could for example put 10k XRD into an Escrow, issue an
//! Allowance for 10k XRD and give to your son, and another Allowance
//! also for 10k XRD and give to your daughter. You explain to them
//! that these are emergency funds they can dip into if they get into
//! an emergency situation while travelling. You don't expect these
//! funds to ever actually get used, but they are there in full for
//! each of your two kids should the emergency ever arise.
//!
//! A single Escrow component can hold any amount of token pools, each
//! associated with an owner badge. That is, Alice can have a token
//! pool where she stores all sorts of different tokens while Bob can
//! also have a token pool on the same Escrow component instance that
//! Alice does. And of course, Alice or Bob could even have multiple
//! such sets of pools tied to different ownership badges still on the
//! same Escrow instance. (In principle there is no reason the world
//! should need more than a single instance of this component.) For
//! this reason, when interacting with an Escrow instance you always
//! need to know which owner badge to access, and which resource type
//! you're interested in.
//!
//! # Some use cases
//!
//! ## Curbing your enthusiasm
//!
//! You could put funds into Escrow intended for playing an online
//! game and issue an Allowance to that game that lets it charge its
//! fees off of the Escrow. By disassociating these payments from your
//! main account you can feel more safe about giving the game direct
//! access to funds (since the Escrow only holds as much funds as you
//! put there), and the Allowance system gives you fine grained
//! control over how much and how often the game can charge you. Or
//! you can use it to curb your own excitement: if you set it up so
//! the game can at max extract, say, 100 XRD per month, then this
//! effectively caps how much you end up spending on the game when
//! otherwise the excitement of the moment might have you spending
//! hundreds in a week without even realizing what's going on before
//! it's too late.
//!
//! ## Central trading account
//!
//! You can use an Escrow as a central repository of funds that you
//! use for trading activities. Markets that recognize the Escrow
//! concept can make payouts for completed deals into the Escrow
//! (instead of e.g. holding it inside their own internal vaults until
//! you come to collect), and can pull funds for covering your trade
//! deals also from the same Escrow. You could set this up to be
//! self-perpetuating (if your trades are clever enough) in that the
//! funds that go into the Escrow from completed deals fund your
//! future deals that are being taken from the same Escrow. Then every
//! once in a while you can drop by and skim off some of the profits
//! that have been happening since last payday.
//!
//! ## Selling all your tokens on all the exchanges
//!
//! If you're selling a million tokens of some type then instead of
//! putting them all on a single exchange, and instead of having to
//! meticulously distribute them across multiple exchanges, you can
//! put your million tokens in an Escrow and put an Allowance for a
//! million tokens on every exchange in the world. *All* the exchanges
//! can then offer your million tokens for sale, and all of them will
//! be pulling from your Escrow to fulfill trades. Once the Escrow is
//! empty, the exchanges will automatically no longer be doing those
//! trades because pulling from the Escrow will yield nothing.
//!
//! Note that test scenario 1 demonstrates this type of use case.
//!
//! ## Offering to buy more than you can afford
//!
//! You could use an Escrow to set up more trade deals than you can
//! technically afford, by setting up Allowance-backed trade deals
//! that are only going to actually be completed for so long as the
//! Escrow holds the necessary funds. Maybe you have 10,000 XRD and
//! you want to buy either USD or EURO stablecoins depending on which
//! drops below a certain threshold first. You set up one limit buy
//! for 10k XRD worth of USD, and one limit buy for 10k XRD worth of
//! EURO, each backed by Allowances that can pull the full 10k XRD in
//! your Escrow. Whichever of those happens first will pull all your
//! funds (and then even if the other happens later the trade won't go
//! through because you'll be out of funds). Contrast this to having
//! to bind up XRD into each limit buy in which case you'd end up with
//! a 5k XRD limit buy of USD and a 5k XRD limit buy of EURO.
//!
//! Note that test scenario 2 demonstrates this type of use case.
//!
//! ## Giving someone a (traditional) allowance account
//!
//! You could set up an Escrow as a funding mechanism for someone
//! you're helping finance, putting funds into the Escrow and giving
//! them an Allowance to extract those funds. This would give you
//! control over their use of the funds (through Allowance rules)
//! without them having to involve you directly every single time they
//! need to make a withdrawal.
//!
//! # Subsidies
//!
//! You can subsidize (internally it uses `lock_fee` or
//! `lock_contingent_fee`) the current transaction by pulling funds
//! from your Escrow, using the [subsidize] and [subsidize_contingent]
//! functions.
//!
//! You can also allow others to subsidize transactions by giving them
//! an Allowance and having them use [subsidize_with_allowance] to
//! pull XRD from your Escrow to run their transactions. You might be
//! doing this as a marketing stunt, or it may be a customer support
//! service, or perhaps it's to let a service run transactions on your
//! behalf etc.
//!
//! When using [subsidize_with_allowance] note the following:
//!
//! - If you're using an Accumulating allowance, that allowance will
//! be reduced by the amount you specify in the function call
//! regardless of how much actually gets spent on the subsidy. This is
//! because the component cannot know how much in fees you actually
//! end up paying. For example if you specify max 10 XRD in the
//! function call and only 5 XRD gets spent, the allowance remaining
//! amount is nevertheless reduced by 10 XRD.
//!
//! - Failed subsidized transactions will pull funds from your escrow
//! pool but this will not be reflected in the Allowance itself since
//! failed transactions cause no on-ledger changes apart from tx
//! cost. This means that a malicious allowance holder for XRD can use
//! it to drain your XRD by spamming failing transactions. For this
//! reason only issue XRD allowances to parties you can trust to be
//! honest. (This problem could be mitigated by introducing
//! configuration parameters to allow/disallow subsidies but the
//! current implementation is more intended to be a tech demo than a
//! fully deployable product and so this has not been done.)
//!
//! # Automatic Allowance issuance
//!
//! You can maintain a list of trusted parties who will automatically
//! receive Allowances whenever they deposit funds into your
//! account. You may use this if you have multiple different services
//! interacting with your Escrow pool (different market places
//! perhaps) and you want each such service to be able to take back
//! out funds they put in, in order to spend them on services or
//! trades.
//!
//! Such a party will need to provide a badge with a trusted
//! non-fungible global id, or simply with a trusted resource address,
//! when calling [deposit_funds] and they will receive back an
//! Allowance for that amount of the deposit.
//!
//! # Public API
//!
//! - [instantiate_escrow] Create a new Escrow instance.
//!
//! - [deposit_funds] Add funds to your Escrow pool.
//!
//! - [read_funds] See how many funds you have available.
//!
//! - [withdraw] Pull funds out of your Escrow pool.
//!
//! - [withdraw_with_allowance] Use an Allowance to pull funds out of
//! someone's Escrow pool.
//!
//! - [withdraw_all_of] Pull all funds of one type out of your Escrow
//! pool.
//!
//! - [subsidize] Pull XRD from your Escrow pool to subsidize the
//! current transaction.
//!
//! - [subsidize_with_allowance] Use an Allowance to pull XRD out of
//! someone's Escrow pool to subsidize the current transaction.
//!
//! - [subsidize_contingent] Pull XRD from your Escrow pool to
//! subsidize (contingent on its success) the current transaction.
//!
//! - [mint_allowance] Create an Allowance for your Escrow pool.
//!
//! - [reduce_allowance_to_amount] Reduce the amount of funds
//! available in an Allowance you control.
//!
//! - [reduce_allowance_by_nflids] Reduce the set of non-fungible ids
//! available in an Allowance you control.
//!
//! - [add_trusted_nfgid] Add a non-fungible global id to the list of
//! badges you trust to be given automatic Allowances when depositing
//! to your Escrow pool.
//!
//! - [remove_trusted_nfgid] Remove a non-fungible id to the list of
//! badges you trust.
//!
//! - [is_nfgid_trusted] Checks if a given non-fungible is trusted by
//! a specific Escrow pool.
//!
//! - [add_trusted_resource] Add a resource, all badges of which you
//! trust to be given automatic Allowances.
//!
//! - [remove_trusted_resource] Remove a resource from the trusted
//! resource list.
//!
//! - [is_resource_trusted] Checks if a given resource is trusted.
//!
//!
//! # About error messages
//!
//! Many error messages that are produced on panics in this code are
//! preceded with an error code, starting at error code 2000 for this
//! project. They are there to make each error easily recognizable in
//! the test suite so that I can easily test that a transaction that
//! is intended to fail fails for the correct reason.
//!
//! Note that as this is a fairly new idea, not all the error messages
//! have codes at this point.
//!
//! # About IndexSet sizes for non-fungible local ids
//!
//! Note that use of TokenQuantity introduces a possible cost unit
//! limit problem when the IndexSet inside gets large. The current
//! implementation is suitable for a moderate number of
//! nonfungible-ids in that set, but not very many.
//!
//! [instantiate_escrow]: crate::escrow::Escrow::instantiate_escrow
//! [deposit_funds]: crate::escrow::Escrow::deposit_funds
//! [read_funds]: crate::escrow::Escrow::read_funds
//! [withdraw]: crate::escrow::Escrow::withdraw
//! [withdraw_with_allowance]: crate::escrow::Escrow::withdraw_with_allowance
//! [withdraw_all_of]: crate::escrow::Escrow::withdraw_all_of
//! [subsidize]: crate::escrow::Escrow::subsidize
//! [subsidize_with_allowance]: crate::escrow::Escrow::subsidize_with_allowance
//! [subsidize_contingent]: crate::escrow::Escrow::subsidize_contingent
//! [mint_allowance]: crate::escrow::Escrow::mint_allowance
//! [reduce_allowance_to_amount]: crate::escrow::Escrow::reduce_allowance_to_amount
//! [reduce_allowance_by_nflids]: crate::escrow::Escrow::reduce_allowance_by_nflids
//! [add_trusted_nfgid]: crate::escrow::Escrow::add_trusted_nfgid
//! [remove_trusted_nfgid]: crate::escrow::Escrow::remove_trusted_nfgid
//! [is_nfgid_trusted]: crate::escrow::Escrow::is_nfgid_trusted
//! [add_trusted_resource]: crate::escrow::Escrow::add_trusted_resource
//! [remove_trusted_resource]: crate::escrow::Escrow::remove_trusted_resource
//! [is_resource_trusted]: crate::escrow::Escrow::is_resource_trusted

use scrypto::prelude::*;

/// An Allowance NFT allows its owner to extract some amount of tokens
/// from a pool. It is issued by the pool's owner, or it can be
/// returned to a depositor that is trusted by the pool owner.
///
/// Note that in the current implementation the owner of the pool is
/// able to recall any Allowance NFT issued for that pool. This may be
/// undesirable for some use cases, e.g. if you're selling an
/// Allowance to someone then they may want to have guarantees that it
/// won't be arbitrarily recalled before they use it. This component
/// should be fairly easy to modify to cover such use cases, e.g. by
/// having a configuration option or function parameter controlled by
/// the owner that allows the creation of non-recallable Allowance
/// NFTs.
#[derive(ScryptoSbor,ManifestSbor, NonFungibleData)]
pub struct OwnerReceipt {
    deposited_nft: NonFungibleGlobalId,
}

pub struct MarketBadge {
}
#[derive(ScryptoSbor)]
pub struct SaleConditions{
    price : Decimal,
    coin : ResourceAddress,
}

#[blueprint]
mod escrow {

    /// An Escrow is just a bunch of pools, each pool tied to the
    /// badge of its owner.
    struct Escrow {
        // Vaults : NFTreceipt => Vault
        vaults: KeyValueStore<NonFungibleGlobalId, NonFungibleVault>,
        sale_condition : KeyValueStore<NonFungibleGlobalId, SaleConditions>,
        receipt_generator : ResourceManager,
    }

    impl Escrow {
        /// Note that the owner of an Escrow component has no
        /// particular power over it or its users.
        pub fn instantiate_escrow() -> Global<Escrow>
        {
            let resource = ResourceBuilder::new_ruid_non_fungible::<OwnerReceipt>(OwnerRole::None).create_with_no_initial_supply();
            Self {
                vaults: KeyValueStore::new(),
                
                receipt_generator : resource,
            }
            .instantiate()
                .prepare_to_globalize(OwnerRole::None)
                .globalize()
        }
        /// Anyone can deposit funds into the escrow pool.
        ///
        /// The `funds` are deposited into the pool owned by `owner`.
        ///
        /// If the depositor provides a proof `allowance_requestor`
        /// showing that they are a trusted agent they will receive
        /// back an Allowance to withdraw the amount that they
        /// deposited in this call.
        pub fn deposit_nft(&mut self,
                             owner: NonFungibleGlobalId,
                             nft: NonFungibleBucket,
                             price : Decimal,
                             coin : ResourceAddress)
                             -> Bucket
        {
            let resource_address = nft.resource_address();
            let global_id = NonFungibleGlobalId::new(resource_address, nft.non_fungible_local_id());
            let global_id_clone = global_id.clone();
            let nft_data : OwnerReceipt = OwnerReceipt {
                deposited_nft: global_id
            };
            let nft_receipt : Bucket = self.receipt_generator.mint_ruid_non_fungible(nft_data);
            self.vaults.insert(global_id_clone, NonFungibleVault::with_bucket(nft));
            nft_receipt
        }

        /// The pool owner can use this function to withdraw funds
        /// from their pool. `caller` must be a proof of the pool
        /// owner.
        ///
        /// If the requested tokens aren't available we will panic.
        pub fn withdraw(&mut self,
                        caller: Proof,
                        resource: ResourceAddress) -> Bucket
        {
            let (take_nflids, take_amount) = quantity.extract_max_values();
            self.operate_on_vault(
                &unchecked_proof_to_nfgid(caller),
                &resource,
                None,
                |mut v| {
                    let mut bucket: Option<Bucket> = None;

                    // First take the named nflids: if we do this the
                    // other way around they may no longer be
                    // available when we try.
                    if let Some(nflids) = &take_nflids {
                        bucket = Some(v.as_non_fungible().take_non_fungibles(&nflids).into());
                    }
                    // Then take the necessary amount of arbitrary tokens.
                    if let Some(amount) = take_amount {
                        if let Some(ref mut bucket) = bucket {
                            bucket.put(v.take(amount));
                        } else {
                            bucket = Some(v.take(amount));
                        }
                    }
                    bucket
                })
                .unwrap()
        }

  


        /// The pool owner can add a non-fungible global id that is
        /// trusted to receive automatically generated Allowances when
        /// calling deposit_funds.
        pub fn add_trusted_nfgid(&mut self,
                                 owner: Proof,
                                 add_nfgid: NonFungibleGlobalId)
        {
            let owner_nfgid = unchecked_proof_to_nfgid(owner);
            let pool = self.get_or_add_pool(&owner_nfgid);
            pool.trusted_nfgids.insert(add_nfgid, true);
        }

        /// The pool owner can remove a non-fungible global id from
        /// those trusted to receive automatically generated
        /// Allowances when calling deposit_funds.
        pub fn remove_trusted_nfgid(&mut self,
                                    owner: Proof,
                                    remove_nfgid: NonFungibleGlobalId)
        {
            let owner_nfgid = unchecked_proof_to_nfgid(owner);
            let pool = self.get_or_add_pool(&owner_nfgid);
            pool.trusted_nfgids.insert(remove_nfgid, false);
        }

        /// Determines if a given non-fungible global id is currently
        /// trusted to receive automatically generated Allowances when
        /// calling deposit_funds.
        pub fn is_nfgid_trusted(&self,
                                owner: NonFungibleGlobalId,
                                candidate: NonFungibleGlobalId) -> bool
        {
            if let Some(pool) = self.pools.get(&owner) {
                self.is_nfgid_trusted_by_pool(&pool, candidate)
            } else {
                false
            }
        }

        /// The pool owner can add an entire resource, all tokens of
        /// which are trusted to receive automatically generated
        /// Allowances when calling deposit_funds.
        ///
        /// Note that if you add a fungible resource as trusted, trust
        /// can be established by presenting proof for a very tiny
        /// amount of tokens - down to the finest resolution of that
        /// resource (e.g. 1e-18 tokens). If you want *everyone* to be
        /// trusted then add XRD as a trusted resource and anyone can
        /// present a valid Proof if they want to.
        pub fn add_trusted_resource(&mut self,
                                    owner: Proof,
                                    add_resource: ResourceAddress)
        {
            let owner_nfgid = unchecked_proof_to_nfgid(owner);
            let pool = self.get_or_add_pool(&owner_nfgid);
            pool.trusted_res.insert(add_resource, true);
        }

        /// The pool owner can remove a resource from those which are
        /// trusted to receive automatically generated Allowances when
        /// calling deposit_funds.
        pub fn remove_trusted_resource(&mut self,
                                       owner: Proof,
                                       remove_resource: ResourceAddress)
        {
            let owner_nfgid = unchecked_proof_to_nfgid(owner);
            let pool = self.get_or_add_pool(&owner_nfgid);
            pool.trusted_res.insert(remove_resource, false);
        }
        
        /// Determines if a given resource is currently trusted to
        /// receive automatically generated Allowances when calling
        /// deposit_funds.
        pub fn is_resource_trusted(&self,
                                   owner: NonFungibleGlobalId,
                                   candidate: ResourceAddress) -> bool
        {
            if let Some(pool) = self.pools.get(&owner) {
                self.is_resource_trusted_by_pool(pool, candidate)
            } else {
                false
            }
        }

    

        /// Determines if this nfgid is trusted to receive automatic
        /// Allowances. Does not consider whether its *resource* is
        /// trusted, check that individually.
        fn is_nfgid_trusted_by_pool(&self,
                                    pool: &KeyValueEntryRef<Pool>,
                                    candidate: NonFungibleGlobalId) -> bool
        {
            if let Some(trust) = pool.trusted_nfgids.get(&candidate) {
                return *trust
            }
            false
        }

        /// Determines if this resource is trusted to receive
        /// automatic Allowances.
        fn is_resource_trusted_by_pool(&self,
                                       pool: KeyValueEntryRef<Pool>,
                                       candidate: ResourceAddress) -> bool
        {
            if let Some(trust) = pool.trusted_res.get(&candidate) {
                *trust
            } else {
                false
            }
        }

        /// Allows you to do operations on a given pool vault, running
        /// `operation` and passing the vault corresponding to the
        /// requested `resource` to it.
        ///
        /// NOTE when calling this function, `owner` must be an
        /// already authorized identity as it is used to grant access
        /// to vaults. It *must* have come out of a proof, or out of a
        /// bucket, or otherwise from a trusted source.
        ///
        /// If 'allowance_resaddr' is present then authority to
        /// operate on the vault came from an allowance NFT with that
        /// resource address. This function asserts that that is
        /// indeed the resource address of the pool's allowance NFTs.
        fn operate_on_vault<F>(&mut self,
                               owner: &NonFungibleGlobalId,
                               resource: &ResourceAddress,
                               allowance_resaddr: Option<ResourceAddress>,
                               operation: F) 
                               -> Option<Bucket>
        where F: Fn(KeyValueEntryRefMut<Vault>) -> Option<Bucket>
        {
            if let Some(mut pool) = self.pools.get_mut(&owner) {
                if let Some(allowance_resaddr) = allowance_resaddr {
                    assert_eq!(pool.allowance_badge_res,
                               allowance_resaddr,
                               "allowance is not for this pool");
                }
                if let Some(vault) = pool.vaults.get_mut(&resource) {
                    operation(vault)
                } else {
                    panic!("resource not found")
                }
            } else {
                panic!("pool not found")
            }
        }

        /// Retrieves the pool corresponding to the input
        /// `owner_nfgid`, creating one if necessary.
        fn get_or_add_pool(&mut self,
                           owner_nfgid: &NonFungibleGlobalId)
                           -> KeyValueEntryRefMut<Pool>
        {
            // Create this pool if we don't have it already
            if self.pools.get(owner_nfgid).is_none() {

                // Each pool has its own allowance NF resource.
                let allowance_badge_mgr =
                    ResourceBuilder::new_ruid_non_fungible::<AllowanceNfData>(
                        OwnerRole::None)
                    .metadata(metadata!(init {
                        "name" => "Escrow allowance", locked; }))

                // All minting is done by the Escrow component, with
                // access check being situational.
                    .mint_roles(mint_roles!(
                        minter => rule!(require(global_caller(Runtime::global_address())));
                        minter_updater => rule!(deny_all);))

                // The escrow pool owner can recall any allowances
                // that have been issued for the pool.
                    .recall_roles(recall_roles!(
                        recaller => rule!(require(owner_nfgid.clone()));
                        recaller_updater => rule!(deny_all);
                    ))

                // Anyone can burn the allowances they have been
                // given.
                    .burn_roles(burn_roles!(
                        burner => rule!(allow_all);
                        burner_updater => rule!(deny_all);
                    ))

                // All nfdata manipulation is done by the Escrow
                // component.
                    .non_fungible_data_update_roles(non_fungible_data_update_roles!(
                        non_fungible_data_updater =>
                            rule!(require(global_caller(Runtime::global_address())));
                        non_fungible_data_updater_updater => rule!(deny_all);
                    ))
                    
                    .create_with_no_initial_supply();
                
                self.pools.insert(
                    owner_nfgid.clone(),
                    Pool {
                        allowance_badge_res: allowance_badge_mgr.address(),
                        trusted_nfgids: KeyValueStore::new(),
                        trusted_res: KeyValueStore::new(),
                        vaults: KeyValueStore::new(),
                    });
            }

            self.pools.get_mut(owner_nfgid).unwrap()
        }


        
    }
}