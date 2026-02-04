import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Activity, 
  GitBranch, 
  Database, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { StatCard } from './components/StatCard';
import { DiffViewer } from './components/DiffViewer';
import { NetworkGrowthChart } from './components/NetworkGrowthChart';
import { INITIAL_STATS, MOCK_NODES, IMPLEMENTATION_DIFFS } from './constants';
import { ChainStats, Node } from './types';

const App: React.FC = () => {
  const [stats, setStats] = useState<ChainStats>(INITIAL_STATS);
  const [nodes, setNodes] = useState<Node[]>(MOCK_NODES);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'implementation'>('dashboard');

  // Simulate block progression
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newHeight = prev.height + 1;
        // Logic to simulate dynamic node activation close to fork
        return { ...prev, height: newHeight };
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const progressToFork = Math.min(100, (stats.height / stats.forkHeight) * 100);
  const blocksRemaining = Math.max(0, stats.forkHeight - stats.height);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Y</div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">YadaCoin <span className="font-normal text-slate-500">Explorer</span></h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
              Mainnet Active
            </span>
            <div className="h-6 w-px bg-slate-200"></div>
            <span className="text-sm text-slate-500 font-mono">Block #{stats.height.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Network Overview
            </button>
            <button
              onClick={() => setActiveTab('implementation')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'implementation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Dynamic Masternode Proposal
            </button>
          </nav>
        </div>

        {activeTab === 'dashboard' ? (
          <div className="space-y-8">
            
            {/* Fork Status Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Dynamic Masternode Activation</h2>
                  <p className="text-blue-200 max-w-xl">
                    The network is transitioning to dynamic peer discovery. This enables Pecunia platform listing and decentralized network scaling.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
                  <div className="text-xs text-blue-200 uppercase tracking-wide font-semibold mb-1">Fork Countdown</div>
                  <div className="text-3xl font-mono font-bold">{blocksRemaining.toLocaleString()}</div>
                  <div className="text-xs text-blue-300 mt-1">Blocks remaining</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-8 relative pt-1">
                <div className="flex mb-2 items-center justify-between text-xs font-semibold text-blue-200 uppercase">
                  <span>Current: {stats.height.toLocaleString()}</span>
                  <span>Target: {stats.forkHeight.toLocaleString()}</span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-800">
                  <div style={{ width: `${progressToFork}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400 transition-all duration-1000 ease-out"></div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                label="Total Masternodes" 
                value={stats.masternodeCount} 
                icon={Server} 
                trend="+12% this week" 
                trendUp={true} 
                color="indigo" 
              />
              <StatCard 
                label="Network Hashrate" 
                value="125 MH/s" 
                icon={Activity} 
                trend="+5% vs last epoch" 
                trendUp={true} 
                color="purple" 
              />
              <StatCard 
                label="Difficulty" 
                value={stats.difficulty.toLocaleString()} 
                icon={ShieldCheck} 
                color="emerald" 
              />
              <StatCard 
                label="Avg Block Time" 
                value="60.2s" 
                icon={Clock} 
                trend="-0.5s improvement" 
                trendUp={true} 
                color="orange" 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Node List */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-slate-400" />
                    Active Masternodes
                  </h3>
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <Search size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <Filter size={18} />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-xs uppercase font-medium text-slate-500">
                        <th className="px-6 py-3">Node Address</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Version</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Last Seen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {nodes.map((node) => (
                        <tr key={node.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-slate-600">{node.ip}:{node.port}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              node.status === 'active' ? 'bg-green-100 text-green-800' :
                              node.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              node.status === 'legacy' ? 'bg-gray-100 text-gray-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {node.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{node.version}</td>
                          <td className="px-6 py-4">
                            {node.isDynamic ? (
                              <span className="flex items-center text-blue-600">
                                <Activity size={14} className="mr-1.5" /> Dynamic
                              </span>
                            ) : (
                              <span className="flex items-center text-slate-400">
                                <Database size={14} className="mr-1.5" /> Static
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-slate-500">{node.lastSeen}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl text-center">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center">
                    View all nodes <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>

              {/* Growth Chart Panel */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                   <h3 className="font-semibold text-slate-900 mb-4 flex items-center justify-between">
                     <span>Network Growth</span>
                     <span className="text-xs font-normal text-slate-500">Last 6 Months</span>
                   </h3>
                   <NetworkGrowthChart />
                   <p className="text-xs text-slate-500 mt-4 text-center">
                     Projected growth after dynamic implementation
                   </p>
                </div>

                <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Listing Readiness
                  </h4>
                  <ul className="space-y-3 text-sm text-blue-800">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                      Dynamic IP discovery enabled
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                      Chain params match Pecunia requirements
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                      Fork scheduled for block 500,000
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Core Protocol Changes</h2>
              <p className="text-slate-600 mb-6">
                The following changes are proposed to the <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono text-sm">yadacoin-core</code> repository to enable dynamic masternode functionality.
              </p>
              
              <div className="space-y-6">
                {IMPLEMENTATION_DIFFS.map((diff, index) => (
                  <DiffViewer key={index} diff={diff} />
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <h3 className="text-md font-semibold text-slate-900 mb-4">Migration Strategy</h3>
                 <div className="prose prose-sm text-slate-600 max-w-none">
                    <ul className="list-disc pl-5 space-y-2">
                       <li>Nodes must upgrade to version <strong>0.2.0</strong> before block 500,000.</li>
                       <li>Legacy static nodes will continue to be trusted until the fork height.</li>
                       <li>After fork height, nodes will query the blockchain state for the active masternode list instead of using the hardcoded seed list.</li>
                    </ul>
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;