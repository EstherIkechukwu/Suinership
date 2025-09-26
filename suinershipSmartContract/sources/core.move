#[allow(duplicate_alias, unused_trailing_semi)]
module suinershipsmartcontract::core {
    use sui::tx_context;
    use std::vector;
    use std::string;

   
    const ERR_NOT_VERIFIER: u64 = 1;
    const ERR_NOT_VALUER: u64 = 2;
    const ERR_NOT_OWNER: u64 = 3;
    const ERR_INSUFFICIENT_SHARES: u64 = 4;
    const ERR_ALREADY_FRACTIONED: u64 = 10;
    const ERR_LISTING_INACTIVE: u64 = 20;
    const ERR_NO_SHARES: u64 = 30;
    const SCALE: u128 = 1_000_000_000_000u128;


    public struct PlatformCap has key {
        id: sui::object::UID
    }

    public struct VerifierRegistry has key {
        id: sui::object::UID,
        verifiers: vector<address>
    }

    public struct ValuerRegistry has key {
        id: sui::object::UID,
        valuers: vector<address>
    }

    public struct VerificationNFT has key, store {
        id: sui::object::UID,
        property_ref: string::String,
        walrus_blob: string::String,
        verifier: address,
        timestamp: u64
    }

    public struct ValuationRecord has key, store {
        id: sui::object::UID,
        property_ref: string::String,
        amount: u64,
        currency: string::String,
        valuer: address,
        walrus_blob: string::String,
        timestamp: u64
    }

    public struct PropertyAsset has key, store {
        id: sui::object::UID,
        property_id: string::String,
        owner: address,
        verification_ref: string::String,
        valuation_ref: string::String,
        metadata_blob: string::String,
        fractioned: bool
    }

    public struct ShareToken has key {
        id: sui::object::UID,
        property_ref: string::String,
        total_supply: u64,
        holders: vector<address>,
        amounts: vector<u64>
    }

    public struct Listing has key {
        id: sui::object::UID,
        listing_index: u64,
        seller: address,
        token_ref: string::String,
        shares_amount: u64,
        price_per_share: u64,
        active: bool
    }

    public struct Marketplace has key {
        id: sui::object::UID,
        listings: vector<u64>,
        next_listing_id: u64
    }

    public struct DividendPool has key {
        id: sui::object::UID,
        token_ref: string::String,
        total_shares: u64,
        acc_per_share: u128,
        total_funds: u128,
        users: vector<address>,
        user_debt: vector<u128>
    }

    
    public fun create_platform(ctx: &mut tx_context::TxContext): (PlatformCap, VerifierRegistry, ValuerRegistry, Marketplace) {
        let cap_id = sui::object::new(ctx);
        let reg_id = sui::object::new(ctx);
        let val_id = sui::object::new(ctx);
        let market_id = sui::object::new(ctx);

        let cap = PlatformCap { id: cap_id };
        let reg = VerifierRegistry { id: reg_id, verifiers: vector::empty<address>() };
        let val_reg = ValuerRegistry { id: val_id, valuers: vector::empty<address>() };
        let market = Marketplace { id: market_id, listings: vector::empty<u64>(), next_listing_id: 1u64 };

        (cap, reg, val_reg, market)
    }

    
    fun contains_addr(vec: &vector<address>, who: address): bool {
        let len = vector::length<address>(vec);
        let mut i = 0;
        while (i < len) {
            let a_ref = vector::borrow<address>(vec, i);
            let a = *a_ref;
            if (a == who) { return true; };
            i = i + 1;
        };
        false
    }

   
    public fun grant_verifier(registry: &mut VerifierRegistry, verifier: address) {
        if (!contains_addr(&registry.verifiers, verifier)) {
            vector::push_back<address>(&mut registry.verifiers, verifier);
        };
    }

    public fun revoke_verifier(registry: &mut VerifierRegistry, verifier: address) {
        let len = vector::length<address>(&registry.verifiers);
        let mut i = 0;
        while (i < len) {
            let a_ref = vector::borrow<address>(&registry.verifiers, i);
            let a = *a_ref;
            if (a == verifier) {
                vector::remove<address>(&mut registry.verifiers, i);
                break;
            };
            i = i + 1;
        };
    }

    public fun grant_valuer(registry: &mut ValuerRegistry, valuer: address) {
        if (!contains_addr(&registry.valuers, valuer)) {
            vector::push_back<address>(&mut registry.valuers, valuer);
        };
    }

