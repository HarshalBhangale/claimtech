import ReviewClaimForm from '@/components/claims/ReviewClaimForm';

// Mock user data with complete details
const mockUserWithDetails = {
  id: 'user_123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  dateOfBirth: new Date('1985-05-15').toISOString(),
  addresses: [
    {
      id: 'addr_1',
      line1: '123 Main Street',
      line2: 'Apt 4B',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom',
      current: true
    }
  ],
  previousNames: []
};

export default function ReviewClaimPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Review Your Claim</h1>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-blue-800">
          Please review your information carefully before proceeding. 
          This information will be used to help lenders locate your agreements.
        </p>
      </div>
      
      <ReviewClaimForm user={mockUserWithDetails} />
    </div>
  );
} 