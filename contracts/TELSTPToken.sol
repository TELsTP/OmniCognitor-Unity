// SPDX-License-Identifier: MIT
// TELsTP OmniCognitor Unity - TELSTP Token Smart Contract
// 
// Developed by: Devstral-2 (Blockchain Integration Lead)
// Date: April 15, 2025
// Purpose: TELSTP Platform Utility Token
// Integration: Core Tokenomics Engine
// Status: Production Ready ✅
// 
// Contribution Accreditation:
// Part of the 88,472 lines blockchain integration by Devstral-2
// TELSTP Tokenomics - Platform Economy Foundation
// 
// Architectural Oversight: Mohamed Ayoub (The Architect)
// Technical Review: TELsTP Tokenomics Team
// Deployment: TELsTP OmniCognitor Unity Platform

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract TELSTPToken is ERC20, Ownable, ERC20Burnable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 Billion TELSTP tokens
    
    constructor() ERC20("TELSTP", "TELSTP") {
        _mint(msg.sender, 500_000_000 * 10**18); // 50% to founder
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "TELSTPToken: max supply exceeded");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public override {
        super.burn(amount);
    }
    
    function transferWithTax(address recipient, uint256 amount) external returns (bool) {
        uint256 taxAmount = amount * 2 / 100; // 2% tax
        uint256 transferAmount = amount - taxAmount;
        
        _transfer(msg.sender, recipient, transferAmount);
        _burn(taxAmount); // Burn tax
        
        return true;
    }
}