pragma solidity ^0.5.0;


contract EthereumBank {
  //It will kep ttrack of balance of each user;
  mapping (address => uint) private _balances;

  event Deposit(address indexed user, uint amount);
  event Withdraw(address indexed user, uint amount);

  //allows user to deposit ether in the bank
  function deposit() external payable{
     uint value = msg.value;
     require(value > 0, "invalid value!");

       //No handling integer overflow and underflow here
       //Update balance of user
       _balances[msg.sender] = _balances[msg.sender] + value;
       emit Deposit(msg.sender, value);

  }
   
   //allows user to withdraw ethers from his/her balance
   //amount of Ethers to withdraw

   function withdraw(uint amount) external {
     require(amount > 0, "Amount should be greater than 0!!");
     //Amount to withdraw should not be greater than user's balance in bank
     require(amount <= _balances[msg.sender],"Insufficient account balance!!");
     _balances[msg.sender] = _balances[msg.sender] - amount;
     msg.sender.transfer(amount);
     emit Withdraw(msg.sender, amount);
   }

   //returns user ether balance in the bank
  function getUserBalance() external view returns(uint){
    return _balances[msg.sender];
  }

    constructor() public {
  }
  
}
