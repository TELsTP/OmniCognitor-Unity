const hre = require("hardhat");

async function main() {
  // Deploy TELSTP Token
  console.log("Deploying TELSTP Token...");
  const TELSTPToken = await hre.ethers.getContractFactory("TELSTPToken");
  const telstpToken = await TELSTPToken.deploy();
  await telstpToken.waitForDeployment();
  console.log(`TELSTPToken deployed to: ${await telstpToken.getAddress()}`);
  
  // Deploy Research Staking
  console.log("Deploying Research Staking...");
  const ResearchStaking = await hre.ethers.getContractFactory("ResearchStaking");
  const researchStaking = await ResearchStaking.deploy(
    await telstpToken.getAddress(),
    await telstpToken.getAddress()
  );
  await researchStaking.waitForDeployment();
  console.log(`ResearchStaking deployed to: ${await researchStaking.getAddress()}`);
  
  // Deploy Research Governance
  console.log("Deploying Research Governance...");
  const ResearchGovernance = await hre.ethers.getContractFactory("ResearchGovernance");
  const researchGovernance = await ResearchGovernance.deploy(await telstpToken.getAddress());
  await researchGovernance.waitForDeployment();
  console.log(`ResearchGovernance deployed to: ${await researchGovernance.getAddress()}`);
  
  console.log("\nDeployment complete!");
  console.log("TELSTP Token:", await telstpToken.getAddress());
  console.log("Research Staking:", await researchStaking.getAddress());
  console.log("Research Governance:", await researchGovernance.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});