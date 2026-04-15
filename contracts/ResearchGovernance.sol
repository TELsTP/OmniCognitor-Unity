// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

contract ResearchGovernance is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    constructor(IERC20 token)
        Governor("ResearchGovernance")
        GovernorSettings(17280, 86400, 0) // 1 day voting period, 1 day voting delay
        GovernorVotes(token)
        GovernorVotesQuorumFraction(4) // 4% quorum
    {
    }
    
    // The following functions are overrides required by Solidity.
    
    function votingDelay() 
        public 
        view 
        override(Governor, GovernorSettings) 
        returns (uint256)
    {
        return super.votingDelay();
    }
    
    function votingPeriod() 
        public 
        view 
        override(Governor, GovernorSettings) 
        returns (uint256)
    {
        return super.votingPeriod();
    }
    
    function quorum(uint256 blockNumber) 
        public 
        view 
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }
    
    function state(uint256 proposalId) 
        public 
        view 
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }
    
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(Governor, GovernorTimelockControl) returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }
    
    function proposalThreshold() 
        public 
        pure
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return 0;
    }
}