import React from 'react';

const AiSummaryCard = ({ insight }) => {
  return (
    <div className="bg-slate-800/80 border border-indigo-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300">
          ✨
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-indigo-200">AI Generated Insights</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {insight || "Dashboard metrics are stable. All client components and state flows are running optimally."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiSummaryCard;
