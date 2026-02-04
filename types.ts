export interface Node {
  id: string;
  ip: string;
  port: number;
  status: 'active' | 'pending' | 'legacy' | 'offline';
  uptime: number;
  version: string;
  lastSeen: string;
  isDynamic: boolean;
}

export interface ChainStats {
  height: number;
  hashrate: number;
  difficulty: number;
  circulatingSupply: number;
  masternodeCount: number;
  forkHeight: number;
}

export interface ProposalDiff {
  filename: string;
  description: string;
  oldCode: string;
  newCode: string;
}