const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const {abi,bytecode} = require('./build/contracts/Work.json');
const avax_rpc = 'https://api.avax.network/ext/bc/C/rpc'

const web3 = new Web3(new HDWalletProvider(mnemonic,avax_rpc));

async function init(){
    try{
        let accounts = await web3.eth.getAccounts();
        const supply = '16500000'
        const _total = supply + "000000000000000000";
        const tokenAddress = "0x5d0f2cFEBa7416c57c8c456eec9b53c4a5d174b1";
        const contract = new web3.eth.Contract(abi,'0x62876080aB367E63D9991ab71B33C61929ed76B4');
        contract.methods.approve(tokenAddress,_total).send({
            from:accounts[0]
        }).once('transactionHash', function(transactionHash){ 
            console.log("Tx Hash:",transactionHash);
            return;
        })
        .once('receipt',async function(receipt){
            console.log("Block No:",receipt.blockNumber)
            console.log("Gas Used:",receipt.gasUsed)
            console.log("Token Address:",receipt.contractAddress);
            console.log("Deployer:",receipt.from)
            let price = Number.parseInt(receipt.effectiveGasPrice.split('x')[1], 16);
            console.log("Gas Price:",price);
            console.log("Deployment Cost:",Number.parseInt(receipt.effectiveGasPrice.split('x')[1], 16)* receipt.gasUsed/(10**18));
            console.log("Balance:", web3.utils.fromWei(await web3.eth.getBalance(receipt.from)))
            return;
        })
        return;
    }catch(e){
        console.log(e);
    }
}
init();