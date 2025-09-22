import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@Components/UI/Table";
import { Badge } from "@Components/UI/Badge";
import { Button } from "@Components/UI/Button";

import { Download, MoreHorizontal, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import KPICard from "@Components/Admin/Dashboard/KPICard";

const statusConfig = {
  paid: { color: "emerald", icon: CheckCircle },
  sent: { color: "blue", icon: FileText },
  overdue: { color: "amber", icon: Clock },
  cancelled: { color: "slate", icon: XCircle },
  draft: { color: "slate", icon: FileText }
};

// Dummy frontend data
const dummyInvoices = [
  { id: 1, invoice_number: "INV-001", client_id: "ClientA", invoice_date: new Date(), total_amount: 120000, status: "paid" },
  { id: 2, invoice_number: "INV-002", client_id: "ClientB", invoice_date: new Date(), total_amount: 85000, status: "overdue" },
  { id: 3, invoice_number: "INV-003", client_id: "ClientC", invoice_date: new Date(), total_amount: 50000, status: "sent" },
  { id: 4, invoice_number: "INV-004", client_id: "ClientD", invoice_date: new Date(), total_amount: 40000, status: "draft" },
];

export default function BillingPage() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInvoices(dummyInvoices);
      setIsLoading(false);
    }, 1000);
  }, []);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total_amount, 0) / 100;
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.total_amount, 0) / 100;
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.total_amount, 0) / 100;

  return (
    <div className="space-y-6">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <KPICard title="Total Invoiced" value={`$${totalInvoiced.toLocaleString()}`} icon={FileText} color="blue" />
        <KPICard title="Total Paid" value={`$${totalPaid.toLocaleString()}`} icon={CheckCircle} color="emerald" />
        <KPICard title="Total Overdue" value={`$${totalOverdue.toLocaleString()}`} icon={XCircle} color="amber" />
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <CardTitle>All Invoices</CardTitle>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="w-4 h-4" /> Export All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border">
            <Table className="min-w-full">
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center p-4">Loading invoices...</TableCell>
                  </TableRow>
                ) : (
                  invoices.map(invoice => {
                    const config = statusConfig[invoice.status];
                    const badgeClass = `bg-${config.color}-100 text-${config.color}-800 border-${config.color}-200`;
                    return (
                      <TableRow key={invoice.id} className="hover:bg-slate-50 cursor-pointer">
                        <TableCell className="font-mono">{invoice.invoice_number}</TableCell>
                        <TableCell>{invoice.client_id}</TableCell>
                        <TableCell>{format(new Date(invoice.invoice_date), "MMM d, yyyy")}</TableCell>
                        <TableCell>${(invoice.total_amount / 100).toFixed(2)}</TableCell>
                        <TableCell><Badge className={badgeClass}>{invoice.status}</Badge></TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="p-1"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}