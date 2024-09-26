use scrypto::prelude::{ScryptoBucket, ScryptoNonFungibleBucket};
use scrypto::*;
use scrypto_test::prelude::*;

use escrow::{self, escrow::{escrow::Escrow, OwnerReceipt}};

#[test]
fn test_escrow() {
    // Setup the environment
    let mut ledger = LedgerSimulatorBuilder::new().build();

    // Create an account
    let (public_key, _private_key, account) = ledger.new_allocated_account();

    // Publish package
    let package_address = ledger.compile_and_publish(this_package!());

    // Test the `instantiate_hello` function.
    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .call_function(
            package_address,
            "Esrcow",
            "instantiate_escrow",
            manifest_args!(),
        )
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    let component = receipt.expect_commit(true).new_component_addresses()[0];

    // Test the `free_token` method.
    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .call_method(component, "free_token", manifest_args!())
        .call_method(
            account,
            "deposit_batch",
            manifest_args!(ManifestExpression::EntireWorktop),
        )
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    receipt.expect_commit_success();
}

#[derive(NonFungibleData, ScryptoSbor)]
struct TestNFT{
}

#[test]
fn test_hello_with_test_environment() -> Result<(), RuntimeError> {
    // Arrange
    let mut env = TestEnvironment::new();
    let escrow = Escrow::instantiate_escrow();

    let nflid = IntegerNonFungibleLocalId::new(0);
    
    let nft_resource = ResourceBuilder::new_integer_non_fungible::<TestNFT>(OwnerRole::None)
            // Step 4: Create the Resource
            .mint_initial_supply({
                [
                    (nflid.clone().into(), TestNFT{}),
                ]
            }, &mut env).unwrap();
    let resource = nft_resource.as_non_fungible().resource_address();
    let receipt_nfgid = NonFungibleGlobalId::new(resource, nflid.into());

    
    // Act
    let bucket = escrow.deposit_nft(nft_resource, Decimal::one(), XRD);
    let resource_address = bucket.as_non_fungible().resource_address();
   


    let resource_manager = ResourceManager(resource_address);
    let bucket_nft_data = resource_manager.get_non_fungible_data::<_,_,OwnerReceipt>(
        bucket.as_non_fungible().non_fungible_local_ids().first().unwrap().clone(), &mut env).unwrap();

    let bucket_data_global_id : NonFungibleGlobalId = bucket_nft_data.deposited_nft;
    if receipt_nfgid == bucket_data_global_id {
        println!("Success");
        Ok(())
    } else {
        println!("Failure");
        Err(RuntimeError::ApplicationError(ApplicationError::PanicMessage("NFT not found in vault".to_string())))
    }
  
}
