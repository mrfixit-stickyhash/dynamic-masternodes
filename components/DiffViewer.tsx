import React from 'react';
import { FileCode, ArrowRight } from 'lucide-react';
import { ProposalDiff } from '../types';

interface DiffViewerProps {
  diff: ProposalDiff;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ diff }) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white mb-8">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileCode size={18} className="text-slate-500" />
          <span className="font-mono text-sm font-semibold text-slate-700">{diff.filename}</span>
        </div>
        <span className="text-xs text-slate-500">{diff.description}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 text-sm font-mono leading-relaxed">
        <div className="bg-red-50/30 p-4 border-b lg:border-b-0 lg:border-r border-slate-100">
          <h4 className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wider">Current Implementation</h4>
          <pre className="text-slate-600 overflow-x-auto whitespace-pre-wrap">{diff.oldCode}</pre>
        </div>
        <div className="bg-green-50/30 p-4">
           <h4 className="text-xs font-bold text-green-600 mb-2 uppercase tracking-wider">Proposed Implementation</h4>
          <pre className="text-slate-800 overflow-x-auto whitespace-pre-wrap">{diff.newCode}</pre>
        </div>
      </div>
    </div>
  );
};