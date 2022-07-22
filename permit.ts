// import abi from "../permit/artifacts/@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol/IERC20Permit.json";
import erc20abi from "./abi.json";
import { BigNumber, Contract, ethers } from "ethers";
import { AbiCoder, arrayify, defaultAbiCoder, hexlify, keccak256, recoverAddress, solidityKeccak256, solidityPack, toUtf8Bytes } from "ethers/lib/utils";
const mainnet = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/LThG2biL_4ShrIeKaTKYwdueeizg613D');
let fs = require('fs');
import { BigNumberish, constants, Signature, Wallet } from 'ethers'
import { splitSignature } from 'ethers/lib/utils'
import { signERC2612Permit } from 'eth-permit';
import { TypedDataUtils } from 'ethers-eip712'
import { ecsign } from 'ethereumjs-util'
import chai, { expect } from 'chai'


async function main() {

    const privateKey = '492caa9437dfd9ebdcfdec7a79fe29f958bcb9c5edb78f05f634d69b8521c64b';
    let wallet = new ethers.Wallet(privateKey, mainnet);

    //hardcoded values passed into permit
    const spender = "0x10B0468C4FcC4DB360863d7143cb12C0F6Ec8296";
    const owner = wallet.address;
    const value = ethers.utils.parseUnits("1.0", 18);
    const deadline = 100000000000;

    // 50 tokens on arbitrum
    let altDict = {
        "0x3506424F91fD33084466F402d5D97f05F8e3b4AF": null, //tether
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": null, // usdc
        "0x6B175474E89094C44Da98b954EedeAC495271d0F": null, //dai
        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": null, //wbtc
        "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": null, //uni
        "0x514910771AF9Ca656af840dff83E8264EcF986CA": null, //chainlink
        "0x853d955aCEf822Db058eb8505911ED77F175b99e": null, //frax
        "0x8dd5fbCe2F6a956C3022bA3663759011Dd51e73E": null, //true usd
        "0xc944e90c64b2c07662a292be6244bdf05cda44a7": null, //graph token
        "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6": null, //decentralized usd
        "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd": null,//loopring
        "0xD533a949740bb3306d119CC777fa900bA034cd52": null, //curve dao
        "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0": null, //frax share
        "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD": null, //terrausd
        "0xc00e94Cb662C3520282E6f5717214004A7f26888": null, //compound
        "0x6810e776880C02933D47DB1b9fc05908e5386b96": null, //gnosis
        "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2": null, //sushitoken
        "0x58b6A8A3302369DAEc383334672404Ee733aB239": null, //livepeer token
        "0xD28807D7eF028AF6728d12Ccd621b2242Da2a64f": null, //gmx
        "0x0f2D719407FdBeFF09D87557AbB7232601FD9F29": null,  //synapse
        "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e": null, //yearn
        "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3": null, //mim
        "0xba100000625a3754423978a60c9317c58a424e3D": null, //balancer
        "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828": null, //uma
        "0xDDB3422497E61e13543BeA06989C0789117555c5": null, //coti
        "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9": null, //aave
        "0x111111111117dc0aa78b770fa6a738034120c302": null, //1inch
        "0x4F9254C83EB525f9FCf346490bbb3ed28a81C667": null, //celr
        "0x57Ab1E02fEE23774580C119740129eAC7081e9D3": null, //synth usd
        "0x090185f2135308BaD17527004364eBcC2D37e5F6": null, //spell
        "0xbC396689893D065F41bc2C6EcbeE5e0085233447": null, //perpetual
        "0xD291E7a03283640FDc51b121aC401383A46cC623": null, //rari governance
        "0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd": null, //dodo 
        "0x0391D2021f89DC339F60Fff84546EA23E337750f": null, //bond barnbridge
        "0xA2120b9e674d3fC3875f415A7DF52e382F141225": null, //automata
        "0x3472A5A71965499acd81997a54BBA8D852C6E53d": null, //badger
        "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419": null, //diatoken
        "0x08d967bb0134F2d07f7cfb6E246680c53927DD30": null, //math token
        "0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e": null, //uni bright
        "0xDDdddd4301A082e62E84e43F474f044423921918": null, //deversifi
        "0x16ECCfDbb4eE1A85A33f3A9B21175Cd7Ae753dB4": null, //route
        "0x0Ae055097C6d159879521C384F1D2123D1f195e6": null, //stake dao
        "0x970B9bB2C0444F5E81e9d0eFb84C8ccdcdcAf84d": null, //fuse token
        "0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0": null, //dforce
        "0x0000000000095413afC295d19EDeb1Ad7B71c952": null, //tokenlon
        "0x2ba592F78dB6436527729929AAf6c908497cB200": null, //cream
        "0x1C9491865a1DE77C5b6e19d2E6a5F1D7a6F2b25F": null, //antimatter finance
        "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2": null, //meta MTA
        "0x43044f861ec040DB59A7e324c40507adDb673142": null, //cap 
        "0xeEAA40B28A2d1b0B08f6f97bB1DD4B75316c6107": null, //govi *
        "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42": null, //mcdex mcb
        "0x9695e0114e12C0d3A3636fAb5A18e6b737529023": null, //dfyn 
        "0xcC926FCfB3eeB7E846D9D06072636022016DFc06": null, //elk 
    };
    // just testing uniswap to see if signature works
    let dict = { "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": null }; //uni

    for(let key in dict){

        // this code calls getApprovalDigest to get digest - still does not work 
            // const tokenContract = new ethers.Contract(key, erc20abi['abi'], wallet);

            // const nonce = await tokenContract.nonces(wallet.address);
            // const deadline = ethers.constants.MaxUint256
            // const digest = await getApprovalDigest(
            //     tokenContract,
            //     { owner: wallet.address, spender: spender, value: value },
            //     nonce,
            //     deadline
            // )

            // console.log("digest: ", digest);
            // const signature = await wallet.signMessage(digest);

            // const recoverAddr = await recoverAddress(digest, signature);
            // console.log("address: ", recoverAddr);

            // const { v, r, s } = ecsign(Buffer.from(digest.slice(2), 'hex'), Buffer.from(wallet.privateKey.slice(2), 'hex'))
    
            // await expect(tokenContract.callStatic.permit(wallet.address, spender, value, deadline, v, hexlify(r), hexlify(s), {gasLimit: 2000000}))
    
        // this code tests the library signERC2612Permit - still does not work
            // const tokenContract = new ethers.Contract(key, erc20abi['abi'], wallet);

            // const value1 = ethers.utils.formatEther('1');

            // const result = await signERC2612Permit(wallet, tokenContract.address, owner, spender, ethers.BigNumber.from(value).toString());
            
            // const recoverAddr = await recoverAddress("0x23f864e3cdf6edcd574561c992325cc81020dc33fb3802c07306554f218ee0c6", result);
            // console.log("address: ", recoverAddr);
            // console.log(owner === recoverAddr);
            // await tokenContract.callStatic.permit(wallet.address, spender, value, result.deadline, result.v, result.r, result.s, {gasLimit: 2000000});
        
        // this code tests getPermigSignature - still does not work
            const tokenContract = new ethers.Contract(key, erc20abi['abi'], wallet);
            const { v, r, s} = await getPermitSignature(wallet, tokenContract, spender, value, deadline);

            const tx = await tokenContract.callStatic.permit(wallet.address, spender, value, deadline, v, r, s, {gasLimit: 2000000});
        
        
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
    }
    console.log(dict);

    //writing results to a json file
    // console.log(dict);
    // var dictstring = JSON.stringify(dict);
    // fs.writeFile("tokens.json", dictstring, function(err: any, result: any) {
    //     if(err){
    //         console.log('error with exporting data to json', err);
    //     }
    // });

}


