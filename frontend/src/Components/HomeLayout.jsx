import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import yourLogo from '../assets/logo5.png';
import { 
  Home, 
  Layers, 
  DollarSign, 
  Users, 
  Mail,
  Menu,
  X,
  Zap,
  LogIn,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { Button } from "@Components/UI/Button";

// ✅ Dummy Helper: createPageUrl
const createPageUrl = (pageName) => {
  switch (pageName.toLowerCase()) {
    case "home":
      return "/";
    case "features":
      return "/feature";
    case "pricing":
      return "/pricing";
    case "about":
      return "/about";
    case "contact":
      return "/contact";
    default:
      return "/";
  }
};

// ✅ Dummy Helper: User Auth Simulation
const User = {
  async me() {
    return null; // yahan backend ka user data aayega
  },
  async login() {
    console.log("Login called");
  },
  async logout() {
    console.log("Logout called");
  },
};

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Home },
  { title: "Features", url: createPageUrl("Features"), icon: Layers },
  { title: "Pricing", url: createPageUrl("Pricing"), icon: DollarSign },
  { title: "About", url: createPageUrl("About"), icon: Users },
  { title: "Contact", url: createPageUrl("Contact"), icon: Mail },
];

export default function HomeLayout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    try {
      await User.login();
      checkAuth();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <style jsx>{`
        :root {
          --neon-blue: #0077ff;
          --neon-purple: #7b2cbf;
          --neon-pink: #e01e80;
          --glass-bg: rgba(255, 255, 255, 0.7);
          --glass-border: rgba(0, 0, 0, 0.08);
        }
        
        .neon-glow {
          box-shadow: 0 0 15px var(--neon-blue), 0 0 30px var(--neon-blue);
        }
        
        .glass-effect {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .holographic-bg {
          background: linear-gradient(45deg, rgba(0, 119, 255, 0.1), rgba(123, 44, 191, 0.1), rgba(224, 30, 128, 0.1));
          animation: hologram 8s ease-in-out infinite;
        }
        
        @keyframes hologram {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .nav-glow:hover {
          box-shadow: 0 0 15px rgba(0, 119, 255, 0.3);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
           <Link to="/" className="flex items-center space-x-2 group">
   <div className="flex items-center gap-2">
   <Link to="/">
     <img
       src={yourLogo}
       alt="Saka Logo"
       className="h-11 cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
     />
   </Link>
 </div>

</Link>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 nav-glow ${
                    location.pathname === item.url
                      ? 'bg-blue-500/10 text-blue-600'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>

             
{/* Auth Buttons */}
<div className="hidden lg:flex items-center space-x-4">
  <Link 
    to="/login" 
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    Login
  </Link>
  <Link 
    to="/signup" 
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
  >
    Signup
  </Link>
</div>

                      

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg glass-effect nav-glow"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-effect border-t border-black/10">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.url
                      ? 'bg-blue-500/10 text-blue-600'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg">Signup</Link>
                        
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children || <Outlet />}
      </main>

    </div>
  );
}