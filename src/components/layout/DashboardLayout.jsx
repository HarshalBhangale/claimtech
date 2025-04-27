"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Wait for clerk to load and client-side rendering
  if (!isClient || !isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  // If not signed in, children will handle redirection
  if (!isSignedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Full-width navbar at the top */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar wrapper - handles both desktop sidebar and mobile controller */}
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        
        {/* Main content area */}
        <main className={`flex-1 transition-all duration-300 ${expanded ? 'lg:ml-64' : 'lg:ml-20'} pt-16`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 