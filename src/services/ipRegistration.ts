import { ethers } from 'ethers';
import { supabaseService } from './supabase';

// Contract Address (to be updated after deployment)
const IP_REGISTRATION_ADDRESS = '0x...';

// ABI import
import IPRegistrationABI from '../contracts/artifacts/IPRegistration.json';

export interface IPRegistrationData {
  registrationId: number;
  owner: string;
  ipHash: string;
  description: string;
  registrationDate: string;
  expirationDate: string;
  isActive: boolean;
}

export const ipRegistrationService = {

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

  async registerIP(ipHash: string, description: string, walletAddress: string): Promise<number> {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      
      // Approve TELSTP token transfer
      const telstpTokenAddress = '0x...'; // Update with actual TELSTP token address
      const telstpContract = new ethers.Contract(
        telstpTokenAddress,
        ['function approve(address spender, uint256 amount) external returns (bool)'],
        signer
      );
      
      const registrationFee = ethers.utils.parseEther('1000'); // 1000 TELSTP
      await telstpContract.approve(IP_REGISTRATION_ADDRESS, registrationFee);
      
      // Register IP
      const ipRegistrationContract = new ethers.Contract(
        IP_REGISTRATION_ADDRESS,
        IPRegistrationABI.abi,
        signer
      );
      
      const tx = await ipRegistrationContract.registerIP(ipHash, description);
      const receipt = await tx.wait();
      
      const registrationId = receipt.events.find((e: any) => e.event === 'IPRegistered').args.registrationId;
      
      // Store in Supabase for indexing and search
      await supabaseService.registerIPInDatabase({
        registrationId: registrationId.toString(),
        owner: walletAddress,
        ipHash,
        description,
        registrationDate: new Date().toISOString(),
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      });
      
      return registrationId;
    } catch (error) {
      console.error('IP registration failed:', error);
      throw new Error('IP registration failed: ' + error.message);
    }
  },

  async getRegistration(registrationId: number): Promise<IPRegistrationData> {
    try {
      const provider = await this.getProvider();
      const ipRegistrationContract = new ethers.Contract(
        IP_REGISTRATION_ADDRESS,
        IPRegistrationABI.abi,
        provider
      );
      
      const registration = await ipRegistrationContract.getRegistration(registrationId);
      
      return {
        registrationId,
        owner: registration.owner,
        ipHash: registration.ipHash,
        description: registration.description,
        registrationDate: new Date(registration.registrationDate * 1000).toISOString(),
        expirationDate: new Date(registration.expirationDate * 1000).toISOString(),
        isActive: registration.isActive
      };
    } catch (error) {
      console.error('Failed to fetch registration:', error);
      throw new Error('Failed to fetch registration: ' + error.message);
    }
  },

  async getOwnerRegistrations(walletAddress: string): Promise<IPRegistrationData[]> {
    try {
      const provider = await this.getProvider();
      const ipRegistrationContract = new ethers.Contract(
        IP_REGISTRATION_ADDRESS,
        IPRegistrationABI.abi,
        provider
      );
      
      const registrationIds = await ipRegistrationContract.getOwnerRegistrations(walletAddress);
      
      const registrations = await Promise.all(
        registrationIds.map(async (id: number) => this.getRegistration(id))
      );
      
      return registrations;
    } catch (error) {
      console.error('Failed to fetch owner registrations:', error);
      throw new Error('Failed to fetch owner registrations: ' + error.message);
    }
  },

  async renewRegistration(registrationId: number, walletAddress: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      
      // Approve TELSTP token transfer
      const telstpTokenAddress = '0x...'; // Update with actual TELSTP token address
      const telstpContract = new ethers.Contract(
        telstpTokenAddress,
        ['function approve(address spender, uint256 amount) external returns (bool)'],
        signer
      );
      
      const registrationFee = ethers.utils.parseEther('1000'); // 1000 TELSTP
      await telstpContract.approve(IP_REGISTRATION_ADDRESS, registrationFee);
      
      // Renew registration
      const ipRegistrationContract = new ethers.Contract(
        IP_REGISTRATION_ADDRESS,
        IPRegistrationABI.abi,
        signer
      );
      
      const tx = await ipRegistrationContract.renewRegistration(registrationId);
      const receipt = await tx.wait();
      
      return receipt.transactionHash;
    } catch (error) {
      console.error('Registration renewal failed:', error);
      throw new Error('Registration renewal failed: ' + error.message);
    }
  },

  async transferRegistration(registrationId: number, newOwner: string, walletAddress: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      
      const ipRegistrationContract = new ethers.Contract(
        IP_REGISTRATION_ADDRESS,
        IPRegistrationABI.abi,
        signer
      );
      
      const tx = await ipRegistrationContract.transferRegistration(registrationId, newOwner);
      const receipt = await tx.wait();
      
      return receipt.transactionHash;
    } catch (error) {
      console.error('Registration transfer failed:', error);
      throw new Error('Registration transfer failed: ' + error.message);
    }
  }
};

export const useIPRegistration = () => {
  return ipRegistrationService;
};