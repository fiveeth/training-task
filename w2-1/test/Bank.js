const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBank() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    await bank.deployed();
    console.log('bank: ' + bank.address);

    return {bank, owner, otherAccount}
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { bank, owner } = await deployBank();

      expect(await bank.owner()).to.equal(owner.address);
    });
  });

  describe("Withdrawals", function () {
    describe("Transfers", function () {
      it("Should has right balance if transfer from metamask", async function () {
        const { bank, owner } = await deployBank();
        const transactionHash = await owner.sendTransaction({
          to: bank.address,
          value: ethers.utils.parseEther("5")
        })
        expect(await bank.banlanceOf(owner.address)).to.equal(5);
      });

      it("Should withdraw all to the owner", async function () {
        const { bank, owner, otherAccount } = await deployBank();
        const transactionHash = await owner.sendTransaction({
          to: bank.address,
          value: ethers.utils.parseEther("5")
        })
        const balance = await ethers.provider.getBalance(bank.address);
        await bank.withdrawAll();
        expect(await ethers.provider.getBalance(bank.address)).to.eq(0);
      });
    });
  });
});
