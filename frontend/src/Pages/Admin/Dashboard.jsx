import React from "react";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";

// Charts
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Icons
import { Users } from "lucide-react";

// Admin Dashboard Components
import KPICard from "../../Components/Admin/Dashboard/KPICard";
import QuickActions from "../../Components/Admin/Dashboard/QuickActions";
import RevenueChart from "../../Components/Admin/Dashboard/RevenueChart";
import AlertsFeed from "../../Components/Admin/Dashboard/AlertsFeed";
import ClientActivity from "../../Components/Admin/Dashboard/ClientActivity";


const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Dashboard() {
  // Dummy (फेक) डेटा सिर्फ UI दिखाने के लिए
  const totalClients = 120;
  const activeClients = 95;
  const trialClients = 15;
  const monthlyRevenue = 55000;
  const totalMessages = 230;
  const systemHealth = 99.9;

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 }
  ];

  const planDistribution = [
    { name: "Free Trial", value: trialClients, color: COLORS[0] },
    { name: "Starter", value: 30, color: COLORS[1] },
    { name: "Professional", value: 45, color: COLORS[2] },
    { name: "Enterprise", value: 30, color: COLORS[3] }
  ];

  const alerts = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    description: "Planned downtime at midnight.",
    severity: "medium",
    created_date: "2024-09-15T10:30:00Z"
  },
  {
    id: 2,
    title: "New Client Surge",
    description: "Unusual spike in client sign-ups detected.",
    severity: "low",
    created_date: "2024-09-16T08:45:00Z"
  },
  {
    id: 3,
    title: "High Error Rate",
    description: "API error rate exceeded 5% in last 10 mins.",
    severity: "critical",
    created_date: "2024-09-16T09:15:00Z"
  }
];


  const clients = [
  {
    id: 1,
    company_name: "Client A",
    status: "active",
    signup_date: "2024-01-10",
    monthly_spend: 1200,
    messages_sent_month: 350
  },
  {
    id: 2,
    company_name: "Client B",
    status: "trial",
    signup_date: "2024-02-15",
    monthly_spend: 800,
    messages_sent_month: 150
  }
];


  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Clients"
          value={activeClients}
          total={totalClients}
          icon={Users}
          trend={12}
          trendDirection="up"
          color="blue"
        />
        <KPICard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          icon={Users}
          trend={8.5}
          trendDirection="up"
          color="emerald"
        />
        <KPICard
          title="Messages Today"
          value={totalMessages.toLocaleString()}
          icon={Users}
          trend={-2.1}
          trendDirection="down"
          color="violet"
        />
        <KPICard
          title="System Health"
          value={`${systemHealth}%`}
          icon={Users}
          trend={0.1}
          trendDirection="up"
          color={systemHealth > 99 ? "emerald" : "amber"}
        />
      </div>

      {/* Charts and Actions Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} isLoading={false} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Plan Distribution & Real-time Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden shadow-sm border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              Plan Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {planDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ClientActivity clients={clients.slice(0, 8)} isLoading={false} />
      </div>

      {/* Alerts Feed */}
      <AlertsFeed alerts={alerts} isLoading={false} />
    </div>
  );
}