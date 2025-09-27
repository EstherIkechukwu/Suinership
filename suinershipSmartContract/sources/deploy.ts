import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromBase64 } from "@mysten/sui/utils";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { homedir } from "os";
import path from "path";

type Network = "mainnet" | "testnet" | "devnet" | "localnet";
const NETWORK = (process.env.NETWORK as Network) || "testnet";
const PACKAGE_ID = process.env.PACKAGE_ID;
if (!PACKAGE_ID) {
  throw new Error("Please set PACKAGE_ID env variable to your published package id.");
}

const SUI_BIN = "sui";
const PRIVATE_KEY_B64 = process.env.PRIVATE_KEY || ""; 
const ACTIVE_ADDRESS_ENV = process.env.ACTIVE_ADDRESS || "";

function getClient(net: Network = NETWORK) {
  return new SuiClient({ url: getFullnodeUrl(net) });
}

function getActiveAddressFromCli(): string {
  try {
    return execSync(`${SUI_BIN} client active-address`, { encoding: "utf8" }).trim();
  } catch {
    if (ACTIVE_ADDRESS_ENV) return ACTIVE_ADDRESS_ENV;
    throw new Error("Unable to get active address from `sui client active-address`. Provide ACTIVE_ADDRESS env.");
  }
}

function getSigner(): Ed25519Keypair {
  if (PRIVATE_KEY_B64) {
    const raw = fromBase64(PRIVATE_KEY_B64);

    const secret = raw[0] === 0 ? raw.slice(1) : raw;
    return Ed25519Keypair.fromSecretKey(secret);
  }

  const sender = getActiveAddressFromCli();
  const keystorePath = path.join(homedir(), ".sui", "sui_config", "sui.keystore");
  const ksRaw = readFileSync(keystorePath, "utf8");
  const arr: string[] = JSON.parse(ksRaw);
  for (const privB64 of arr) {
    try {
      const raw = fromBase64(privB64);
      if (raw[0] !== 0) continue;
      const pair = Ed25519Keypair.fromSecretKey(raw.slice(1));
      if (pair.getPublicKey().toSuiAddress() === sender) return pair;
    } catch {
      
    }
  }
  throw new Error(`No keypair found in keystore for active address ${sender}`);
}

async function signAndExecute(tx: Transaction, net: Network = NETWORK) {
  const client = getClient(net);
  const signer = getSigner();
  return client.signAndExecuteTransaction({
    transaction: tx,
    signer,
    options: { showEffects: true, showObjectChanges: true },
  });
}


function createdObjectIdsFromEffects(effects: any): string[] {
  if (!effects || !effects.created) return [];
  return effects.created.map((c: any) => c.reference.objectId);
}


export async function getOwnedObjectsByType(owner: string, structShortName: string, net: Network = NETWORK) {
  const client = getClient(net);
  return client.getOwnedObjects({
    owner,
    filter: { StructType: `${PACKAGE_ID}::core::${structShortName}` },
  });
}


export async function createPlatform(net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::create_platform`,
    arguments: [],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  const ids = createdObjectIdsFromEffects(res?.effects);
  return { res, created: ids };
}


export async function grantVerifier(registryObjId: string, verifierAddr: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::grant_verifier`,
    arguments: [tx.object(registryObjId), tx.pure.address(verifierAddr)],
  });
  tx.setGasBudget(300_000);
  const res = await signAndExecute(tx, net);
  return res;
}

export async function revokeVerifier(registryObjId: string, verifierAddr: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::revoke_verifier`,
    arguments: [tx.object(registryObjId), tx.pure.address(verifierAddr)],
  });
  tx.setGasBudget(300_000);
  return signAndExecute(tx, net);
}


export async function grantValuer(valRegId: string, valuerAddr: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::grant_valuer`,
    arguments: [tx.object(valRegId), tx.pure.address(valuerAddr)],
  });
  tx.setGasBudget(300_000);
  return signAndExecute(tx, net);
}

export async function revokeValuer(valRegId: string, valuerAddr: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::revoke_valuer`,
    arguments: [tx.object(valRegId), tx.pure.address(valuerAddr)],
  });
  tx.setGasBudget(300_000);
  return signAndExecute(tx, net);
}


export async function mintVerification(registryObjId: string, propertyRef: string, walrusB64: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::mint_verification`,
    arguments: [
      tx.object(registryObjId),
      tx.pure(Buffer.from(propertyRef, "utf8")), // vector<u8>
      tx.pure(Buffer.from(walrusB64, "utf8")),   // vector<u8>
    ],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  return { res, created: createdObjectIdsFromEffects(res?.effects) };
}