// another function to test out signature
export async function getPermitSig(
        wallet: Wallet,
        token: any,
        spender: string,
        value: any,
        deadline: any,
        optional?: { nonce?: number; name?: string; chainId?: number; version?: string }
      ): Promise<any> { //Promise<Signature>
        const [nonce, name, version, chainId] = await Promise.all([
          optional?.nonce ?? token.nonces(wallet.address),
          optional?.name ?? token.name(),
          optional?.version ?? '1',
          optional?.chainId ?? wallet.getChainId(),
        ])
    
    const typedData = { 
        types: {
            EIP712Domain: [
                {name: "name", type: "string"},
                {name: "version", type: "string"},
                {name: "chainId", type: "uint256"},
                {name: "verifyingContract", type: "address"},
            ],
            Permit: [
                { name: 'owner', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'nonce', type: 'uint256'},
                { name: 'deadline', type: 'uint256' },
            ],
        },
        primaryType: "Permit",
        domain: {
            "name": name,
            "version": '1',
            "chainId": chainId,
            "verifyingContract": token.address
        },
        message: {
           "owner": wallet.address,
            "spender": spender,
            "value": value,
            "nonce": nonce,
            "deadline": deadline
        }
    }
    
    const digest = TypedDataUtils.encodeDigest(typedData);
    console.log("digest: ", ethers.utils.hexlify(digest));
    //testing if signature is accurate and can recover public key 
    const signature = await wallet.signMessage(digest);
    let recovered = ethers.utils.recoverPublicKey(digest, signature);
    console.log("recovered: ", recovered);
    console.log("public key: ", wallet.publicKey);
    return digest;
}

