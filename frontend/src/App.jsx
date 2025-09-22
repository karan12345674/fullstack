// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";


// import UserList from "./Components/UserList";

// // Layouts
// import AdminLayout from "./Components/Layouts"; // Admin Layout with Sidebar
// import HomeLayout from "./Components/HomeLayout"; // ✅ Home Layout import

// // ✅ Navbar remove kar diya
// import Dashboardnavbar from "./Components/Dashboardnavbar";  
// import Footer from "./Components/Footer";

// // Public Pages
// import Home from "./Components/Home";
// import Feature from "./Components/Feature";
// import Pricing from "./Components/Pricing";
// import About from "./Components/About";
// import Contact from "./Components/Contact";

// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import Freetrial from "./Pages/Freetrial";

// // Dashboard Pages
// import Dashboard from "./Pages/Dashboard";
// import Dashboardtwo from "./Pages/Dashboardtwo";
// import Teampage from "./Pages/Teampage";
// import Userinfo from "./Pages/Userinfo";
// import TemplateLibrary from "./Pages/TemplateLibrary";
// import YourTemplates from "./Pages/YourTemplates";
// import NewTemplate from "./Pages/NewTemplate";
// import BroadcastHistory from "./Pages/BroadcastHistory";
// import Contacts from "./Pages/Contacts";
// import Analytics from "./Pages/Analytics";
// import ProductDetails from "./Pages/ProductDetails";
// import ProfileSettings from "./Pages/ProfileSettings";


// // Admin Pages
// import AdminDashboard from "./Pages/Admin/Dashboard";
// import Clients from "./Pages/Admin/Clients";
// import Reports from "./Pages/Admin/Reports";
// import Billing from "./Pages/Admin/Billing";
// import Settings from "./Pages/Admin/Settings";
// import AIugase from "./Pages/Admin/AIugase";
// import Messages from "./Pages/Admin/Messages";
// import ClientProfile from "./Pages/Admin/ClientProfile";

// // Admin Dashboard Components
// import KPICard from "./Components/Admin/Dashboard/KPICard";
// import QuickActions from "./Components/Admin/Dashboard/QuickActions";
// import RevenueChart from "./Components/Admin/Dashboard/RevenueChart";
// import AlertsFeed from "./Components/Admin/Dashboard/AlertsFeed";
// import ClientActivity from "./Components/Admin/Dashboard/ClientActivity";
// import DashboardNavbar from "./Components/Dashboardnavbar";

// function LayoutWrapper() {
//   const location = useLocation();

//   // Admin pages ke liye footer aur navbar hide karenge
//   const isAdminRoute = location.pathname.startsWith("/admin");
//   const isDashboardRoute = location.pathname.startsWith("/dashboard"); 
//   const noFooterRoutes = ["/login", "/signup", "/freetrial"];

//   return (
//     <>
//       {/* ✅ Ab sirf DashboardNavbar dikhayenge dashboard pages me */}
//       {!isAdminRoute && isDashboardRoute && <Dashboardnavbar />}

//       <Routes>
//         {/* Public Pages with HomeLayout */}
//         <Route path="/" element={<HomeLayout />}>
//           <Route index element={<Home />} />
//           <Route path="feature" element={<Feature />} />
//           <Route path="pricing" element={<Pricing />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//         </Route>

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/freetrial" element={<Freetrial />} />
//         <Route path="/signuptwo" element={<Login />} />
//         <Route path="/logintwo" element={<Dashboard />} />
//          <Route path="/logintwo" element={<Dashboardtwo />} />
//         <Route path="/subscription" element={<Pricing />} />
//         <Route path="/freetrial2" element={<ProfileSettings />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Dashboard Pages */}
//         <Route path="/dashboard/*" element={<Outlet />}>
//           <Route index element={<Dashboard />} />
//           <Route path="team-inbox" element={<Teampage />} />
          
//           <Route path="profile" element={<Userinfo />} />
//           <Route path="broadcast" element={<TemplateLibrary />} />
//           <Route path="template-library" element={<TemplateLibrary />} />
//           <Route path="your-templates" element={<YourTemplates />} />
//           <Route path="new-template" element={<NewTemplate />} />
//           <Route path="new-template/:id" element={<NewTemplate />} />
//           <Route path="broadcast-history" element={<BroadcastHistory />} />
//           <Route path="contacts" element={<Contacts />} />
//           <Route path="analytics" element={<Analytics />} />
//           <Route path="chatbots" element={<ProductDetails />} />
          
//         </Route>
//           <Route path="/logo" element={<Dashboard />} />
//           {/* <Route path="/logo" element={<Dashboardnavbar />} /> */}
        
//         {/* Admin Pages */}
//         <Route path="/admin/*" element={<AdminLayout />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="clients" element={<Clients />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="billing" element={<Billing />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="aiugase" element={<AIugase />} />
//           <Route path="messages" element={<Messages />} />
//           <Route path="clientprofile" element={<ClientProfile />} />

//           {/* Admin Dashboard Components */}
//           <Route path="kpi" element={<KPICard />} />
//           <Route path="quick-actions" element={<QuickActions />} />
//           <Route path="revenue" element={<RevenueChart />} />
//           <Route path="alerts" element={<AlertsFeed />} />
//           <Route path="clients-activity" element={<ClientActivity />} />
//         </Route>
//       </Routes>

