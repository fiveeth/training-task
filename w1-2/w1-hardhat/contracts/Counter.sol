// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Counter {

    uint256 count;
    address public owner;

    constructor(uint256 initValue) {
        count = initValue;
        owner = msg.sender;
    }

    function add() external {
        require(msg.sender == owner, "just owner can do this!");
        count += 1;
    }

    function get() view external returns(uint256) {
        return count;
    }
}