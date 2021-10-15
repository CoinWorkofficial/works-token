const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const {abi,bytecode} = require('./build/contracts/Work.json');
const avax_rpc = 'https://api.avax.network/ext/bc/C/rpc'
const bsc_rpc = 'https://bsc-dataseed.binance.org'
const eth_rpc = 'https://rinkeby.infura.io/v3/995836361fcf4f31a3aad338627d4453'

const web3 = new Web3(new HDWalletProvider(mnemonic,eth_rpc));
// const web3 = new Web3(new HDWalletProvider(mnemonic,bsc_rpc));

async function init(){
    try{
        let accounts = await web3.eth.getAccounts();
        const supply = '105000000'
        const _total = supply + "000000000000000000";
        const _owner = accounts[0];
        const _community = accounts[1];
        const _liq = accounts[2];
        const _mark = accounts[3];
        const _dev = accounts[4];
        const _presale = accounts[5];
        const _team = accounts[6];
        const _reserve = accounts[7];
        let contract = new web3.eth.Contract(abi);
        contract.deploy({
            data:bytecode,
            arguments:["Works Token","WORK",_total,_owner,_community,_liq,_mark,_dev,_presale,_team,_reserve]
        }).send({
            from:accounts[0],
            gas:1745805,
            // gasPrice:'40,000000000'
        }).once('transactionHash', function(transactionHash){ 
            console.log("Tx Hash:",transactionHash);
            return;
        })
        .once('receipt',async function(receipt){
            console.log("Block No:",receipt.blockNumber)
            console.log("Gas Used:",receipt.gasUsed)
            console.log("Contract Address:",receipt.contractAddress)
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