main();

// another function to get signature
    export async function getPermitSignature(
        wallet: Wallet,
        token: any,
        spender: any,
        value: any,
        deadline: any,
        permitConfig?: { nonce?: number; name?: string; chainId?: number; version?: string }
      ): Promise<Signature> { //Promise<Signature>
        const [nonce, name, version, chainId] = await Promise.all([
          permitConfig?.nonce ?? token.nonces(wallet.address),
          permitConfig?.name ?? token.name(),
          permitConfig?.version ?? '1',
          permitConfig?.chainId ?? wallet.getChainId(),
        ])
    
        //checking the digest to see if its the same as uniswap contract when called with same parameters in remix
        const nonce1 = nonce.add(1);
        let abiCoder = ethers.utils.defaultAbiCoder;
        const domaintypehash = keccak256(ethers.utils.toUtf8Bytes("EIP712Domain(string name,uint256 chainId,address verifyingContract)"));
        const permittypehash = keccak256(ethers.utils.toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"));
        const domainSeparator = keccak256(abiCoder.encode(["bytes32", "bytes32", "uint", "address"], [domaintypehash, keccak256(ethers.utils.toUtf8Bytes(name)), chainId, token.address]));
        const structHash = keccak256(abiCoder.encode(["bytes32", "address", "address", "uint256", "uint256", "uint256"], [permittypehash, wallet.address, spender, value, 2, deadline]));
        const digest = keccak256(ethers.utils.solidityPack(["string", "bytes32", "bytes32"], ["\x19\x01", domainSeparator, structHash]))
        
        console.log(name, version, chainId, token.address);
        
        return splitSignature(
          await wallet._signTypedData(
            {
              name,
              version,
              chainId,
              verifyingContract: token.address,
            },
            {
              Permit: [
                { name: 'owner', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'nonce', type: 'uint256'},
                { name: 'deadline', type: 'uint256' },
              ],
            },
            {
              owner: wallet.address,
              spender,
              value,
              nonce,
              deadline,
            }
          )
        )
        }

    // another example of how uniswap v2 gets signature
    const PERMIT_TYPEHASH = keccak256(
        toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)')
        )

    function getDomainSeparator(name: string, tokenAddress: string) {
        return keccak256(
            defaultAbiCoder.encode(
            ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
            [
                keccak256(toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
                keccak256(toUtf8Bytes(name)),
                keccak256(toUtf8Bytes('1')),
                1,
                tokenAddress
            ]
            )
        )
    }
          

    export async function getApprovalDigest(
        token: Contract,
        approve: {
            owner: string
            spender: string
            value: BigNumber
        },
        nonce: BigNumber,
        deadline: BigNumber
        ): Promise<string> {
        const name = await token.name()
        const DOMAIN_SEPARATOR = getDomainSeparator(name, token.address)
        return keccak256(
            solidityPack(
            ['bytes1', 'bytes1', 'bytes32', 'bytes32'],
            [
                '0x19',
                '0x01',
                DOMAIN_SEPARATOR,
                keccak256(
                defaultAbiCoder.encode(
                    ['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'],
                    [PERMIT_TYPEHASH, approve.owner, approve.spender, approve.value, nonce, deadline]
                )
                )
            ]
            )
        )
        }

    //https://github.com/Uniswap/v2-core/blob/4dd59067c76dea4a0e8e4bfdda41877a6b16dedc/test/shared/utilities.ts#L52

