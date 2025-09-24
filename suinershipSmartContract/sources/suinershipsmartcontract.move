/*
/// Module: suinershipsmartcontract
module suinershipsmartcontract::suinershipsmartcontract;
*/

// https://docs.sui.io/concepts/sui-move-concepts/conventions


module suinershipsmartcontract::verification {
    use sui::tx_context;
    use sui::event;
    use sui::url::Url;
    use sui::transfer;
    use sui::object;
    use std::string;
    use std::vector;
    use table

    struct PlatformCap has key { id: UID }

    struct VerifierRegistry has key {
        id: UID,
        verifiers: table::Table<address, bool>
    }

    struct VerificationNFT has key, store {
        id: UID,
        property_ref: string::String,  
        walrus_url: Url,
        verifier: address,
        timestamp: u64
    }

    struct VerificationMinted has copy, drop {
        object_id: ID,
        property_ref: string::String,
        verifier: address
    }

    public fun init(ctx: &mut TxContext): (PlatformCap, VerifierRegistry) {
        let cap = PlatformCap { id: object::new(ctx) };
        let registry = VerifierRegistry { id: object::new(ctx), verifiers: table::new<address,bool>() };
        (cap, registry)
    }

    public fun grant_verifier(_cap: &mut PlatformCap, registry: &mut VerifierRegistry, verifier: address) {
        table::add<&address, bool>(&mut registry.verifiers, verifier, true);
    }

    public fun revoke_verifier(_cap: &mut PlatformCap, registry: &mut VerifierRegistry, verifier: address) {
        table::remove(&mut registry.verifiers, verifier);
    }

    public fun mint_verification(registry: &VerifierRegistry, property_ref: vector<u8>, walrus_url_bytes: vector<u8>, property_owner: address, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        assert!(table::contains<&address, bool>(&registry.verifiers, sender), 100); // only whitelisted verifiers
        let nft = VerificationNFT {
            id: object::new(ctx),
            property_ref: string::utf8(property_ref),
            walrus_url: Url::new_unsafe_from_bytes(walrus_url_bytes),
            verifier: sender,
            timestamp: tx_context::epoch(ctx)
        };
        event::emit(VerificationMinted {
            object_id: object::id(&nft),
            property_ref: nft.property_ref,
            verifier: sender
        });
        transfer::public_transfer(nft, property_owner);
    }
}
