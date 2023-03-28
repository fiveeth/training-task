// SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;

interface IScore {
    function setScore(address _addr, uint256 _score) external;
}