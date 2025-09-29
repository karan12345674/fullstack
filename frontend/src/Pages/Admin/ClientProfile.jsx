import React, { useState, useEffect } from "react";
import { Button } from "@Components/UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@Components/UI/Tabs";
import { Badge } from "@Components/UI/Badge";
import { Input } from "@Components/UI/Input";
import { ArrowLeft, User, BarChart2, CreditCard, Settings } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import API_BASE_URL from "../../config";

const statusColors = {
  trial: "bg-blue-100 text-blue-800 border-blue-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  suspended: "bg-red-100 text-red-800 border-red-200",
  past_due: "bg-amber-100 text-amber-800 border-amber-200",
  cancelled: "bg-slate-100 text-slate-800 border-slate-200",
};

export default function ClientProfile() {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/clientprofile/${userId}`);
        setClient(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching client profile:", err);
        setIsLoading(false);
      }
    };
    fetchClient();
  }, [userId]);

  if (isLoading) {
    return <div className="text-center p-8">Loading client profile...</div>;
  }

  if (!client) {
    return <div className="text-center p-8">Client not found.</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => window.history.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clients
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{client.company_name}</CardTitle>
            <p className="text-slate-500">{client.contact_email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={statusColors[client.status]}>{client.status}</Badge>
            <p className="text-sm text-slate-500">Member since {format(new Date(client.signup_date), "MMM yyyy")}</p>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview"><User className="w-4 h-4 mr-2"/>Overview</TabsTrigger>
          <TabsTrigger value="usage"><BarChart2 className="w-4 h-4 mr-2"/>Usage</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="w-4 h-4 mr-2"/>Billing</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2"/>Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Client Overview</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Contact:</strong> {client.contact_name}</p>
                <p><strong>Plan:</strong> {client.plan_tier}</p>
                <p><strong>Monthly Spend:</strong> ${client.monthly_spend.toFixed(2)}</p>
                <p><strong>Messages this month:</strong> {client.messages_sent_month}</p>
                <p><strong>AI Enabled:</strong> {client.ai_enabled ? 'Yes' : 'No'}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Usage Data</CardTitle></CardHeader>
            <CardContent><p>Usage charts and timeline will be displayed here.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Billing & Invoices</CardTitle></CardHeader>
            <CardContent><p>A list of invoices and payment history will be shown here.</p></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Client Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">API Key</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Input readOnly value={client.api_key} className="font-mono" />
                  <Button variant="outline">Reset Key</Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Integrations</h3>
                <p className="text-slate-500 mt-2">Manage connected services.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}