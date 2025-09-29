import React, { useState, useEffect } from "react";
import axios from "axios";
import KPICard from "../../Components/Admin/Dashboard/KPICard";
import QuickActions from "../../Components/Admin/Dashboard/QuickActions";
import RevenueChart from "../../Components/Admin/Dashboard/RevenueChart";
import AlertsFeed from "../../Components/Admin/Dashboard/AlertsFeed";
import ClientActivity from "../../Components/Admin/Dashboard/ClientActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users } from "lucide-react";
import API_BASE_URL from "../../config";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/dashboard`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Active Clients" value={data.activeClients} total={data.totalClients} icon={Users} trend={12} trendDirection="up" color="blue" />
        <KPICard title="Monthly Revenue" value={`₹${data.monthlyRevenue.toLocaleString()}`} icon={Users} trend={8.5} trendDirection="up" color="emerald" />
        <KPICard title="Messages Today" value={data.totalMessages.toLocaleString()} icon={Users} trend={-2.1} trendDirection="down" color="violet" />
        <KPICard title="System Health" value={`${data.systemHealth}%`} icon={Users} trend={0.1} trendDirection="up" color={data.systemHealth > 99 ? "emerald" : "amber"} />
      </div>

      {/* Revenue Chart & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={data.revenueData} isLoading={false} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Plan Distribution & Client Activity */}
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
                  <Pie data={data.planDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {data.planDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color || COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {data.planDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color || COLORS[index] }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ClientActivity clients={data.clients} isLoading={false} />
      </div>

      {/* Alerts Feed */}
      <AlertsFeed alerts={data.alerts} isLoading={false} />
    </div>
  );
}