export async function mintValuation(registryObjId: string, propertyRef: string, amount: number, currency: string, walrusB64: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::mint_valuation`,
    arguments: [
      tx.object(registryObjId),
      tx.pure(Buffer.from(propertyRef, "utf8")), 
      tx.pure.u64(amount),
      tx.pure(Buffer.from(currency, "utf8")),    
      tx.pure(Buffer.from(walrusB64, "utf8")),   
    ],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  return { res, created: createdObjectIdsFromEffects(res?.effects) };
}


export async function createProperty(propertyId: string, metadata: string, owner: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::create_property`,
    arguments: [
      tx.pure(Buffer.from(propertyId, "utf8")), 
      tx.pure(Buffer.from(metadata, "utf8")),   
      tx.pure.address(owner),
    ],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  return { res, created: createdObjectIdsFromEffects(res?.effects) };
}


export async function attachVerificationAndValuation(propObjId: string, verificationRef: string, valuationRef: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::attach_verification_and_valuation`,
    arguments: [
      tx.object(propObjId),
      tx.pure(Buffer.from(verificationRef, "utf8")), 
      tx.pure(Buffer.from(valuationRef, "utf8")),    
    ],
  });
  tx.setGasBudget(300_000);
  return signAndExecute(tx, net);
}


export async function fractionalize(propObjId: string, totalShares: number, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::fractionalize`,
    arguments: [tx.object(propObjId), tx.pure.u64(totalShares)],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  return { res, created: createdObjectIdsFromEffects(res?.effects) };
}


export async function ftMintTo(tokenObjId: string, to: string, amount: number, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::ft_mint_to`,
    arguments: [tx.object(tokenObjId), tx.pure.address(to), tx.pure.u64(amount)],
  });
  tx.setGasBudget(300_000);
  return signAndExecute(tx, net);
}


export async function ftTransfer(tokenObjId: string, from: string, to: string, amount: number, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::ft_transfer`,
    arguments: [tx.object(tokenObjId), tx.pure.address(from), tx.pure.address(to), tx.pure.u64(amount)],
  });
  tx.setGasBudget(300_000);
  return signAndExecute(tx, net);
}


export async function createListing(marketObjId: string, seller: string, tokenObjId: string, sharesAmount: number, pricePerShare: number, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::create_listing`,
    arguments: [tx.object(marketObjId), tx.pure.address(seller), tx.object(tokenObjId), tx.pure.u64(sharesAmount), tx.pure.u64(pricePerShare)],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  return { res, created: createdObjectIdsFromEffects(res?.effects) };
}

export async function buyListing(marketObjId: string, listingObjId: string, tokenObjId: string, buyer: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::buy_listing`,
    arguments: [tx.object(marketObjId), tx.object(listingObjId), tx.object(tokenObjId), tx.pure.address(buyer)],
  });
  tx.setGasBudget(1_000_000);
  return signAndExecute(tx, net);
}

export async function createDividendPool(tokenObjId: string, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::create_dividend_pool`,
    arguments: [tx.object(tokenObjId)],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  return { res, created: createdObjectIdsFromEffects(res?.effects) };
}


export async function depositDividend(poolObjId: string, amount: number, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::deposit_dividend`,
    arguments: [tx.object(poolObjId), tx.pure.u64(amount)],
  });
  tx.setGasBudget(300_000);
  return signAndExecute(tx, net);
}

export async function claimDividend(poolObjId: string, tokenObjId: string, userAddr: string, userBalance: number, net: Network = NETWORK) {
  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::core::claim_dividend`,
    arguments: [tx.object(poolObjId), tx.object(tokenObjId), tx.pure.address(userAddr), tx.pure.u64(userBalance)],
  });
  tx.setGasBudget(1_000_000);
  const res = await signAndExecute(tx, net);
  return res;
}


export function findCreatedByStruct(effects: any, structShortName: string) {
  if (!effects || !effects.created) return [];
  return effects.created
    .filter((c: any) => c.type.includes(`::core::${structShortName}`))
    .map((c: any) => c.reference.objectId);
}
