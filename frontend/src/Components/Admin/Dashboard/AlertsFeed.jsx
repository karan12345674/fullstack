import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Badge } from "@Components/UI/Badge";
import { Button } from "@Components/UI/Button";
import { Skeleton } from "@Components/UI/Skeleton";

import { AlertTriangle, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { format } from "date-fns";

const severityConfig = {
  low: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Clock,
  },
  medium: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: AlertTriangle,
  },
  high: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: AlertTriangle,
  },
  critical: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
};

export default function AlertsFeed({ alerts = [], isLoading = false }) {
  // 👉 अगर backend data नहीं आता तो dummy alerts use करो
  if (!alerts || alerts.length === 0) {
    alerts = [
      {
        id: 1,
        title: "Server CPU Usage High",
        description: "CPU usage crossed 85% threshold.",
        severity: "high",
        created_date: new Date(),
      },
      {
        id: 2,
        title: "New Version Deployed",
        description: "Version 2.5 deployed successfully.",
        severity: "low",
        created_date: new Date(),
      },
    ];
  }

  const handleAcknowledge = (alertId) => {
    console.log("Acknowledge alert:", alertId);
  };

  const handleView = (alertId) => {
    console.log("View alert details:", alertId);
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            Active Alerts
            <Badge
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200"
            >
              {alerts.length}
            </Badge>
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <p className="text-slate-500">No active alerts</p>
            <p className="text-sm text-slate-400">
              System is running smoothly
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const config = severityConfig[alert.severity] || severityConfig.low;
              const IconComponent = config.icon;

              return (
                <div
                  key={alert.id}
                  className="flex items-start gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">
                          {alert.title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">
                          {alert.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className={config.color}>
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {format(new Date(alert.created_date), "MMM d, HH:mm")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(alert.id)}
                          className="w-8 h-8"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAcknowledge(alert.id)}
                          className="text-xs"
                        >
                          Acknowledge
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}