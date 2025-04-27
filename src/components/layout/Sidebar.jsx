"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  MessagesSquare, 
  WalletCards, 
  HelpCircle, 
  Settings, 
  Menu, 
  ChevronRight,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

export default function Sidebar({ expanded, setExpanded }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "My Claims",
      href: "/dashboard/claims",
      icon: <FileText size={20} />,
    },
    {
      title: "Start New Claim",
      href: "/dashboard/claims/new",
      icon: <PlusCircle size={20} />,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessagesSquare size={20} />,
      badge: 2,
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: <WalletCards size={20} />,
    },
    {
      title: "Help & Support",
      href: "/dashboard/help",
      icon: <HelpCircle size={20} />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
  ];

  const renderNavItems = (closeMobileOnClick = false) => {
    return navItems.map((item) => {
      const isActive = pathname === item.href;
      
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={closeMobileOnClick ? toggleMobileSidebar : undefined}
            className={`
              flex items-center px-3 py-2.5 rounded-md
              ${isActive 
                ? 'bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
              }
              transition-colors duration-200
            `}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            
            {(expanded || closeMobileOnClick) && (
              <span className="ml-3 flex-1">{item.title}</span>
            )}
            
            {item.badge && (expanded || closeMobileOnClick) && (
              <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      {/* Mobile Sidebar Trigger - Only shown on mobile */}
      <button 
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed z-50 bottom-6 right-6 bg-gradient-to-r from-blue-600 to-emerald-500 p-3 rounded-full shadow-lg text-white"
        aria-label="Toggle mobile menu"
      >
        <Menu size={22} />
      </button>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden lg:flex fixed top-16 bottom-0 z-30 bg-white border-r border-gray-200 flex-col w-full transition-all duration-300"
           style={{ width: expanded ? '16rem' : '5rem' }}>
        {/* Sidebar Header with minimize button */}
        <div className="h-14 flex items-center justify-end px-4">
          {/* Desktop Toggle Button */}
          <button 
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? (
              <>
                <PanelLeftClose size={18} />
                <span className="text-sm font-medium">Collapse</span>
              </>
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {renderNavItems()}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-gray-200 ${expanded ? '' : 'hidden'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Need help with claims?</p>
            <Link
              href="/dashboard/help"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center mt-1"
            >
              Contact support
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sidebar - Only rendered when opened */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <Link href="/dashboard">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                ClaimBuddy
              </span>
            </Link>
            <button 
              onClick={toggleMobileSidebar}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="py-4">
            <ul className="space-y-1 px-3">
              {renderNavItems(true)}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
} 