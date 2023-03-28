const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
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
