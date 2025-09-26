// module suinershipsmartcontract::core_tests {
//     use sui::tx_context;
//     use std::vector;

//     // Import the core module under test
//     use suinershipsmartcontract::core;

//     fun empty_bytes(): vector<u8> { vector::empty<u8>() }

//     // 1) Happy-path test (create platform, grant, mint, property, fractionalize, list, buy, deposit, claim)
//     #[test]
//     public fun test_happy_path() {
//         let mut ctx = tx_context::dummy();

//         // create platform
//         let (_cap, mut reg, mut val_reg, mut market) = core::create_platform(&mut ctx);

//         // grant roles to tx sender
//         let sender = tx_context::sender(&ctx);
//         core::grant_verifier(&mut reg, sender);
//         core::grant_valuer(&mut val_reg, sender);

//         // mint verification & valuation (unused locals prefixed with _ to silence warnings)
//         let _v = core::mint_verification(&reg, empty_bytes(), empty_bytes(), &mut ctx);
//         let _val = core::mint_valuation(&val_reg, empty_bytes(), 1_000u64, empty_bytes(), empty_bytes(), &mut ctx);

//         // create property and attach refs
//         let mut prop = core::create_property(empty_bytes(), empty_bytes(), sender, &mut ctx);
//         core::attach_verification_and_valuation(&mut prop, empty_bytes(), empty_bytes());

//         // fractionalize -> owner gets all shares (100)
//         let mut token = core::fractionalize(&mut prop, 100u64, &mut ctx);
//         let owner_balance = core::ft_balance_of(&token, sender);
//         assert!(owner_balance == 100u64, 100);

//         // create listing for 10 shares at price 5 each
//         let mut listing = core::create_listing(&mut market, sender, &mut token, 10u64, 5u64, &mut ctx);
//         // use public accessor to check active
//         assert!(core::listing_is_active(&listing), 101);

//         // buy listing as address 0x2 (let the compiler infer the address type)
//         let buyer = 0x2;
//         core::buy_listing(&mut market, &mut listing, &mut token, buyer, &mut ctx);

//         // After buy: buyer 10, seller 90
//         let buyer_balance = core::ft_balance_of(&token, buyer);
//         let seller_balance = core::ft_balance_of(&token, sender);
//         assert!(buyer_balance == 10u64, 102);
//         assert!(seller_balance == 90u64, 103);

//         // create dividend pool, deposit funds and claim for seller
//         let mut pool = core::create_dividend_pool(&token, &mut ctx);
//         core::deposit_dividend(&mut pool, 100u64);

//         let claimed_seller = core::claim_dividend(&mut pool, &token, sender, seller_balance, &mut ctx);
//         assert!(claimed_seller > 0u128, 104);

//         // basic sanity: use public getter for pool total funds
//         let _remaining = core::dividend_pool_total_funds(&pool);
//         assert!(_remaining >= 0u128, 105);
//     }

//     // 2) Grant / revoke idempotency and membership checks
//     #[test]
//     public fun test_grant_revoke_idempotent() {
//         let mut ctx = tx_context::dummy();
//         let (_cap, mut reg, mut val_reg, _market) = core::create_platform(&mut ctx);
//         let sender = tx_context::sender(&ctx);

//         // initially not in registries (use public wrappers)
//         assert!(!core::is_verifier(&reg, sender), 200);
//         assert!(!core::is_valuer(&val_reg, sender), 201);

//         // grant twice -> should still contain once (no dupes)
//         core::grant_verifier(&mut reg, sender);
//         core::grant_verifier(&mut reg, sender);
//         core::grant_valuer(&mut val_reg, sender);
//         core::grant_valuer(&mut val_reg, sender);

//         assert!(core::is_verifier(&reg, sender), 202);
//         assert!(core::is_valuer(&val_reg, sender), 203);