    public fun revoke_valuer(registry: &mut ValuerRegistry, valuer: address) {
        let len = vector::length<address>(&registry.valuers);
        let mut i = 0;
        while (i < len) {
            let a_ref = vector::borrow<address>(&registry.valuers, i);
            let a = *a_ref;
            if (a == valuer) {
                vector::remove<address>(&mut registry.valuers, i);
                break;
            };
            i = i + 1;
        };
    }

    
    public fun mint_verification(
        registry: &VerifierRegistry,
        property_ref_bytes: vector<u8>,
        walrus_blob_bytes: vector<u8>,
        ctx: &mut tx_context::TxContext
    ): VerificationNFT {
        let sender = tx_context::sender(ctx);
        assert!(contains_addr(&registry.verifiers, sender), ERR_NOT_VERIFIER);

        let prop_ref = string::utf8(property_ref_bytes);
        let walrus = string::utf8(walrus_blob_bytes);

        let obj_id = sui::object::new(ctx);
        let v = VerificationNFT {
            id: obj_id,
            property_ref: prop_ref,
            walrus_blob: walrus,
            verifier: sender,
            timestamp: tx_context::epoch(ctx)
        };
        v
    }

    
    public fun mint_valuation(
        registry: &ValuerRegistry,
        property_ref_bytes: vector<u8>,
        amount: u64,
        currency_bytes: vector<u8>,
        walrus_blob_bytes: vector<u8>,
        ctx: &mut tx_context::TxContext
    ): ValuationRecord {
        let sender = tx_context::sender(ctx);
        assert!(contains_addr(&registry.valuers, sender), ERR_NOT_VALUER);

        let prop_ref = string::utf8(property_ref_bytes);
        let walrus = string::utf8(walrus_blob_bytes);
        let currency = string::utf8(currency_bytes);

        let obj_id = sui::object::new(ctx);
        let r = ValuationRecord {
            id: obj_id,
            property_ref: prop_ref,
            amount,
            currency,
            valuer: sender,
            walrus_blob: walrus,
            timestamp: tx_context::epoch(ctx)
        };
        r
    }

   
    public fun create_property(
        property_id_bytes: vector<u8>,
        metadata_blob_bytes: vector<u8>,
        owner: address,
        ctx: &mut tx_context::TxContext
    ): PropertyAsset {
        let prop_id = string::utf8(property_id_bytes);
        let metadata = string::utf8(metadata_blob_bytes);

        let obj_id = sui::object::new(ctx);
        let empty = string::utf8(vector::empty<u8>());
        let p = PropertyAsset {
            id: obj_id,
            property_id: prop_id,
            owner,
            verification_ref: empty,
            valuation_ref: empty,
            metadata_blob: metadata,
            fractioned: false
        };
        p
    }

  
    public fun attach_verification_and_valuation(
        prop: &mut PropertyAsset,
        verification_ref_bytes: vector<u8>,
        valuation_ref_bytes: vector<u8>
    ) {
        prop.verification_ref = string::utf8(verification_ref_bytes);
        prop.valuation_ref = string::utf8(valuation_ref_bytes);
    }

   
    public fun fractionalize(prop: &mut PropertyAsset, total_shares: u64, ctx: &mut tx_context::TxContext): ShareToken {
        assert!(!prop.fractioned, ERR_ALREADY_FRACTIONED);
        let token_id = sui::object::new(ctx);
        let mut holders = vector::empty<address>();
        let mut amounts = vector::empty<u64>();

        vector::push_back<address>(&mut holders, prop.owner);
        vector::push_back<u64>(&mut amounts, total_shares);

        let token = ShareToken {
            id: token_id,
            property_ref: prop.property_id,
            total_supply: total_shares,
            holders,
            amounts
        };

        prop.fractioned = true;
        token
    }

    fun holder_index(token: &ShareToken, who: address): u64 {
        let len = vector::length<address>(&token.holders);
        let mut i = 0u64;
        while (i < len) {
            let a_ref = vector::borrow<address>(&token.holders, i);
            let a = *a_ref;
            if (a == who) { return i; };
            i = i + 1;
        };
        len
    }

    public fun ft_balance_of(token: &ShareToken, who: address): u64 {
        let idx = holder_index(token, who);
        let len = vector::length<address>(&token.holders);
        if (idx >= len) { 0 } else { *vector::borrow<u64>(&token.amounts, idx) }
    }

    public fun ft_mint_to(token: &mut ShareToken, to: address, amount: u64) {
        let idx = holder_index(token, to);
        if (idx >= vector::length<address>(&token.holders)) {
            vector::push_back<address>(&mut token.holders, to);
            vector::push_back<u64>(&mut token.amounts, amount);
        } else {
            let a_ref = vector::borrow_mut<u64>(&mut token.amounts, idx);
            *a_ref = *a_ref + amount;
        };
        token.total_supply = token.total_supply + amount;
    }

