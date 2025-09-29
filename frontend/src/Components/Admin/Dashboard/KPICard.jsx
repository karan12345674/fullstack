import React from "react";
import { Card, CardContent } from "@Components/UI/Card";
import { TrendingUp, TrendingDown, Users } from "lucide-react";

const colorConfig = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: "bg-blue-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: "bg-emerald-500",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    icon: "bg-violet-500",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    icon: "bg-amber-500",
  },
};

export default function KPICard({
  title = "Active Users", // 👉 default dummy title
  value = 1200, // 👉 default dummy value
  total = 1500, // 👉 dummy total
  icon: Icon = Users, // 👉 default icon
  trend = 5.2, // 👉 dummy trend %
  trendDirection = "up", // 👉 default trend direction
  color = "blue",
}) {
  const colors = colorConfig[color];

  return (
    <Card className="overflow-hidden shadow-sm border-0 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              {total && <p className="text-sm text-slate-500">/ {total}</p>}
            </div>
            {trend !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {trendDirection === "up" ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ₹{
                    trendDirection === "up"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {Math.abs(trend)}%
                </span>
                <span className="text-sm text-slate-500">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div
            className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}