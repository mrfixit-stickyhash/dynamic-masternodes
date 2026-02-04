import { ChainStats, Node, ProposalDiff } from './types';

export const INITIAL_STATS: ChainStats = {
  height: 498420,
  hashrate: 125000000,
  difficulty: 8452,
  circulatingSupply: 15400000,
  masternodeCount: 42,
  forkHeight: 500000,
};

export const MOCK_NODES: Node[] = [
  { id: '1', ip: '192.168.1.101', port: 8000, status: 'active', uptime: 99.9, version: '0.1.5', lastSeen: '2 mins ago', isDynamic: false },
  { id: '2', ip: '10.0.0.52', port: 8000, status: 'active', uptime: 98.5, version: '0.1.5', lastSeen: '1 min ago', isDynamic: false },
  { id: '3', ip: '172.16.0.23', port: 8000, status: 'legacy', uptime: 45.0, version: '0.1.4', lastSeen: '5 hours ago', isDynamic: false },
  { id: '4', ip: '203.0.113.1', port: 8000, status: 'pending', uptime: 10.0, version: '0.2.0-beta', lastSeen: 'Just now', isDynamic: true },
  { id: '5', ip: '198.51.100.44', port: 8000, status: 'active', uptime: 92.1, version: '0.2.0-beta', lastSeen: '3 mins ago', isDynamic: true },
];

export const IMPLEMENTATION_DIFFS: ProposalDiff[] = [
  {
    filename: 'yadacoin/core/nodes.py',
    description: 'Switch from hardcoded seeds to database-driven peer discovery.',
    oldCode: `class Nodes(object):
    def __init__(self, config):
        self.config = config
        self.nodes = [
            {'host': '127.0.0.1', 'port': 8000},
            {'host': '203.0.113.5', 'port': 8000},
            # ... hardcoded list
        ]`,
    newCode: `class Nodes(object):
    def __init__(self, config):
        self.config = config
        self.nodes = []
    
    def get_nodes(self):
        # Fetch active masternodes from the chain state
        # Logic activates after FORK_HEIGHT
        if self.config.network == 'mainnet':
             return self.config.mongo.db.masternodes.find({
                 'active': True,
                 'last_seen': {'$gt': time.time() - 3600}
             })
        return self.nodes`
  },
  {
    filename: 'yadacoin/core/chain.py',
    description: 'Define the fork activation height for dynamic masternode logic.',
    oldCode: `class Chain(object):
    def __init__(self, config):
        self.config = config
        self.latest_block = None`,
    newCode: `class Chain(object):
    # Fork Definitions
    DYNAMIC_MASTERNODE_FORK_HEIGHT = 500000

    def __init__(self, config):
        self.config = config
        self.latest_block = None
        
    def get_masternode_rules(self, height):
        if height >= self.DYNAMIC_MASTERNODE_FORK_HEIGHT:
            return DynamicMasternodeRules()
        return LegacyMasternodeRules()`
  }
];