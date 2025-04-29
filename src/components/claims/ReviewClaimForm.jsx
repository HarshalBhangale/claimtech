'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function ReviewClaimForm({ user }) {
  const router = useRouter();
  const [selectedLenders, setSelectedLenders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Retrieve data from session storage
    const storedLenders = sessionStorage.getItem('selectedLenders');
    const storedUserDetails = sessionStorage.getItem('userDetails');
    
    if (storedLenders) {
      setSelectedLenders(JSON.parse(storedLenders));
    }
    
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);
  
  const formatDate = (date) => {
    if (!date) return 'Not provided';
    return format(new Date(date), 'dd MMM yyyy');
  };
  
  const handleSubmit = async () => {
    if (selectedLenders.length === 0) {
      alert('No lenders selected. Please go back and select lenders.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For demo purposes - simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response data
      const mockClaims = selectedLenders.map(lender => ({
        id: `claim_${lender.id}`,
        lenderId: lender.id,
        userId: user.id,
        status: 'CREATED',
        claimType: [
          ...(lender.hasDCA ? ['DCA'] : []),
          ...(lender.hasHiddenComm ? ['HIDDEN_COMMISSION'] : []),
        ],
        submittedAt: new Date().toISOString()
      }));
      
      // Clear session storage
      sessionStorage.removeItem('selectedLenders');
      sessionStorage.removeItem('userDetails');
      
      // Redirect to SAR request page for the first claim
      if (mockClaims.length > 0) {
        // For demo purposes - show success message
        alert(`Success! Created ${mockClaims.length} claims.`);
        
        // Redirect to the SAR request page for the first claim
        router.push(`/dashboard/claims/${mockClaims[0].id}/sar-request`);
      } else {
        router.push('/dashboard/claims');
      }
    } catch (error) {
      console.error('Error submitting claims:', error);
      alert('There was an error creating your claims. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Use data from session storage or fall back to the user prop
  const displayUser = {
    ...user,
    dateOfBirth: userDetails?.dateOfBirth || user.dateOfBirth,
    addresses: userDetails?.addresses || user.addresses || [],
    previousNames: userDetails?.previousNames || user.previousNames || []
  };
  
  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Personal Information Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{displayUser.firstName} {displayUser.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{formatDate(displayUser.dateOfBirth)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">{displayUser.email}</p>
          </div>
        </div>
      </div>
      
      {/* Addresses Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Addresses</h2>
        
        {displayUser.addresses.map((address, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between">
              <h3 className="font-medium">Address {index + 1}</h3>
              {address.current && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  Current Address
                </span>
              )}
            </div>
            <p className="mt-2">
              {address.line1}
              {address.line2 && <>, {address.line2}</>}
              <br />
              {address.city}, {address.postcode}
              <br />
              {address.country}
            </p>
          </div>
        ))}
        
        {displayUser.addresses.length === 0 && (
          <p className="text-amber-600">No addresses provided. Consider adding addresses to help lenders locate your agreements.</p>
        )}
      </div>
      
      {/* Previous Names Section */}
      {displayUser.previousNames && displayUser.previousNames.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Previous Names</h2>
          
          {displayUser.previousNames.map((name, index) => (
            <div key={index} className="mb-2 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium">Previous Name {index + 1}</h3>
              <p className="mt-1">{name.firstName} {name.lastName}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Selected Lenders Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Selected Lenders</h2>
        
        {selectedLenders.length > 0 ? (
          <div className="space-y-2">
            {selectedLenders.map((lender, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 rounded-md"
              >
                <p className="font-medium">{lender.name}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {lender.hasDCA && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      DCA Involved
                    </span>
                  )}
                  {lender.hasHiddenComm && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      Hidden Commission
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600">No lenders selected. Please go back and select at least one lender.</p>
        )}
      </div>
      
      {/* Disclaimer */}
      <div className="p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          By submitting this claim, you confirm that all information provided is accurate to the best of your knowledge. 
          My Claim Buddy is an educational service that helps you manage your claims independently. We do not provide 
          financial or legal advice, and results may vary based on your individual circumstances.
        </p>
      </div>
      
      <div className="pt-4 border-t flex justify-between">
        <Button
          onClick={() => router.back()}
          variant="outline"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || selectedLenders.length === 0}
          className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
        >
          {isSubmitting ? 'Processing...' : 'Submit and Continue'}
        </Button>
      </div>
    </div>
  );
} 