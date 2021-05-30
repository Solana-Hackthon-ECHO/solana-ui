import axios from "axios";
import {
    Account,
    Connection,

    LAMPORTS_PER_SOL,
    Keypair
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID, } from "@solana/spl-token";

const rpcUrl = "https://devnet.solana.com";
let connection = new Connection(rpcUrl, "confirmed");

export async function createToken() {
    const payer = new Account();
    const signature = await connection.requestAirdrop(
        payer.publicKey,
        10000000000
    );
    await connection.confirmTransaction(signature, "singleGossip");
    console.log(`Account created: ${payer.publicKey.toBase58()}`);
    console.log(`Account's Balance: ${(await connection.getBalance(payer.publicKey)) / LAMPORTS_PER_SOL}`);

    let testMintAuthority = Keypair.generate();
    const testToken = await Token.createMint(
        connection,
        payer,
        testMintAuthority.publicKey,
        testMintAuthority.publicKey,
        1,
        TOKEN_PROGRAM_ID
    );

    let testAccountOwner = Keypair.generate();
    let testAccount = await testToken.createAccount(
        testAccountOwner.publicKey
    );
    await testToken.mintTo(testAccount, testMintAuthority, [], 1);
    const info = await testToken.getMintInfo();
    console.log(testToken.publicKey.toBase58());
    console.log(info.supply.toNumber());
}

export const ipfs = {
    add: async function () {
        let formData = new FormData();
        let testJson = {
            records: [
                {
                    address: "0x123123",
                    title: "綠化環境"
                }
            ]
        };
        formData.append("Json", JSON.stringify(testJson));
        axios
            .post("https://ipfs.infura.io:5001/api/v0/add", formData)
            .then((res) => {
                console.log(res.data.Hash);
                localStorage.setItem("cid", res.data.Hash);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    get: async function () {
        const cid = localStorage.getItem("cid")
        axios
            .get(`https://ipfs.infura.io:5001/api/v0/cat?arg=${cid}`)
            .then((response) => {
                console.log(response);
            });
    }
}