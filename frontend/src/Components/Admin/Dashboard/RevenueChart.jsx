import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@Components/UI/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { DollarSign, TrendingUp } from "lucide-react";
import { Skeleton } from "@Components/UI/Skeleton";

const defaultData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 16000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 25000 },
  { month: "Jul", revenue: 28000 },
  { month: "Aug", revenue: 30000 },
  { month: "Sep", revenue: 32000 },
  { month: "Oct", revenue: 35000 },
  { month: "Nov", revenue: 40000 },
  { month: "Dec", revenue: 45000 },
];

export default function RevenueChart({ data = defaultData, isLoading }) {
  if (isLoading) {
    return (
      <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgGrowth = 12.5; // demo ke liye fixed rakha

  return (
    <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            Monthly Revenue Trend
          </CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-emerald-600">+{avgGrowth}%</span>
            <span className="text-slate-500">avg growth</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Total: ${totalRevenue.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-sm text-slate-500"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-sm text-slate-500"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                labelClassName="text-slate-900"
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}