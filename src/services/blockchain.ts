import { ethers } from 'ethers';
import { supabaseService } from './supabase';

// Polygon Network Configuration
const POLYGON_RPC_URL = 'https://polygon-rpc.com';
const IP_REGISTRY_CONTRACT_ADDRESS = '0x...'; // To be deployed

// IP Registry Contract ABI (simplified)
const IP_REGISTRY_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "ipHash", "type": "string"},
      {"internalType": "string", "name": "metadataURI", "type": "string"},
      {"internalType": "address", "name": "owner", "type": "address"}
    ],
    "name": "registerIP",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "ipId", "type": "uint256"}],
    "name": "getIPDetails",
    "outputs": [
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "address", "name": "", "type": "address"},
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export interface IPRegistration {
  id: string;
  ipHash: string;
  metadataURI: string;
  ownerAddress: string;
  transactionHash: string;
  timestamp: string;
  status: 'pending' | 'registered' | 'failed';
}

export const blockchainService = {
  
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

  async registerIP(ipHash: string, metadataURI: string, ownerAddress: string): Promise<IPRegistration> {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        IP_REGISTRY_CONTRACT_ADDRESS,
        IP_REGISTRY_ABI,
        signer
      );

      // Register IP on blockchain
      const tx = await contract.registerIP(ipHash, metadataURI, ownerAddress);
      const receipt = await tx.wait();

      // Save to Supabase for indexing
      const registration: IPRegistration = {
        id: receipt.transactionHash,
        ipHash,
        metadataURI,
        ownerAddress,
        transactionHash: receipt.transactionHash,
        timestamp: new Date().toISOString(),
        status: 'registered'
      };

      await supabaseService.saveMemory(`ip_${receipt.transactionHash}`, {
        ...registration,
        blockchainData: {
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString()
        }
      });

      return registration;
    } catch (error) {
      console.error('IP Registration Error:', error);
      throw new Error('Failed to register IP: ' + error.message);
    }
  },

  async getIPDetails(ipId: string): Promise<any> {
    try {
      const provider = await this.getProvider();
      const contract = new ethers.Contract(
        IP_REGISTRY_CONTRACT_ADDRESS,
        IP_REGISTRY_ABI,
        provider
      );

      return await contract.getIPDetails(ipId);
    } catch (error) {
      console.error('Get IP Details Error:', error);
      throw new Error('Failed to get IP details: ' + error.message);
    }
  },

  async verifyIPOwnership(ipId: string, address: string): Promise<boolean> {
    try {
      const details = await this.getIPDetails(ipId);
      return details[2].toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error('Ownership Verification Error:', error);
      return false;
    }
  }
};

export const useBlockchain = () => {
  return blockchainService;
};