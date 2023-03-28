// SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;

contract Score {

    address owner;
    address teacher;

    mapping (address => uint256) public students;

    error NotTeacher();

    modifier onlyTeacher {
        if(msg.sender != teacher) {
            revert NotTeacher();
        }
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setTeacher(address _addr) external {
        require(owner == msg.sender, 'only owner can do this');
        teacher = _addr;
    }

    function setScore(address _addr, uint256 _score) external onlyTeacher {
        require(_score<=100, 'the maximum score is 100');
        students[_addr] = _score;
    }
}