// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ResearchStaking is Ownable, ReentrancyGuard {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    
    uint256 public totalStaked;
    uint256 public rewardRate = 1000; // 1000 tokens per block
    uint256 public lastUpdateBlock;
    uint256 public rewardPerTokenStored;
    
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public stakedAmounts;
    
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    
    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        lastUpdateBlock = block.number;
    }
    
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "ResearchStaking: amount must be greater than 0");
        
        stakingToken.transferFrom(msg.sender, address(this), amount);
        
        _updateReward(msg.sender);
        
        stakedAmounts[msg.sender] += amount;
        totalStaked += amount;
        
        emit Staked(msg.sender, amount);
    }
    
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "ResearchStaking: amount must be greater than 0");
        require(stakedAmounts[msg.sender] >= amount, "ResearchStaking: insufficient staked amount");
        
        _updateReward(msg.sender);
        
        stakedAmounts[msg.sender] -= amount;
        totalStaked -= amount;
        
        stakingToken.transfer(msg.sender, amount);
        
        emit Withdrawn(msg.sender, amount);
    }
    
    function getReward() external nonReentrant {
        _updateReward(msg.sender);
        
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }
    
    function exit() external {
        withdraw(stakedAmounts[msg.sender]);
        getReward();
    }
    
    function _updateReward(address account) internal {
        rewardPerTokenStored = _getRewardPerToken();
        
        if (block.number > lastUpdateBlock && totalStaked > 0) {
            uint256 reward = (block.number - lastUpdateBlock) * rewardRate;
            rewardToken.mint(address(this), reward);
        }
        
        rewards[account] += stakedAmounts[account] * 
            (rewardPerTokenStored - userRewardPerTokenPaid[account]) / 1e18;
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        lastUpdateBlock = block.number;
    }
    
    function _getRewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + 
            ((block.number - lastUpdateBlock) * rewardRate * 1e18) / totalStaked;
    }
    
    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }
}