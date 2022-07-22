"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrectPermitSigNoVersion = exports.getCorrectPermitSig = void 0;
const permitToken_json_1 = __importDefault(require("./permitToken.json"));
const ethers_1 = require("ethers");
const mainnet = new ethers_1.ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/LThG2biL_4ShrIeKaTKYwdueeizg613D');
let fs = require('fs');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const privateKey = '492caa9437dfd9ebdcfdec7a79fe29f958bcb9c5edb78f05f634d69b8521c64b';
        // let wallet = new ethers.Wallet(privateKey, mainnet);
        const wallet = ethers_1.ethers.Wallet.createRandom().connect(mainnet);
        //hardcoded values passed into permit
        // const spender = "0x10B0468C4FcC4DB360863d7143cb12C0F6Ec8296";
        const spender = ethers_1.ethers.Wallet.createRandom().connect(mainnet);
        const value = ethers_1.ethers.utils.parseUnits("1.0", 18);
        const deadline = ethers_1.ethers.constants.MaxUint256;
        // 50 tokens on arbitrum
        let dict = {
            "0x3506424F91fD33084466F402d5D97f05F8e3b4AF": null,
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": null,
            "0x6B175474E89094C44Da98b954EedeAC495271d0F": null,
            "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": null,
            "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": null,
            "0x514910771AF9Ca656af840dff83E8264EcF986CA": null,
            "0x853d955aCEf822Db058eb8505911ED77F175b99e": null,
            "0x8dd5fbCe2F6a956C3022bA3663759011Dd51e73E": null,
            "0xc944e90c64b2c07662a292be6244bdf05cda44a7": null,
            "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6": null,
            "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd": null,
            "0xD533a949740bb3306d119CC777fa900bA034cd52": null,
            "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0": null,
            "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD": null,
            "0xc00e94Cb662C3520282E6f5717214004A7f26888": null,
            "0x6810e776880C02933D47DB1b9fc05908e5386b96": null,
            "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2": null,
            "0x58b6A8A3302369DAEc383334672404Ee733aB239": null,
            "0xD28807D7eF028AF6728d12Ccd621b2242Da2a64f": null,
            "0x0f2D719407FdBeFF09D87557AbB7232601FD9F29": null,
            "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e": null,
            "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3": null,
            "0xba100000625a3754423978a60c9317c58a424e3D": null,
            "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828": null,
            "0xDDB3422497E61e13543BeA06989C0789117555c5": null,
            "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9": null,
            "0x111111111117dc0aa78b770fa6a738034120c302": null,
            "0x4F9254C83EB525f9FCf346490bbb3ed28a81C667": null,
            "0x57Ab1E02fEE23774580C119740129eAC7081e9D3": null,
            "0x090185f2135308BaD17527004364eBcC2D37e5F6": null,
            "0xbC396689893D065F41bc2C6EcbeE5e0085233447": null,
            "0xD291E7a03283640FDc51b121aC401383A46cC623": null,
            "0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd": null,
            "0x0391D2021f89DC339F60Fff84546EA23E337750f": null,
            "0xA2120b9e674d3fC3875f415A7DF52e382F141225": null,
            "0x3472A5A71965499acd81997a54BBA8D852C6E53d": null,
            "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419": null,
            "0x08d967bb0134F2d07f7cfb6E246680c53927DD30": null,
            "0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e": null,
            "0xDDdddd4301A082e62E84e43F474f044423921918": null,
            "0x16ECCfDbb4eE1A85A33f3A9B21175Cd7Ae753dB4": null,
            "0x0Ae055097C6d159879521C384F1D2123D1f195e6": null,
            "0x970B9bB2C0444F5E81e9d0eFb84C8ccdcdcAf84d": null,
            "0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0": null,
            "0x0000000000095413afC295d19EDeb1Ad7B71c952": null,
            "0x2ba592F78dB6436527729929AAf6c908497cB200": null,
            "0x1C9491865a1DE77C5b6e19d2E6a5F1D7a6F2b25F": null,
            "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2": null,
            "0x43044f861ec040DB59A7e324c40507adDb673142": null,
            "0xeEAA40B28A2d1b0B08f6f97bB1DD4B75316c6107": null,
            "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42": null,
            "0x9695e0114e12C0d3A3636fAb5A18e6b737529023": null,
            "0xcC926FCfB3eeB7E846D9D06072636022016DFc06": null, //elk 
        };
        // just testing uniswap to see if signature works
        let dict1 = { "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": null }; //uni
        for (let key in dict) {
            const tokenContract = new ethers_1.ethers.Contract(key, permitToken_json_1.default['abi'], wallet);
            try {
                const signature = yield getCorrectPermitSig(wallet, tokenContract, spender.address, value, deadline);
                const { v, r, s } = ethers_1.ethers.utils.splitSignature(signature);
                const tx = yield tokenContract.connect(wallet).callStatic.permit(wallet.address, spender.address, value, deadline, v, r, s, { gasLimit: 2000000 });
                // console.log(tx);
                dict[key] = 1;
                // console.log(dict);
            }
            catch (e) { // if contract doesn't use version
                try {
                    const signature = yield getCorrectPermitSigNoVersion(wallet, tokenContract, spender.address, value, deadline);
                    const { v, r, s } = ethers_1.ethers.utils.splitSignature(signature);
                    const tx = yield tokenContract.connect(wallet).callStatic.permit(wallet.address, spender.address, value, deadline, v, r, s, { gasLimit: 2000000 });
                    console.log(tx);
                    dict[key] = 1;
                    // console.log(dict);
                }
                catch (e2) {
                    dict[key] = 0;
                }
            }
        }
        console.log(dict);
        // this try catch tests getPermitSig and assigns dictionary[token] = 1 if permit, 0 if no permit
        // still does not work as every token throws an error 
        //     isPermit = true;
        // try{
        //     const tokenContract = new ethers.Contract(key, erc20abi['abi'], wallet);
        //     const digest = await getPermitSig(wallet, tokenContract, spender, value, deadline);
        //     const signature = await wallet.signMessage(digest);
        //     const sig = ethers.utils.splitSignature(signature);
        //     const tx = await tokenContract.callStatic.permit(wallet.address, spender, value, deadline, sig.v, sig.r, sig.s, {gasLimit: 2000000});
        //     isPermit = true;
        // }
        // catch(e) {
        //     if(e) {
        //         dict[key] = 0;
        //         isPermit = false;
        //     }
        // }
        // if(isPermit){
        //     dict[key] = 1;
        // };
        // dict[key] = 1;
        //writing results to a json file
        // console.log(dict);
        // var dictstring = JSON.stringify(dict);
        // fs.writeFile("tokens.json", dictstring, function(err: any, result: any) {
        //     if(err){
        //         console.log('error with exporting data to json', err);
        //     }
        // });
    });
}
// // another function to test out signature
// export async function getPermitSig(
//         wallet: Wallet,
//         token: any,
//         spender: string,
//         value: any,
//         deadline: any,
//         optional?: { nonce?: number; name?: string; chainId?: number; version?: string }
//       ): Promise<any> { //Promise<Signature>
//         const [nonce, name, version, chainId] = await Promise.all([
//           optional?.nonce ?? token.nonces(wallet.address),
//           optional?.name ?? token.name(),
//           optional?.version ?? '1',
//           optional?.chainId ?? wallet.getChainId(),
//         ])
//     const typedData = { 
//         types: {
//             EIP712Domain: [
//                 {name: "name", type: "string"},
//                 {name: "version", type: "string"},
//                 {name: "chainId", type: "uint256"},
//                 {name: "verifyingContract", type: "address"},
//             ],
//         Permit: [
//             { name: 'owner', type: 'address' },
//             { name: 'spender', type: 'address' },
//             { name: 'value', type: 'uint256' },
//             { name: 'nonce', type: 'uint256'},
//             { name: 'deadline', type: 'uint256' },
//         ],
//     },
//     primaryType: "Permit",
//     domain: {
//         "name": name,
//         "version": '1',
//         "chainId": chainId,
//         "verifyingContract": token.address
//     },
//     message: {
//        "owner": wallet.address,
//         "spender": spender,
//         "value": value,
//         "nonce": nonce,
//         "deadline": deadline
//     }
// }
//     const digest = TypedDataUtils.encodeDigest(typedData);
//     console.log("digest: ", ethers.utils.hexlify(digest));
//     //testing if signature is accurate and can recover public key 
//     const signature = await wallet.signMessage(digest);
//     let recovered = ethers.utils.recoverPublicKey(digest, signature);
//     console.log("recovered: ", recovered);
//     console.log("public key: ", wallet.publicKey);
//     return digest;
// }
// main();
// // another function to get signature
//     export async function getPermitSignature(
//         wallet: Wallet,
//         token: any,
//         spender: any,
//         value: any,
//         deadline: any,
//         permitConfig?: { nonce?: number; name?: string; chainId?: number; version?: string }
//       ): Promise<Signature> { //Promise<Signature>
//         const [nonce, name, version, chainId] = await Promise.all([
//           permitConfig?.nonce ?? token.nonces(wallet.address),
//           permitConfig?.name ?? token.name(),
//           permitConfig?.version ?? '1',
//           permitConfig?.chainId ?? wallet.getChainId(),
//         ])
//         //checking the digest to see if its the same as uniswap contract when called with same parameters in remix
//         const nonce1 = nonce.add(1);
//         let abiCoder = ethers.utils.defaultAbiCoder;
//         const domaintypehash = keccak256(ethers.utils.toUtf8Bytes("EIP712Domain(string name,uint256 chainId,address verifyingContract)"));
//         const permittypehash = keccak256(ethers.utils.toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"));
//         const domainSeparator = keccak256(abiCoder.encode(["bytes32", "bytes32", "uint", "address"], [domaintypehash, keccak256(ethers.utils.toUtf8Bytes(name)), chainId, token.address]));
//         const structHash = keccak256(abiCoder.encode(["bytes32", "address", "address", "uint256", "uint256", "uint256"], [permittypehash, wallet.address, spender, value, 2, deadline]));
//         const digest = keccak256(ethers.utils.solidityPack(["string", "bytes32", "bytes32"], ["\x19\x01", domainSeparator, structHash]))
//         return splitSignature(
//           await wallet._signTypedData(
//             {
//               name,
//               version,
//               chainId,
//               verifyingContract: token.address,
//             },
//             {
//               Permit: [
//                 { name: 'owner', type: 'address' },
//                 { name: 'spender', type: 'address' },
//                 { name: 'value', type: 'uint256' },
//                 { name: 'nonce', type: 'uint256'},
//                 { name: 'deadline', type: 'uint256' },
//               ],
//             },
//             {
//               owner: wallet.address,
//               spender,
//               value,
//               nonce,
//               deadline,
//             }
//           )
//         )
//         }
// // another example of how uniswap v2 gets signature
// const PERMIT_TYPEHASH = keccak256(
//     toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)')
//     )
// function getDomainSeparator(name: string, tokenAddress: string) {
//     return keccak256(
//         defaultAbiCoder.encode(
//         ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
//         [
//             keccak256(toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
//             keccak256(toUtf8Bytes(name)),
//             keccak256(toUtf8Bytes('1')),
//             1,
//             tokenAddress
//         ]
//         )
//     )
// }
// export async function getApprovalDigest(
//     token: Contract,
//     approve: {
//         owner: string
//         spender: string
//         value: BigNumber
//     },
//     nonce: BigNumber,
//     deadline: BigNumber
//     ): Promise<string> {
//     const name = await token.name()
//     const DOMAIN_SEPARATOR = getDomainSeparator(name, token.address)
//     return keccak256(
//         solidityPack(
//         ['bytes1', 'bytes1', 'bytes32', 'bytes32'],
//         [
//             '0x19',
//             '0x01',
//             DOMAIN_SEPARATOR,
//             keccak256(
//             defaultAbiCoder.encode(
//                 ['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'],
//                 [PERMIT_TYPEHASH, approve.owner, approve.spender, approve.value, nonce, deadline]
//             )
//             )
//         ]
//         )
//     )
//     }
//https://github.com/Uniswap/v2-core/blob/4dd59067c76dea4a0e8e4bfdda41877a6b16dedc/test/shared/utilities.ts#L52
function getCorrectPermitSig(wallet, token, spender, value, deadline, optional) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const [nonce, name, version, chainId] = yield Promise.all([
            (_a = optional === null || optional === void 0 ? void 0 : optional.nonce) !== null && _a !== void 0 ? _a : token.nonces(wallet.address),
            (_b = optional === null || optional === void 0 ? void 0 : optional.name) !== null && _b !== void 0 ? _b : token.name(),
            (_c = optional === null || optional === void 0 ? void 0 : optional.version) !== null && _c !== void 0 ? _c : '1',
            (_d = optional === null || optional === void 0 ? void 0 : optional.chainId) !== null && _d !== void 0 ? _d : wallet.getChainId(),
        ]);
        console.log(version);
        const domain = {
            "name": name,
            "version": version,
            "chainId": chainId,
            "verifyingContract": token.address
        };
        const types = {
            Permit: [
                { name: 'owner', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
            ],
        };
        const message = {
            owner: wallet.address,
            spender: spender,
            value: value,
            nonce: nonce,
            deadline: deadline
        };
        const sig = yield wallet._signTypedData(domain, types, message);
        return sig;
    });
}
exports.getCorrectPermitSig = getCorrectPermitSig;
function getCorrectPermitSigNoVersion(wallet, token, spender, value, deadline, optional) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const [nonce, name, chainId] = yield Promise.all([
            (_a = optional === null || optional === void 0 ? void 0 : optional.nonce) !== null && _a !== void 0 ? _a : token.nonces(wallet.address),
            (_b = optional === null || optional === void 0 ? void 0 : optional.name) !== null && _b !== void 0 ? _b : token.name(),
            (_c = optional === null || optional === void 0 ? void 0 : optional.chainId) !== null && _c !== void 0 ? _c : wallet.getChainId(),
        ]);
        const domain = {
            "name": name,
            "chainId": chainId,
            "verifyingContract": token.address
        };
        const types = {
            Permit: [
                { name: 'owner', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
            ],
        };
        const message = {
            owner: wallet.address,
            spender: spender,
            value: value,
            nonce: nonce,
            deadline: deadline
        };
        const sig = yield wallet._signTypedData(domain, types, message);
        return sig;
    });
}
exports.getCorrectPermitSigNoVersion = getCorrectPermitSigNoVersion;
main();
//# sourceMappingURL=permit.js.map