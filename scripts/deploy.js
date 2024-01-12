const hre = require("hardhat");


async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const token = await ethers.deployContract("EXTO");

  console.log("Token address:", await token.getAddress());

  
  //await token.getChainID();

  // owners.forEach(async owner => {
  //   let ownerBalance = await extoToken.balanceOf(owner.address);
  
  //   console.log(ownerBalance);    
  // });



  // //const token = await MyTest.attach(MyTest.target);


  // //await token.withdraw();
  
  // console.log(`contract deployed to: ${MyTest.target}`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
