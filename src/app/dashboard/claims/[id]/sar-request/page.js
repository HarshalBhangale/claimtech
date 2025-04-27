'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileText, Download, CheckCircle } from 'lucide-react';

// Mock lender data for demo
const mockLenders = {
  'claim_1': { id: '1', name: 'Barclays Bank', hasDCA: true, hasHiddenComm: true },
  'claim_2': { id: '2', name: 'HSBC', hasDCA: true, hasHiddenComm: false },
  'claim_3': { id: '3', name: 'Lloyds Bank', hasDCA: false, hasHiddenComm: true },
  'claim_4': { id: '4', name: 'NatWest', hasDCA: true, hasHiddenComm: true },
  'claim_5': { id: '5', name: 'Santander', hasDCA: false, hasHiddenComm: false },
};

export default function SarRequestPage({ params }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  
  // Get claim data based on ID in URL
  const claimId = params.id;
  const lender = mockLenders[claimId] || { 
    id: '0',
    name: 'Unknown Lender', 
    hasDCA: false, 
    hasHiddenComm: false 
  };
  
  // For demo purposes - mock claim data
  const mockClaimData = {
    id: claimId,
    lender: lender,
    status: 'CREATED',
    createdAt: new Date().toISOString()
  };
  
  const handleGenerateSarLetter = async () => {
    if (!consentChecked) {
      alert('Please confirm your consent to proceed');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark as complete
      setIsComplete(true);
    } catch (error) {
      console.error('Error generating SAR letter:', error);
      alert('There was an error generating your SAR letter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDownloadLetter = () => {
    // In a real app, this would download the generated PDF
    alert('In a real app, this would download your SAR letter PDF');
  };
  
  const handleContinue = () => {
    router.push('/dashboard/claims');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => router.push('/dashboard/claims')}
        className="flex items-center text-blue-600 mb-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Claims
      </button>
      
      <h1 className="text-2xl font-bold mb-6">Subject Access Request</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <FileText className="h-8 w-8 text-blue-500 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Generate SAR Letter for {mockClaimData.lender.name}</h2>
            <p className="text-gray-600">
              A Subject Access Request (SAR) is your right to request all personal information 
              a lender holds about you. This is crucial for assessing your claim potential.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {mockClaimData.lender.hasDCA && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  DCA Involved
                </span>
              )}
              {mockClaimData.lender.hasHiddenComm && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                  Hidden Commission
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-md mb-6">
          <p className="text-amber-800 text-sm">
            <strong>Important:</strong> You must send this letter directly to the lender. 
            My Claim Buddy does not send the SAR on your behalf or act as your representative.
          </p>
        </div>
        
        {!isComplete ? (
          <>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="consent" 
                  checked={consentChecked}
                  onCheckedChange={setConsentChecked}
                />
                <Label htmlFor="consent" className="text-sm">
                  I confirm I want to generate a Subject Access Request letter to send to {mockClaimData.lender.name}. 
                  I understand I am responsible for sending this letter myself.
                </Label>
              </div>
            </div>
            
            <Button
              onClick={handleGenerateSarLetter}
              disabled={isSubmitting || !consentChecked}
              className="w-full"
            >
              {isSubmitting ? 'Generating...' : 'Generate SAR Letter'}
            </Button>
          </>
        ) : (
          <>
            <div className="p-4 bg-green-50 rounded-md mb-6 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-green-800">
                Your SAR letter has been generated successfully!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadLetter}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download SAR Letter
              </Button>
              
              <Button
                onClick={handleContinue}
                variant="outline"
                className="flex-1"
              >
                Continue to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-4">What happens next?</h3>
        
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Download and print the SAR letter</li>
          <li>Sign and date the letter</li>
          <li>Send it to the lender via post or email (contact details are included in the letter)</li>
          <li>The lender has one month to respond to your request</li>
          <li>Once you receive the response, return to My Claim Buddy to continue your claim</li>
        </ol>
      </div>
    </div>
  );
} 