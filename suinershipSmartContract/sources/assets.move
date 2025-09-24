module 0x1::asset_registry {
    use sui::event::{EventHandle, emit};
    use sui::tx_context::{TxContext, create};
    use sui::object::{Self, UID,move_to, borrow_global};
    use sui::transfer;
    use signer;
    

    public struct AssetRegisteredEvent has copy, drop, store {
        id: vector<u8>,
        owner: address,
        ipfs_hash: vector<u8>,
        tx_context: u64,
    }

    public struct AssetTransferredEvent has copy, drop, store {
        id: vector<u8>,
        from: address,
        to: address,
        tx_context: u64,
    }

    public struct AssetUpdatedEvent has copy, drop, store {
        id: vector<u8>,
        new_ipfs_hash: vector<u8>,
        tx_context: u64,
    }

    public struct RegistryEvents has key {
        id: UID,
        reg_handle: EventHandle<AssetRegisteredEvent>,
        transfer_handle: EventHandle<AssetTransferredEvent>,
        update_handle: EventHandle<AssetUpdatedEvent>,
    }

    public struct Asset has key {
        id: vector<u8>,        
        owner: address,        
        ipfs_hash: vector<u8>, 
        active: bool,
        history: vector<vector<u8>>,
    }

    public struct RegistrarCap has key {
        id: UID,
    }

    public fun init_registry(ctx: &mut TxContext) {
        let reg = RegistryEvents {
            id: UID::new(ctx),
            reg_handle: EventHandle::new<AssetRegisteredEvent>(ctx),
            transfer_handle: EventHandle::new<AssetTransferredEvent>(ctx),
            update_handle: EventHandle::new<AssetUpdatedEvent>(ctx),
        };
        move_to(admin, reg_events);

        let admin_Res = RegistryAdmin {
            id: UID::new(ctx) };
            move_to(admin, admin_res)        
        }
    }

    public fun grant_registrar(recipient: address, ctx: &mut TxContext) {
        
        let admin_addr = signer::address_of(admin);
        let _admin_check_ref = borrow_global<RegistryAdmin>(admin_addr);

        let cap = RegistrarCap { id: UID::new(ctx) };
        move_to(recipient, cap);
        
    }

    
    public fun register_asset(asset_id: vector<u8>, owner: address, ipfs_hash: vector<u8>, ctx: &mut TxContext) {
        let asset = Asset {
            id: asset_id,
            owner,
            ipfs_hash: ipfs_hash,
            active: true,
            history: vector::empty(),
        };
        vector::push_back(&mut asset.history, ipfs_hash);

        
        let event = AssetRegisteredEvent {
            id: asset.id,
            owner,
            ipfs_hash: asset.ipfs_hash,
            tx_context: 0, 
        };
    }

    public fun transfer_asset(asset_obj: &mut Asset, to: address, ctx: &mut TxContext) {
        let from = asset_obj.owner;
        assert!(from == signer::address_of(&signer_of(ctx)), 0);
        asset_obj.owner = to;
    }

    
    public fun update_asset_pointer(asset_obj: &mut Asset, new_ipfs_hash: vector<u8>, ctx: &mut TxContext) {
        let caller = signer::address_of(&signer_of(ctx));
        assert!(caller == asset_obj.owner || false, 1);
        asset_obj.ipfs_hash = new_ipfs_hash;
        vector::push_back(&mut asset_obj.history, new_ipfs_hash);
    }

    public fun retire_asset(asset_obj: &mut Asset, ctx: &mut TxContext) {
        let caller = signer::address_of(&signer_of(ctx));
        assert!(caller == asset_obj.owner || false, 2);
        asset_obj.active = false;
    }

    public struct RegistryAdmin has key {
        id: UID,
        admin: address,
    }

}
