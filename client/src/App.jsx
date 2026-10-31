import React, { useState } from 'react';
import AiSummaryCard from './components/AiSummaryCard';
import Chatbot from './components/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        {/* Navigation Bar */}
        <header className="bg-slate-800/80 border-b border-slate-700/80 px-6 py-4 sticky top-0 z-40 backdrop-blur-md flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Prodesk Fullstack Platform
            </h1>
          </div>

          <nav className="flex items-center space-x-2 bg-slate-900/60 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'chatbot'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              🤖 AI Assistant
            </button>
          </nav>
        </header>

        {/* Dynamic Main View */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
              {/* AI Insight Card */}
              <AiSummaryCard insight="Client-side architecture is healthy. Track A polish requirements are active and connected." />

              {/* Sample Dashboard Card */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-8 text-center text-slate-300">
                <h2 className="text-lg font-semibold text-white mb-2">Workspace Ready</h2>
                <p className="text-sm text-slate-400">
                  Select "AI Assistant" from the top navigation to test the chatbot features.
                </p>
              </div>
            </div>
          ) : (
            <Chatbot />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;