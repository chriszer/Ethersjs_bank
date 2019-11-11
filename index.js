const ethers = require('ethers');
const Bank = require('./build/contracts/EthereumBank.json')

let contractAbi = Bank.abi;
let contractByteCode = Bank.bytecode;
let contractAddress;

var provider = new ethers.providers.JsonRpcProvider('http://localhost:7545')
//console.log(Bank.bytecode)
const deploy = async() => {
    try{
        let signerWallet = provider.getSigner(0);
        
        let factory = new ethers.ContractFactory(
        contractAbi,
        contractByteCode,
        signerWallet
        );

        var contract = await factory.deploy();

        contractAddress = contract.address
        

    } catch(error){
        console.log(error)
    }
}

const interactWithBank = async() => {
    await deploy();

    let contract = new ethers.Contract(contractAddress,contractAbi,provider);
    let wallet = provider.getSigner(1);
    contract = contract.connect(wallet);

    let balance  = await contract.getUserBalance();

    console.log(balance.toString(10));

    let parameters = {
        value: ethers.utils.parseEther('1.0')
    }
    
    //deposit
    let tx = await contract.deposit(parameters);
    console.log(tx.hash);
    
    //view balance
    balance  = await contract.getUserBalance();
    console.log(ethers.utils.formatEther(balance.toString(10)));
    
    //withdraw
    tx = await contract.withdraw(ethers.utils.parseEther('0.9'));
    console.log(tx.hash);

    balance = await contract.getUserBalance();
    console.log(ethers.utils.formatEther(balance.toString(10)));
}

interactWithBank();