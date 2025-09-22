import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Button } from "@Components/UI/Button";
import {
  Plus,
  Download,
  CreditCard,
  UserX,
  AlertCircle,
  Settings,
} from "lucide-react";

const defaultActions = [
  {
    title: "Create Client",
    description: "Add new client account",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
    action: "create_client",
  },
  {
    title: "Export Report",
    description: "Download billing report",
    icon: Download,
    color: "bg-emerald-500 hover:bg-emerald-600",
    action: "export_report",
  },
  {
    title: "Issue Credits",
    description: "Add account credits",
    icon: CreditCard,
    color: "bg-violet-500 hover:bg-violet-600",
    action: "issue_credits",
  },
  {
    title: "Suspend Client",
    description: "Temporarily disable account",
    icon: UserX,
    color: "bg-amber-500 hover:bg-amber-600",
    action: "suspend_client",
  },
  {
    title: "System Alert",
    description: "Create manual alert",
    icon: AlertCircle,
    color: "bg-red-500 hover:bg-red-600",
    action: "create_alert",
  },
  {
    title: "Settings",
    description: "Platform configuration",
    icon: Settings,
    color: "bg-slate-500 hover:bg-slate-600",
    action: "settings",
  },
];

export default function QuickActions({ actions = defaultActions }) {
  const handleAction = (actionType) => {
    console.log("Quick action:", actionType);
    alert(`Action triggered: ${actionType}`); // 👉 सिर्फ demo के लिए
  };

  return (
    <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-emerald-600" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 p-3 flex flex-col items-center gap-2 hover:shadow-sm transition-all duration-200"
              onClick={() => handleAction(action.action)}
            >
              <div
                className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}
              >
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-xs text-slate-900">
                  {action.title}
                </div>
                <div className="text-xs text-slate-500">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}