'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Mock claims data
const mockClaims = [
  {
    id: 'claim_1',
    lender: { name: 'Barclays Bank', id: '1' },
    status: 'AWAITING_SAR',
    claimType: ['DCA', 'HIDDEN_COMMISSION'],
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'claim_2',
    lender: { name: 'HSBC', id: '2' },
    status: 'SAR_SUBMITTED',
    claimType: ['DCA'],
    createdAt: '2023-10-10T14:20:00Z',
    updatedAt: '2023-10-12T09:15:00Z'
  },
  {
    id: 'claim_3',
    lender: { name: 'Lloyds Bank', id: '3' },
    status: 'COMPLAINT_SUBMITTED',
    claimType: ['HIDDEN_COMMISSION'],
    createdAt: '2023-09-28T11:45:00Z',
    updatedAt: '2023-10-05T16:30:00Z'
  }
];

// Helper function to render status badge
function StatusBadge({ status }) {
  switch (status) {
    case 'AWAITING_SAR':
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
          <Clock className="h-3 w-3 mr-1" />
          Awaiting SAR
        </div>
      );
    case 'SAR_SUBMITTED':
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
          <FileText className="h-3 w-3 mr-1" />
          SAR Submitted
        </div>
      );
    case 'COMPLAINT_SUBMITTED':
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Complaint Submitted
        </div>
      );
    case 'COMPLETED':
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </div>
      );
    default:
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          {status}
        </div>
      );
  }
}

export default function ClaimsDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Claims</h1>
        <Link href="/dashboard/claims/new">
          <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
            <PlusCircle className="h-4 w-4 mr-2" />
            Start New Claim
          </Button>
        </Link>
      </div>
      
      {mockClaims.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Claim Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {mockClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {claim.lender.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {claim.claimType.includes('DCA') && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            DCA
                          </span>
                        )}
                        {claim.claimType.includes('HIDDEN_COMMISSION') && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            Hidden Commission
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <StatusBadge status={claim.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        href={`/dashboard/claims/${claim.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </Link>
                      {claim.status === 'AWAITING_SAR' && (
                        <Link 
                          href={`/dashboard/claims/${claim.id}/sar-request`}
                          className="ml-4 text-green-600 hover:text-green-900"
                        >
                          Generate SAR
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Claims Yet</h3>
          <p className="text-gray-500 mb-6">
            Start by creating a new claim to check if you're eligible for compensation.
          </p>
          <Link href="/dashboard/claims/new">
            <Button>Start Your First Claim</Button>
          </Link>
        </div>
      )}
    </div>
  );
} 