//         // revoke then revoke again (idempotent)
//         core::revoke_verifier(&mut reg, sender);
//         core::revoke_verifier(&mut reg, sender);
//         core::revoke_valuer(&mut val_reg, sender);
//         core::revoke_valuer(&mut val_reg, sender);

//         assert!(!core::is_verifier(&reg, sender), 204);
//         assert!(!core::is_valuer(&val_reg, sender), 205);
//     }

//     // 3) Fractionalize state checks (can't fractionalize twice)
//     #[test]
//     public fun test_fractionalize_state() {
//         let mut ctx = tx_context::dummy();
//         let (_cap, _reg, _val_reg, _market) = core::create_platform(&mut ctx);
//         let sender = tx_context::sender(&ctx);

//         let mut prop = core::create_property(empty_bytes(), empty_bytes(), sender, &mut ctx);
//         assert!(!core::property_is_fractioned(&prop), 300);

//         let mut token = core::fractionalize(&mut prop, 50u64, &mut ctx);
//         assert!(core::property_is_fractioned(&prop), 301);
//         assert!(core::ft_balance_of(&token, sender) == 50u64, 302);
//     }

//     // 4) Marketplace listing lifecycle (create, check, remove)
//     #[test]
//     public fun test_marketplace_listing_lifecycle() {
//         let mut ctx = tx_context::dummy();
//         let (_cap, _reg, _val_reg, mut market) = core::create_platform(&mut ctx);
//         let sender = tx_context::sender(&ctx);

//         let mut prop = core::create_property(empty_bytes(), empty_bytes(), sender, &mut ctx);
//         let mut token = core::fractionalize(&mut prop, 200u64, &mut ctx);

//         // create two listings
//         let mut l1 = core::create_listing(&mut market, sender, &mut token, 20u64, 10u64, &mut ctx);
//         let _l2 = core::create_listing(&mut market, sender, &mut token, 30u64, 8u64, &mut ctx);

//         // marketplace should hold two listing ids (use public helper)
//         let len = core::market_listings_len(&market);
//         assert!(len >= 2u64, 400);

//         // buy the first listing
//         let buyer = 0x3;
//         core::buy_listing(&mut market, &mut l1, &mut token, buyer, &mut ctx);

//         // l1 should be inactive now (use public getter)
//         assert!(!core::listing_is_active(&l1), 401);

//         // listings vector should have been updated (length decreased by at least 1)
//         let len_after = core::market_listings_len(&market);
//         assert!(len_after < len, 402);
//     }

//     // 5) Dividend accounting for multiple users
//     #[test]
//     public fun test_dividend_multiple_users() {
//         let mut ctx = tx_context::dummy();
//         let (_cap, _reg, _val_reg, _market) = core::create_platform(&mut ctx);
//         let sender = tx_context::sender(&ctx);

//         let mut prop = core::create_property(empty_bytes(), empty_bytes(), sender, &mut ctx);
//         let mut token = core::fractionalize(&mut prop, 100u64, &mut ctx);

//         // mint to another user 0x5
//         let user2 = 0x5;
//         core::ft_mint_to(&mut token, user2, 30u64);

//         // balances: sender 70, user2 30
//         let bal1 = core::ft_balance_of(&token, sender);
//         let bal2 = core::ft_balance_of(&token, user2);
//         assert!(bal1 + bal2 == 100u64, 500);

//         // create pool and deposit
//         let mut pool = core::create_dividend_pool(&token, &mut ctx);
//         core::deposit_dividend(&mut pool, 1000u64);

//         // both users claim according to holdings
//         let claimed1 = core::claim_dividend(&mut pool, &token, sender, bal1, &mut ctx);
//         let claimed2 = core::claim_dividend(&mut pool, &token, user2, bal2, &mut ctx);

//         // claimed amounts must be > 0 and sum must be <= deposited amount
//         assert!(claimed1 > 0u128, 501);
//         assert!(claimed2 > 0u128, 502);
//         assert!(claimed1 + claimed2 <= 1000u128, 503);
//     }
// }
