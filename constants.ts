
import { Asset, RevenueData } from './types';

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'as-001',
    name: 'Cyberpunk Soundscape Vol 1',
    creator: '0x71C...492',
    type: 'audio',
    thumbnail: 'https://picsum.photos/seed/music/400/225',
    params: {
      minPrice: 0.2,
      royaltyPercentage: 5,
      durationDays: 365,
      allowCommercial: true,
      exclusive: false
    }
  },
  {
    id: 'as-002',
    name: 'Neon Streets - 4K Loop',
    creator: '0x71C...492',
    type: 'video',
    thumbnail: 'https://picsum.photos/seed/neon/400/225',
    params: {
      minPrice: 0.5,
      royaltyPercentage: 10,
      durationDays: 180,
      allowCommercial: false,
      exclusive: true
    }
  }
];

export const MOCK_REVENUE: RevenueData[] = [
  { month: 'Jan', revenue: 1.2, forecast: 1.2 },
  { month: 'Feb', revenue: 1.5, forecast: 1.6 },
  { month: 'Mar', revenue: 2.1, forecast: 2.3 },
  { month: 'Apr', revenue: 1.8, forecast: 2.5 },
  { month: 'May', revenue: 2.4, forecast: 3.2 },
  { month: 'Jun', revenue: 0, forecast: 4.5 },
];

export const CONTRACT_BYTECODE_SAMPLE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CreatorVaultLicense {
    address public creator;
    address public licensee;
    uint256 public expiration;
    uint256 public royaltyBps;
    bool public isExclusive;

    constructor(
        address _creator,
        address _licensee,
        uint256 _duration,
        uint256 _royalty,
        bool _exclusive
    ) payable {
        creator = _creator;
        licensee = _licensee;
        expiration = block.timestamp + _duration;
        royaltyBps = _royalty;
        isExclusive = _exclusive;
    }

    function releaseRoyalty() external {
        require(block.timestamp <= expiration, "License expired");
        // Automated distribution logic here
    }
}
`;
