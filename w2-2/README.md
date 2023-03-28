# 作业
## 合约
### Score.sol
```
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
```

### IScore.sol

```
interface IScore {
    function setScore(address _addr, uint256 _score) external;
}
```

### Teacher.sol

```
contract Teacher {
    IScore iScore;

    constructor(address s) {
        iScore = IScore(s);
    }

    function setScore(address _addr, uint256 _score) external {
        iScore.setScore(_addr, _score);
    }
}
```

## 测试

```
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
    async function deployContract() {
        const [owner, otherAccount] = await ethers.getSigners();
        const Score = await ethers.getContractFactory("Score");
        const Teacher = await ethers.getContractFactory("Teacher");
        const score = await Score.deploy();
        await score.deployed();
        const teacher = await Teacher.deploy(score.address);
        await teacher.deployed();
        console.log('score: ' + score.address + ';teacher: ' + teacher.address);

        return { score, teacher, owner, otherAccount }
    }

    describe("Score", function () {
        it("Should has right score if set Score from teacher", async function () {
            const { score, teacher, owner } = await deployContract();
            const teacherHash = await score.setTeacher(teacher.address);
            const scoreHash = await teacher.setScore(owner.address, 90);
            expect(await score.students(owner.address)).to.equal(90);
        });
    });
});
```

## 部署

```
const hre = require("hardhat");

async function main() {
  const Score = await hre.ethers.getContractFactory("Score");
  const Teacher = await hre.ethers.getContractFactory("Teacher");
  const score = await Score.deploy();
  await score.deployed();
  const teacher = await Teacher.deploy(score.address);
  await teacher.deployed();

  console.log(
    `score address is ${score.address}, teacher address is ${teacher.address} `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

