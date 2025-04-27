import UserDetailsForm from '@/components/claims/UserDetailsForm';

// Mock user data
const mockUser = {
  id: 'user_123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  dateOfBirth: null
};

// Mock address data (empty for new users)
const mockAddresses = [];

// Mock previous names (empty for new users)
const mockPreviousNames = [];

export default function UserDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Provide Your Details</h1>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-blue-800">
          The information collected is used to help you manage your claims independently. 
          My Claim Buddy does not act as a claims management company or provide legal representation.
        </p>
      </div>
      
      <UserDetailsForm 
        user={mockUser} 
        existingAddresses={mockAddresses} 
        existingPreviousNames={mockPreviousNames} 
      />
    </div>
  );
} 