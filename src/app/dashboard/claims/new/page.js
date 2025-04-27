import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import LenderSelectionForm from '@/components/claims/LenderSelectionForm';

// Mock lenders data
const mockLenders = [
  { id: '1', name: 'Barclays Bank', hasDCA: true, hasHiddenComm: true },
  { id: '2', name: 'HSBC', hasDCA: true, hasHiddenComm: false },
  { id: '3', name: 'Lloyds Bank', hasDCA: false, hasHiddenComm: true },
  { id: '4', name: 'NatWest', hasDCA: true, hasHiddenComm: true },
  { id: '5', name: 'Santander', hasDCA: false, hasHiddenComm: false },
  { id: '6', name: 'Halifax', hasDCA: true, hasHiddenComm: false },
  { id: '7', name: 'Nationwide', hasDCA: false, hasHiddenComm: true },
  { id: '8', name: 'TSB Bank', hasDCA: true, hasHiddenComm: false },
  { id: '9', name: 'Metro Bank', hasDCA: false, hasHiddenComm: true },
  { id: '10', name: 'First Direct', hasDCA: true, hasHiddenComm: true },
];

export default function NewClaimPage() {
  // Mock user data
  const mockUser = {
    id: 'user_123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Start a New Claim</h1>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-blue-800">
          We provide information to help you identify potential claims based on your lenders. 
          We do not assess the validity of your claims or provide financial or legal advice.
        </p>
      </div>
      
      <LenderSelectionForm lenders={mockLenders} userId={mockUser.id} />
    </div>
  );
}
