"use client";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, DollarSign } from 'lucide-react';

export default function Dashboard() {
  interface Log {
    id: number;
    agent_name: string;
    execution_status: string;
    tokens_used: number;
    cost: number;
    timestamp: string;
  }

  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/logs");


        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error("Error fetching telemetry logs:", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalTokens = logs.reduce((acc, log) => acc + log.tokens_used, 0);
  const totalCost = logs.reduce((acc, log) => acc + log.cost, 0);
  const uniqueAgents = new Set(logs.map(log => log.agent_name)).size;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-400">Agentic System Telemetry</h1>
        <p className="text-slate-400 text-sm">Real-time DevOps monitor for autonomous agent behavior</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center space-x-4">
          <DollarSign className="text-emerald-400 w-8 h-8" />
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Total API Cost</p>
            <h3 className="text-2xl font-bold">${totalCost.toFixed(4)}</h3>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center space-x-4">
          <Cpu className="text-indigo-400 w-8 h-8" />
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Total Tokens Emitted</p>
            <h3 className="text-2xl font-bold">{totalTokens.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center space-x-4">
          <Activity className="text-amber-400 w-8 h-8" />
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Active Agent Instances</p>
            <h3 className="text-2xl font-bold">{uniqueAgents}</h3>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">Cost Accumulation Trend</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={logs}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="timestamp" stroke="#64748b" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Line type="monotone" dataKey="cost" stroke="#818cf8" strokeWidth={2} dot={{ fill: '#818cf8' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Stream Logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800"><h2 className="text-lg font-semibold">Live Agent Stream</h2></div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="p-4">Agent Name</th>
              <th className="p-4">Execution Status</th>
              <th className="p-4">Tokens</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-900/50 transition">
                <td className="p-4 font-mono text-indigo-300">{log.agent_name}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    log.execution_status === 'Error Loop' 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {log.execution_status}
                  </span>
                </td>
                <td className="p-4 text-slate-300">{log.tokens_used}</td>
                <td className="p-4 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
