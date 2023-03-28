// SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;

import "./IScore.sol";

contract Teacher {
    IScore iScore;

    constructor(address s) {
        iScore = IScore(s);
    }

    function setScore(address _addr, uint256 _score) external {
        iScore.setScore(_addr, _score);
    }
}