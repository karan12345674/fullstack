import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@Components/UI/Tabs";
import { Users, Key, Webhook, Bell, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full p-4 md:p-6 lg:p-8 space-y-6">
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          <TabsTrigger value="roles" className="flex items-center justify-center">
            <Users className="w-4 h-4 mr-2" /> Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center justify-center">
            <Key className="w-4 h-4 mr-2" /> API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center justify-center">
            <Webhook className="w-4 h-4 mr-2" /> Webhooks
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center justify-center">
            <Bell className="w-4 h-4 mr-2" /> Alerts
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center justify-center">
            <CreditCard className="w-4 h-4 mr-2" /> Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-4">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Manage user roles and their associated permissions across the platform.
                <br />
                <span className="text-sm text-slate-500">
                  (UI for permission matrix to be built here)
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-4">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle>Platform API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Manage global API keys for platform-level integrations.
                <br />
                <span className="text-sm text-slate-500">
                  (UI for API key management to be built here)
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-4">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle>Webhook Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Configure webhook endpoints to receive real-time event notifications.
                <br />
                <span className="text-sm text-slate-500">
                  (UI for webhook configuration to be built here)
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle>Notification & Alert Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Configure thresholds and delivery channels for system and billing alerts.
                <br />
                <span className="text-sm text-slate-500">
                  (UI for alert configuration to be built here)
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle>Billing & Payment Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Connect and manage integrations with Stripe, PayPal, QuickBooks, etc.
                <br />
                <span className="text-sm text-slate-500">
                  (UI for integration management to be built here)
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}