    public fun ft_transfer(token: &mut ShareToken, from: address, to: address, amount: u64) {
        let from_idx = holder_index(token, from);
        let len = vector::length<address>(&token.holders);
        assert!(from_idx < len, ERR_NOT_OWNER);
        let from_amt_ref = vector::borrow_mut<u64>(&mut token.amounts, from_idx);
        assert!(*from_amt_ref >= amount, ERR_INSUFFICIENT_SHARES);
        *from_amt_ref = *from_amt_ref - amount;

        let to_idx = holder_index(token, to);
        if (to_idx >= vector::length<address>(&token.holders)) {
            vector::push_back<address>(&mut token.holders, to);
            vector::push_back<u64>(&mut token.amounts, amount);
        } else {
            let to_amt_ref = vector::borrow_mut<u64>(&mut token.amounts, to_idx);
            *to_amt_ref = *to_amt_ref + amount;
        };
    }

   
    public fun create_listing(
        market: &mut Marketplace,
        seller: address,
        token: &mut ShareToken,
        shares_amount: u64,
        price_per_share: u64,
        _ctx: &mut tx_context::TxContext
    ): Listing {
        let seller_balance = ft_balance_of(token, seller);
        assert!(seller_balance >= shares_amount, ERR_INSUFFICIENT_SHARES);

        let lid = market.next_listing_id;
        market.next_listing_id = market.next_listing_id + 1u64;

        let listing_uid = sui::object::new(_ctx);
        let listing = Listing {
            id: listing_uid,
            listing_index: lid,
            seller,
            token_ref: token.property_ref,
            shares_amount,
            price_per_share,
            active: true
        };

        vector::push_back<u64>(&mut market.listings, listing.listing_index);
        listing
    }

    public fun buy_listing(
        market: &mut Marketplace,
        listing: &mut Listing,
        token: &mut ShareToken,
        buyer: address,
        _ctx: &mut tx_context::TxContext
    ) {
        assert!(listing.active, ERR_LISTING_INACTIVE);

        ft_transfer(token, listing.seller, buyer, listing.shares_amount);

        listing.active = false;

        let len = vector::length<u64>(&market.listings);
        let mut i = 0;
        while (i < len) {
            let id_ref = vector::borrow<u64>(&market.listings, i);
            let idv = *id_ref;
            if (idv == listing.listing_index) {
                vector::remove<u64>(&mut market.listings, i);
                break;
            };
            i = i + 1;
        };
    }

    
    public fun create_dividend_pool(token: &ShareToken, ctx: &mut tx_context::TxContext): DividendPool {
        let pid = sui::object::new(ctx);
        let pool = DividendPool {
            id: pid,
            token_ref: token.property_ref,
            total_shares: token.total_supply,
            acc_per_share: 0u128,
            total_funds: 0u128,
            users: vector::empty<address>(),
            user_debt: vector::empty<u128>()
        };
        pool
    }

    fun user_index(pool: &DividendPool, who: address): u64 {
        let len = vector::length<address>(&pool.users);
        let mut i = 0u64;
        while (i < len) {
            let a_ref = vector::borrow<address>(&pool.users, i);
            let a = *a_ref;
            if (a == who) { return i; };
            i = i + 1;
        };
        len
    }

    public fun deposit_dividend(pool: &mut DividendPool, amount: u64) {
        assert!(pool.total_shares > 0, ERR_NO_SHARES);
        let amt128 = (amount as u128);
        let delta = (amt128 * SCALE) / (pool.total_shares as u128);
        pool.acc_per_share = pool.acc_per_share + delta;
        pool.total_funds = pool.total_funds + amt128;
    }

    public fun claim_dividend(
        pool: &mut DividendPool,
        _token: &ShareToken,
        user: address,
        user_balance: u64,
        _ctx: &mut tx_context::TxContext
    ): u128 {
        let accrued = (user_balance as u128) * pool.acc_per_share;
        let idx = user_index(pool, user);
        let prev_debt = if (idx >= vector::length<address>(&pool.users)) {
            vector::push_back<address>(&mut pool.users, user);
            vector::push_back<u128>(&mut pool.user_debt, 0u128);
            0u128
        } else {
            *vector::borrow<u128>(&pool.user_debt, idx)
        };

        let pending = (accrued / SCALE) - prev_debt;
        assert!(pending > 0u128, ERR_NO_SHARES);

        let new_debt = accrued / SCALE;
        let debt_idx = user_index(pool, user);
        let debt_ref = vector::borrow_mut<u128>(&mut pool.user_debt, debt_idx);
        *debt_ref = new_debt;

        assert!(pool.total_funds >= pending, ERR_NO_SHARES);
        pool.total_funds = pool.total_funds - pending;

        pending
    }
}
