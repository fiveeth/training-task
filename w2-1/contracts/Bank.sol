// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Bank {
    address public owner;

    mapping (address => uint) public balanceOf;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, 'just owner can do this');
        _;
    }   

    function withdraw() external {
        (bool success, ) = msg.sender.call{value: balanceOf[msg.sender]}(new bytes(0));
        require(success, 'transfer failed');

        balanceOf[msg.sender] = 0;
    }

    function withdrawAll() external onlyOwner {
        uint amount = address(this).balance;
        payable(owner).transfer(amount);
    }

    receive() external payable {
        balanceOf[msg.sender] += msg.value;
    }
}