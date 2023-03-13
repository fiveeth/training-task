const { expect } = require("chai");
const { ethers } = require("hardhat");

let counter;
describe("Counter", function() {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        // 实例化合约
        const Counter = await ethers.getContractFactory("Counter");
        counter = await Counter.deploy(5);
        await counter.deployed();
        console.log('counter: ' + counter.address);
    }

    before(async function() {
        await init();
    })

    it("init equal 0", async function() {
        expect(await counter.get()).to.equals(5);
    })

    it("add 1 equal 6", async function() {
        let tx = await counter.add();
        await tx.wait();
        expect(await counter.get()).to.equals(6);
    })
})