import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();

    // User Message update
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Direct call to Backend API
      const res = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: userMsg, prompt: userMsg, message: userMsg }),
      });

      const data = await res.json();

      if (data.reply || data.response || data.message || data.text) {
        setMessages(prev => [
          ...prev,
          { sender: 'assistant', text: data.reply || data.response || data.message || data.text }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'assistant', text: 'Server se valid response nahi mila.' }
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { sender: 'assistant', text: 'Server connection failed. Port 5000 check karein.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold">
            P
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide text-white">Prodesk Fullstack</h1>
            <p className="text-xs text-slate-400">AI Assistant Module</p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between py-2 border-b border-slate-800/80 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Server Active (Port 5000)
          </span>
          <span>Model: Gemini AI</span>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 my-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-2xl px-4 py-3">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50"
            >
              Send &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}