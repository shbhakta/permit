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
        const wallet = ethers_1.ethers.Wallet.createRandom().connect(mainnet);
        const spender = ethers_1.ethers.Wallet.createRandom().connect(mainnet);
        const value = ethers_1.ethers.utils.parseUnits("1.0", 18);
        const deadline = ethers_1.ethers.constants.MaxUint256;
        // 50 tokens on arbitrum
        let dict = {
            "0x3506424F91fD33084466F402d5D97f05F8e3b4AF": null,
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": null,
            "0x6B175474E89094C44Da98b954EedeAC495271d0F": 1,
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
        for (let key in dict) {
            if (dict[key] != null) {
                continue;
            }
            const tokenContract = new ethers_1.ethers.Contract(key, permitToken_json_1.default['abi'], wallet);
            try {
                const signature = yield getCorrectPermitSig(wallet, tokenContract, spender.address, value, deadline);
                const { v, r, s } = ethers_1.ethers.utils.splitSignature(signature);
                yield tokenContract.connect(wallet).callStatic.permit(wallet.address, spender.address, value, deadline, v, r, s, { gasLimit: 2000000 });
                dict[key] = 1;
            }
            catch (e) { // if contract doesn't use version
                try {
                    const signature = yield getCorrectPermitSigNoVersion(wallet, tokenContract, spender.address, value, deadline);
                    const { v, r, s } = ethers_1.ethers.utils.splitSignature(signature);
                    yield tokenContract.connect(wallet).callStatic.permit(wallet.address, spender.address, value, deadline, v, r, s, { gasLimit: 2000000 });
                    dict[key] = 1;
                }
                catch (e2) { // if contract doesn't have permit
                    dict[key] = 0;
                }
            }
        }
        console.log(dict);
    });
}
function getCorrectPermitSig(wallet, token, spender, value, deadline, optional) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const [nonce, name, version, chainId] = yield Promise.all([
            (_a = optional === null || optional === void 0 ? void 0 : optional.nonce) !== null && _a !== void 0 ? _a : token.nonces(wallet.address),
            (_b = optional === null || optional === void 0 ? void 0 : optional.name) !== null && _b !== void 0 ? _b : token.name(),
            (_c = optional === null || optional === void 0 ? void 0 : optional.version) !== null && _c !== void 0 ? _c : '1',
            (_d = optional === null || optional === void 0 ? void 0 : optional.chainId) !== null && _d !== void 0 ? _d : wallet.getChainId(),
        ]);
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