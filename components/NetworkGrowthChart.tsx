import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', nodes: 30, dynamic: 0 },
  { month: 'Feb', nodes: 32, dynamic: 0 },
  { month: 'Mar', nodes: 35, dynamic: 0 },
  { month: 'Apr', nodes: 35, dynamic: 5 },
  { month: 'May', nodes: 34, dynamic: 15 },
  { month: 'Jun', nodes: 30, dynamic: 40 },
  { month: 'Jul', nodes: 28, dynamic: 80 },
];

export const NetworkGrowthChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area type="monotone" dataKey="nodes" stackId="1" stroke="#94a3b8" fill="#cbd5e1" name="Static Nodes" />
          <Area type="monotone" dataKey="dynamic" stackId="1" stroke="#3b82f6" fill="#60a5fa" name="Dynamic Nodes" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};