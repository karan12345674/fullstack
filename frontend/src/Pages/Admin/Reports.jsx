import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Button } from "@Components/UI/Button";
import { FileText, Download, Calendar } from "lucide-react";

// Dummy report data
const reports = [
  {
    title: "Monthly Revenue Report",
    description: "Detailed breakdown of MRR, new revenue, and churn.",
    icon: FileText,
  },
  {
    title: "Client Churn Analysis",
    description: "Analyze churn rates by plan, cohort, and reason.",
    icon: FileText,
  },
  {
    title: "Message Usage Audit",
    description: "Complete log of all messages sent and received by client.",
    icon: FileText,
  },
  {
    title: "AI Cost & Usage Report",
    description: "Track AI-related costs and usage patterns per client.",
    icon: FileText,
  },
  {
    title: "AR Aging Report",
    description: "View outstanding invoices and accounts receivable.",
    icon: FileText,
  },
  {
    title: "Tax Summary Report",
    description: "Summary of taxes collected for a given period.",
    icon: FileText,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <p className="text-slate-500">
            Create and schedule custom reports tailored to your needs.
          </p>
          <Button className="mt-2">
            <Calendar className="w-4 h-4 mr-2" /> Schedule a Report
          </Button>
        </CardHeader>
      </Card>

      {/* Pre-built Reports */}
      <div>
        <h3 className="text-xl font-bold mb-4">Pre-built Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <report.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">
                      {report.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" /> Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}