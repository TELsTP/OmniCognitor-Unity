import { ethers } from 'ethers';
import { supabaseService } from './supabase';

// Contract Addresses from configuration
import { getContractAddress } from '../config/blockchain';

const TELSTP_TOKEN_ADDRESS = getContractAddress('TELSTP_TOKEN');
const RESEARCH_STAKING_ADDRESS = getContractAddress('RESEARCH_STAKING');
const RESEARCH_GOVERNANCE_ADDRESS = getContractAddress('RESEARCH_GOVERNANCE');

// ABI imports
import TELSTPTokenABI from '../contracts/artifacts/TELSTPToken.json';
import ResearchStakingABI from '../contracts/artifacts/ResearchStaking.json';
import ResearchGovernanceABI from '../contracts/artifacts/ResearchGovernance.json';

export interface TokenomicsData {
  totalSupply: string;
  circulatingSupply: string;
  stakedAmount: string;
  rewardRate: string;
  governanceProposals: number;
  tokenPrice: string;
  marketCap: string;
}

export interface StakingPosition {
  amount: string;
  rewards: string;
  apr: string;
}

export const defiService = {
  
  async connectWallet(): Promise<string> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not detected. Please install MetaMask.');
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      return accounts[0];
    } catch (error) {
      throw new Error('Failed to connect wallet: ' + error.message);
    }
  },

  async getProvider(): Promise<ethers.providers.Web3Provider> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not detected');
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x89' }] // Polygon Mainnet
    });

    return new ethers.providers.Web3Provider(window.ethereum);
  },

  async getTokenomicsData(): Promise<TokenomicsData> {
    try {
      const provider = await this.getProvider();
      
      // Get token data
      const tokenContract = new ethers.Contract(
        TELSTP_TOKEN_ADDRESS,
        TELSTPTokenABI.abi,
        provider
      );
      
      const totalSupply = await tokenContract.totalSupply();
      
      // Get staking data
      const stakingContract = new ethers.Contract(
        RESEARCH_STAKING_ADDRESS,
        ResearchStakingABI.abi,
        provider
      );
      
      const stakedAmount = await stakingContract.totalStaked();
      const rewardRate = await stakingContract.rewardRate();
      
      // Get governance data
      const governanceContract = new ethers.Contract(
        RESEARCH_GOVERNANCE_ADDRESS,
        ResearchGovernanceABI.abi,
        provider
      );
      
      const proposalCount = await governanceContract.proposalCount();
      
      // Mock data for token price and market cap (would integrate with oracle in production)
      const tokenPrice = '0.10'; // $0.10 per TELSTP
      const circulatingSupply = ethers.utils.formatEther(totalSupply.toString());
      const marketCap = (parseFloat(circulatingSupply) * parseFloat(tokenPrice)).toFixed(2);
      
      return {
        totalSupply: ethers.utils.formatEther(totalSupply.toString()),
        circulatingSupply,
        stakedAmount: ethers.utils.formatEther(stakedAmount.toString()),
        rewardRate: rewardRate.toString(),
        governanceProposals: parseInt(proposalCount.toString()),
        tokenPrice,
        marketCap: marketCap.toString()
      };
      
    } catch (error) {
      console.error('Failed to fetch tokenomics data:', error);
      throw new Error('Failed to fetch tokenomics data: ' + error.message);
    }
  },

  async getStakingPosition(address: string): Promise<StakingPosition> {
    try {
      const provider = await this.getProvider();
      const stakingContract = new ethers.Contract(
        RESEARCH_STAKING_ADDRESS,
        ResearchStakingABI.abi,
        provider
      );
      
      const amount = await stakingContract.stakedAmounts(address);
      const rewards = await stakingContract.rewards(address);
      
      // Calculate APR (simplified - would use more complex calculation in production)
      const rewardRate = await stakingContract.rewardRate();
      const totalStaked = await stakingContract.totalStaked();
      const apr = totalStaked.gt(0) 
        ? rewardRate.mul(365 * 24 * 60 * 60).div(totalStaked).toString()
        : '0';
      
      return {
        amount: ethers.utils.formatEther(amount.toString()),
        rewards: ethers.utils.formatEther(rewards.toString()),
        apr: apr
      };
      
    } catch (error) {
      console.error('Failed to fetch staking position:', error);
      throw new Error('Failed to fetch staking position: ' + error.message);
    }
  },

  async stakeTokens(amount: string, address: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      
      const tokenContract = new ethers.Contract(
        TELSTP_TOKEN_ADDRESS,
        TELSTPTokenABI.abi,
        signer
      );
      
      const stakingContract = new ethers.Contract(
        RESEARCH_STAKING_ADDRESS,
        ResearchStakingABI.abi,
        signer
      );
      
      // Approve token transfer
      const approveTx = await tokenContract.approve(
        RESEARCH_STAKING_ADDRESS,
        ethers.utils.parseEther(amount)
      );
      await approveTx.wait();
      
      // Stake tokens
      const stakeTx = await stakingContract.stake(ethers.utils.parseEther(amount));
      const receipt = await stakeTx.wait();
      
      return receipt.transactionHash;
      
    } catch (error) {
      console.error('Staking failed:', error);
      throw new Error('Staking failed: ' + error.message);
    }
  },

  async unstakeTokens(amount: string, address: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      
      const stakingContract = new ethers.Contract(
        RESEARCH_STAKING_ADDRESS,
        ResearchStakingABI.abi,
        signer
      );
      
      const tx = await stakingContract.withdraw(ethers.utils.parseEther(amount));
      const receipt = await tx.wait();
      
      return receipt.transactionHash;
      
    } catch (error) {
      console.error('Unstaking failed:', error);
      throw new Error('Unstaking failed: ' + error.message);
    }
  },

  async claimRewards(address: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      
      const stakingContract = new ethers.Contract(
        RESEARCH_STAKING_ADDRESS,
        ResearchStakingABI.abi,
        signer
      );
      
      const tx = await stakingContract.getReward();
      const receipt = await tx.wait();
      
      return receipt.transactionHash;
      
    } catch (error) {
      console.error('Claim rewards failed:', error);
      throw new Error('Claim rewards failed: ' + error.message);
    }
  }
};

export const useDeFi = () => {
  return defiService;
};