import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// UI Components
import { Card, CardContent } from "@Components/UI/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@Components/UI/Table";
import { Input } from "@Components/UI/Input";
import { Button } from "@Components/UI/Button";
import { Badge } from "@Components/UI/Badge";
import { PlusCircle, Mail, Trash, MoreHorizontal, Search } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import API_BASE_URL from "../../config";

// Status colors
const statusColors = {
  trial: "bg-blue-100 text-blue-800 border-blue-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  suspended: "bg-red-100 text-red-800 border-red-200",
  past_due: "bg-amber-100 text-amber-800 border-amber-200",
  cancelled: "bg-slate-100 text-slate-800 border-slate-200",
};

export default function ClientsPage() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/clients`); // API from previous step
        setClients(res.data);
        setFilteredClients(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Filter clients based on search
  useEffect(() => {
    const results = clients.filter(client =>
      client.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchTerm, clients]);

  const handleRowClick = (clientId) => {
    navigate(`/admin/clientprofile?id=${clientId}`);
  };

  const handleSelectClient = (clientId) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClients(filteredClients.map(c => c.id));
    } else {
      setSelectedClients([]);
    }
  };

  return (
    <Card className="p-4 md:p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg md:text-xl font-bold text-slate-800">Client Management</h2>
          <p className="text-sm text-slate-500">Search, filter, and manage all your clients.</p>
        </div>
        <Button className="flex items-center">
          <PlusCircle className="w-4 h-4 mr-2" /> Add New Client
        </Button>
      </div>

      {/* Search & Bulk Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {selectedClients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-slate-600">{selectedClients.length} selected</span>
            <Button variant="outline" size="sm" className="flex items-center gap-1"><Mail className="w-4 h-4" /> Email</Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700"><Trash className="w-4 h-4" /> Suspend</Button>
          </div>
        )}
      </div>

      {/* Client Table */}
      <div className="overflow-auto rounded-lg border">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-12"><input type="checkbox" onChange={handleSelectAll} /></TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Signup Date</TableHead>
              <TableHead>Monthly Spend</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center p-4">Loading clients...</TableCell>
              </TableRow>
            ) : filteredClients.length > 0 ? (
              filteredClients.map(client => (
                <TableRow key={client.id} className="hover:bg-slate-50 cursor-pointer">
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedClients.includes(client.id)} onChange={() => handleSelectClient(client.id)} />
                  </TableCell>
                  <TableCell onClick={() => handleRowClick(client.id)} className="font-medium text-slate-800">{client.company_name}</TableCell>
                  <TableCell onClick={() => handleRowClick(client.id)}>{client.plan_tier}</TableCell>
                  <TableCell onClick={() => handleRowClick(client.id)}>
                    <Badge className={statusColors[client.status]}>{client.status}</Badge>
                  </TableCell>
                  <TableCell onClick={() => handleRowClick(client.id)}>{format(new Date(client.signup_date), "MMM d, yyyy")}</TableCell>
                  <TableCell onClick={() => handleRowClick(client.id)}>₹{(client.monthly_spend || 0).toFixed(2)}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRowClick(client.id)}
                      className="p-2 md:p-1"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center p-6 text-slate-500">
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}