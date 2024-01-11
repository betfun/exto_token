const hre = require("hardhat");


async function main() {

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;  

  const lockedAmount = hre.ethers.parseEther("0.001");

  let MyTest = await hre.ethers.deployContract("MyTest", [unlockTime], {
    value: lockedAmount,
  });

  await MyTest.waitForDeployment();

  const token = await MyTest.attach(MyTest.target);

  const rst = await token.withdraw();
  console.log(rst);
  console.log(`contract deployed to: ${MyTest.target}`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
