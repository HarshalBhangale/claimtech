"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { 
  Bell, 
  HelpCircle,
  Mail,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const { user } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showHelp) setShowHelp(false);
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
    if (showNotifications) setShowNotifications(false);
  };

  // Mock notifications for UI
  const notifications = [
    {
      id: 1,
      title: "Claim Update",
      message: "Your claim #CL-2024-012 has been reviewed by the lender.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Document Required",
      message: "Please upload your agreement document for claim #CL-2024-015.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Payment Confirmation",
      message: "Your subscription payment has been processed successfully.",
      time: "3 days ago",
      read: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-full mx-auto">
        {/* Left section with brand */}
        <div className="flex items-center">
          <Link href="/dashboard">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              ClaimBuddy
            </span>
          </Link>
        </div>

        {/* Right section with user controls */}
        <div className="flex items-center space-x-4">
          {/* Help button */}
          <div className="relative">
            <button
              onClick={toggleHelp}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>

            {showHelp && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">Help & Resources</h3>
                </div>
                <Link href="/dashboard/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Help Center
                </Link>
                <Link href="/dashboard/help/guides" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Claim Guides
                </Link>
                <Link href="/dashboard/help/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Contact Support
                </Link>
                <div className="px-4 py-2 border-t border-gray-100">
                  <Link 
                    href="/dashboard/help/faq" 
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    View FAQ
                    <ChevronDown size={12} className="ml-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {/* Notification indicator */}
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <Link href="/dashboard/notifications" className="text-xs text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 last:border-0 ${notification.read ? '' : 'bg-blue-50'}`}>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages shortcut */}
          <Link 
            href="/dashboard/messages" 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Messages"
          >
            <Mail size={20} />
          </Link>

          {/* User profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">
                {user?.firstName || 'Welcome'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.primaryEmailAddress?.emailAddress || ''}
              </p>
            </div>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 rounded-full border-2 border-emerald-200"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
} 