// TELsTP Blockchain Configuration
// Polygon Network Settings

export const BLOCKCHAIN_CONFIG = {
  // Network settings
  polygon: {
    chainId: '0x89', // Polygon Mainnet
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  
  // Contract addresses (update after deployment)
  contracts: {
    // Token contracts
    TELSTP_TOKEN: '0xTELSTPTokenAddressHere', // Main TELSTP ERC20 token
    REWARD_TOKEN: '0xRewardTokenAddressHere',   // Reward token for staking
    
    // DeFi contracts
    RESEARCH_STAKING: '0xResearchStakingAddressHere',
    RESEARCH_GOVERNANCE: '0xResearchGovernanceAddressHere',
    IP_REGISTRATION: '0xIPRegistrationAddressHere',
    
    // Treasury and system wallets
    TREASURY_WALLET: '0xTreasuryWalletAddressHere',
    DEPLOYER_WALLET: '0xDeployerWalletAddressHere',
    EMERGENCY_WALLET: '0xEmergencyWalletAddressHere'
  },
  
  // Tokenomics parameters
  tokenomics: {
    TELSTP: {
      name: 'TELsTP Token',
      symbol: 'TELSTP',
      decimals: 18,
      totalSupply: '1000000000', // 1 Billion
      initialDistribution: {
        founder: 50, // 50%
        staking: 20, // 20%
        community: 15, // 15%
        governance: 10, // 10%
        ecosystem: 5  // 5%
      }
    },
    
    // Staking parameters
    staking: {
      rewardRate: 1000, // tokens per block
      lockupPeriod: 30, // days
      earlyWithdrawalPenalty: 10 // 10%
    },
    
    // IP Registration parameters
    ipRegistration: {
      registrationFee: 1000, // TELSTP tokens
      registrationPeriod: 365, // days (1 year)
      renewalFee: 1000, // TELSTP tokens
      maxRegistrationsPerWallet: 100
    },
    
    // Governance parameters
    governance: {
      proposalThreshold: 10000, // TELSTP tokens needed to propose
      votingPeriod: 7, // days
      quorum: 4, // 4% of total supply
      timelockDelay: 2 // days
    }
  },
  
  // Gas settings
  gas: {
    defaultGasLimit: 500000,
    maxGasPrice: '500', // gwei
    speed: {
      slow: { gasPrice: '100', confirmations: 1 },
      normal: { gasPrice: '200', confirmations: 2 },
      fast: { gasPrice: '300', confirmations: 3 }
    }
  }
};

export const getContractAddress = (contractName: keyof typeof BLOCKCHAIN_CONFIG.contracts) => {
  return BLOCKCHAIN_CONFIG.contracts[contractName];
};

export const getTokenomicsConfig = () => {
  return BLOCKCHAIN_CONFIG.tokenomics;
};

export default BLOCKCHAIN_CONFIG;