//       {/* Footer only for non-admin pages */}
//       {!isAdminRoute && !noFooterRoutes.includes(location.pathname) && <Footer />}
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <LayoutWrapper />
//       <UserList />
//     </Router>
//   );
// }








import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";


import ScrollToTop from "./Components/ScrollTop";
import dotenv from "dotenv";

// Layouts
import AdminLayout from "./Components/Layouts"; // Admin Layout with Sidebar
import HomeLayout from "./Components/HomeLayout"; // ✅ Home Layout import

// ✅ Navbar remove kar diya
import Dashboardnavbar from "./Components/Dashboardnavbar";  
import Footer from "./Components/Footer";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

// Public Pages
import Home from "./Components/Home";
import Feature from "./Components/Feature";
import Pricing from "./Components/Pricing";
import About from "./Components/About";
import Contact from "./Components/Contact";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Freetrial from "./Pages/Freetrial";

// Dashboard Pages
import Dashboard from "./Pages/Dashboard";
//import Dashboardtwo from "./Pages/Dashboardtwo";
import Teampage from "./Pages/Teampage";
import Userinfo from "./Pages/Userinfo";
import TemplateLibrary from "./Pages/TemplateLibrary";
import YourTemplates from "./Pages/YourTemplates";
import NewTemplate from "./Pages/NewTemplate";
import BroadcastHistory from "./Pages/BroadcastHistory";
import Contacts from "./Pages/Contacts";
import Analytics from "./Pages/Analytics";
import ProductDetails from "./Pages/ProductDetails";
import ProfileSettings from "./Pages/ProfileSettings";


// Admin Pages
import AdminDashboard from "./Pages/Admin/Dashboard";
import Clients from "./Pages/Admin/Clients";
import Reports from "./Pages/Admin/Reports";
import Billing from "./Pages/Admin/Billing";
import Settings from "./Pages/Admin/Settings";
import AIugase from "./Pages/Admin/AIugase";
import Messages from "./Pages/Admin/Messages";
import ClientProfile from "./Pages/Admin/ClientProfile";

// Admin Dashboard Components
import KPICard from "./Components/Admin/Dashboard/KPICard";
import QuickActions from "./Components/Admin/Dashboard/QuickActions";
import RevenueChart from "./Components/Admin/Dashboard/RevenueChart";
import AlertsFeed from "./Components/Admin/Dashboard/AlertsFeed";
import ClientActivity from "./Components/Admin/Dashboard/ClientActivity";
import DashboardNavbar from "./Components/Dashboardnavbar";

function LayoutWrapper() {
  const location = useLocation();

  // Admin pages ke liye footer aur navbar hide karenge
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDashboardRoute = location.pathname.startsWith("/dashboard"); 
  const noFooterRoutes = ["/login", "/signup", "/freetrial"];

  return (
    <>
      {/* ✅ Ab sirf DashboardNavbar dikhayenge dashboard pages me */}
      {!isAdminRoute && isDashboardRoute && <Dashboardnavbar />}

      <Routes>
        {/* Public Pages with HomeLayout */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="feature" element={<Feature />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
           <Route path="/privacy" element={<PrivacyPolicy />} />
        </Route>
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/freetrial" element={<Freetrial />} />
        <Route path="/signuptwo" element={<Login />} />
        <Route path="/logintwo" element={<Dashboard />} />
         {/* <Route path="/logintwo" element={<Dashboardtwo />} /> */}
        <Route path="/subscription" element={<Pricing />} />
        <Route path="/freetrial2" element={<ProfileSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}

        {/* Dashboard Pages */}
        <Route path="/dashboard/*" element={<Outlet />}>
          <Route index element={<Dashboard />} />
          <Route path="team-inbox" element={<Teampage />} />
          
          <Route path="profile" element={<Userinfo />} />
          <Route path="broadcast" element={<TemplateLibrary />} />
          <Route path="template-library" element={<TemplateLibrary />} />
          <Route path="your-templates" element={<YourTemplates />} />
          <Route path="new-template" element={<NewTemplate />} />
          <Route path="new-template/:id" element={<NewTemplate />} />
          <Route path="broadcast-history" element={<BroadcastHistory />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="chatbots" element={<ProductDetails />} />
          
        </Route>
          <Route path="/logo" element={<Dashboard />} />
          {/* <Route path="/logo" element={<Dashboardnavbar />} /> */}
          <Route path="/privacytwo" element={<PrivacyPolicy />} />
        
        {/* Admin Pages */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="reports" element={<Reports />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="aiugase" element={<AIugase />} />
          <Route path="messages" element={<Messages />} />
          <Route path="clientprofile" element={<ClientProfile />} />

          {/* Admin Dashboard Components */}
          <Route path="kpi" element={<KPICard />} />
          <Route path="quick-actions" element={<QuickActions />} />
          <Route path="revenue" element={<RevenueChart />} />
          <Route path="alerts" element={<AlertsFeed />} />
          <Route path="clients-activity" element={<ClientActivity />} />
        </Route>
      </Routes>

      {/* Footer only for non-admin pages */}
      {!isAdminRoute && !noFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
  <LayoutWrapper />
    
    </Router>
  );
}