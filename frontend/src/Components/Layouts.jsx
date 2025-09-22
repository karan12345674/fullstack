// src/Layouts/Layout.jsx
import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  Bot,
  FileText,
  Settings,
  Bell,
  Shield,
  Search,
  User,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@Components/UI/Sidebar";
import { Button } from "@Components/UI/Button";
import { Badge } from "@Components/UI/Badge";

const navigationItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard, badge: null },
  { title: "Clients", url: "/admin/clients", icon: Users, badge: null },
  { title: "Billing", url: "/admin/billing", icon: CreditCard, badge: "3" },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare, badge: null },
  { title: "AI Usage", url: "/admin/ai-usage", icon: Bot, badge: null },
  { title: "Reports", url: "/admin/reports", icon: FileText, badge: null },
  { title: "Settings", url: "/admin/settings", icon: Settings, badge: null },
];

export default function Layout({ currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">

        {/* Sidebar */}
        <Sidebar className="border-r border-slate-200 bg-white w-full md:w-64 flex-shrink-0">
          {/* Sidebar Header */}
          <SidebarHeader className="border-b border-slate-200 p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">WhatsApp Pro</h2>
                <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent className="p-2 md:p-4 overflow-y-auto flex-1">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mb-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`group transition-all duration-200 rounded-lg ${
                          location.pathname === item.url
                            ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium truncate">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="ml-auto bg-red-100 text-red-700 border-red-200"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6 md:mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mb-2">
                System Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Messages/Hour</span>
                    <span className="font-semibold text-emerald-600">2.4k</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">API Uptime</span>
                    <span className="font-semibold text-emerald-600">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Active Alerts</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      2
                    </Badge>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">Founder Access</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <SidebarTrigger className="md:hidden hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 truncate">
                  {currentPageName || "Dashboard"}
                </h1>
                <p className="text-sm text-slate-500 truncate">
                  Manage your WhatsApp messaging platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clients, invoices..."
                  className="pl-10 pr-4 py-2 w-64 md:w-80 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>

              <Button variant="outline" size="icon">
                <Shield className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Main content area */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet /> {/* Nested routes render here */}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}