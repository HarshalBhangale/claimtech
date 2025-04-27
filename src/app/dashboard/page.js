"use client"
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { 
  FileText, 
  PlusCircle, 
  MessagesSquare, 
  ArrowUpRight, 
  Clock, 
  ChevronRight 
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();

  // Mock data for dashboard UI
  const recentClaims = [
    {
      id: "CL-2024-012",
      lender: "ABC Finance",
      status: "In Progress",
      updated: "2 days ago",
      amount: "£4,567",
    },
    {
      id: "CL-2024-008",
      lender: "XYZ Motors",
      status: "Under Review",
      updated: "5 days ago",
      amount: "£2,890",
    },
  ];

  const claimStats = {
    active: 2,
    completed: 1,
    totalRefund: "£7,450",
    savedFees: "£3,500"
  };

  const upcomingTasks = [
    {
      id: 1,
      title: "Upload proof of ID",
      dueDate: "Today",
      priority: "high",
      claimId: "CL-2024-012"
    },
    {
      id: 2,
      title: "Respond to lender query",
      dueDate: "Tomorrow",
      priority: "medium",
      claimId: "CL-2024-008"
    },
    {
      id: 3, 
      title: "Review agreement details",
      dueDate: "In 3 days",
      priority: "low",
      claimId: "CL-2024-012"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your car finance claims and what needs your attention today.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Active Claims</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{claimStats.active}</p>
            <p className="ml-2 text-xs text-green-600 flex items-center">
              <ArrowUpRight size={12} className="mr-0.5" />
              New
            </p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Completed Claims</h3>
          <p className="mt-2 text-2xl font-semibold">{claimStats.completed}</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Refunds</h3>
          <p className="mt-2 text-2xl font-semibold text-green-600">{claimStats.totalRefund}</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Legal Fees Saved</h3>
          <p className="mt-2 text-2xl font-semibold text-blue-600">{claimStats.savedFees}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent claims */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-100 p-5 flex justify-between items-center">
            <h2 className="font-semibold">Recent Claims</h2>
            <Link 
              href="/dashboard/claims" 
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lender
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm text-blue-600 font-medium">{claim.id}</td>
                    <td className="px-5 py-4 text-sm text-gray-900">{claim.lender}</td>
                    <td className="px-5 py-4 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{claim.updated}</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{claim.amount}</td>
                    <td className="px-5 py-4 text-sm text-right">
                      <Link 
                        href={`/dashboard/claims/${claim.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {recentClaims.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">You haven't created any claims yet.</p>
              <Link href="/dashboard/claims/new">
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Start Your First Claim
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Tasks & Actions section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-100 p-5">
            <h2 className="font-semibold">Upcoming Tasks</h2>
          </div>
          
          <div className="p-5 space-y-3">
            {upcomingTasks.map((task) => (
              <div 
                key={task.id} 
                className={`flex p-3 rounded-lg border ${
                  task.priority === 'high' 
                    ? 'border-red-100 bg-red-50' 
                    : task.priority === 'medium'
                    ? 'border-yellow-100 bg-yellow-50'
                    : 'border-blue-100 bg-blue-50'
                }`}
              >
                <div className="mr-3 mt-0.5">
                  <Clock size={18} className={`
                    ${task.priority === 'high' 
                      ? 'text-red-500' 
                      : task.priority === 'medium'
                      ? 'text-yellow-600'
                      : 'text-blue-500'
                    }
                  `} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      For claim <span className="font-medium">{task.claimId}</span>
                    </p>
                    <p className={`text-xs ${
                      task.dueDate === 'Today' 
                        ? 'text-red-600 font-medium' 
                        : task.dueDate === 'Tomorrow'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`}>
                      Due {task.dueDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-5 border-t border-gray-100">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link href="/dashboard/claims/new">
                <button className="w-full flex items-center justify-between p-3 text-sm text-left bg-green-50 hover:bg-green-100 border border-green-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <PlusCircle size={18} className="text-green-600 mr-2" />
                    <span>Start New Claim</span>
                  </div>
                  <ChevronRight size={16} className="text-green-600" />
                </button>
              </Link>
              
              <Link href="/dashboard/claims">
                <button className="w-full flex items-center justify-between p-3 text-sm text-left bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <FileText size={18} className="text-blue-600 mr-2" />
                    <span>View All Claims</span>
                  </div>
                  <ChevronRight size={16} className="text-blue-600" />
                </button>
              </Link>
              
              <Link href="/dashboard/messages">
                <button className="w-full flex items-center justify-between p-3 text-sm text-left bg-purple-50 hover:bg-purple-100 border border-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <MessagesSquare size={18} className="text-purple-600 mr-2" />
                    <span>View Messages</span>
                  </div>
                  <ChevronRight size={16} className="text-purple-600" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
