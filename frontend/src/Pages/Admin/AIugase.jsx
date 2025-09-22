import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@Components/UI/Table";
import { BrainCircuit, ToyBrick, DollarSign } from "lucide-react";
import KPICard from "@Components/Admin/Dashboard/KPICard";

import { format } from "date-fns";

// Dummy data for frontend
const dummyAIInteractions = [
  { id: 1, timestamp: new Date(), client_id: "ClientA", content_masked: "Hello AI...", ai_tokens_used: 120, ai_cost: 15 },
  { id: 2, timestamp: new Date(), client_id: "ClientB", content_masked: "Generate report...", ai_tokens_used: 200, ai_cost: 25 },
  { id: 3, timestamp: new Date(), client_id: "ClientC", content_masked: "Analyze data...", ai_tokens_used: 150, ai_cost: 18 },
  { id: 4, timestamp: new Date(), client_id: "ClientD", content_masked: "Create message...", ai_tokens_used: 180, ai_cost: 22 },
];

export default function AIUsagePage() {
  const [aiMessages, setAiMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setAiMessages(dummyAIInteractions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const totalInteractions = aiMessages.length;
  const totalTokens = aiMessages.reduce((sum, msg) => sum + msg.ai_tokens_used, 0);
  const totalCost = aiMessages.reduce((sum, msg) => sum + msg.ai_cost, 0);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard title="Total AI Interactions" value={totalInteractions.toLocaleString()} icon={BrainCircuit} color="violet" />
        <KPICard title="Total Tokens Used" value={totalTokens.toLocaleString()} icon={ToyBrick} color="blue" />
        <KPICard title="Estimated Cost" value={`$${totalCost.toFixed(2)}`} icon={DollarSign} color="emerald" />
      </div>

      {/* AI Interaction Table */}
      <Card>
        <CardHeader>
          <CardTitle>AI Interaction Log</CardTitle>
          <p className="text-slate-500">Detailed log of all AI-powered message interactions.</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Content (Masked)</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center p-4">
                      Loading AI interactions...
                    </TableCell>
                  </TableRow>
                ) : (
                  aiMessages.map(msg => (
                    <TableRow key={msg.id}>
                      <TableCell>{format(new Date(msg.timestamp), "MMM d, HH:mm")}</TableCell>
                      <TableCell>{msg.client_id}</TableCell>
                      <TableCell className="font-mono text-sm">{msg.content_masked}</TableCell>
                      <TableCell>{msg.ai_tokens_used}</TableCell>
                      <TableCell>${msg.ai_cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}