'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Plus, Trash } from 'lucide-react';

export default function UserDetailsForm({ user, existingAddresses, existingPreviousNames }) {
  const router = useRouter();
  const [addresses, setAddresses] = useState(existingAddresses.length > 0 
    ? existingAddresses 
    : [{ line1: '', line2: '', city: '', postcode: '', country: 'United Kingdom', current: true }]
  );
  const [previousNames, setPreviousNames] = useState(existingPreviousNames.length > 0
    ? existingPreviousNames
    : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ? new Date(user.dateOfBirth) : null);
  const [hasPreviousNames, setHasPreviousNames] = useState(previousNames.length > 0);
  
  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    
    // If this address is set as current, set all others to not current
    if (field === 'current' && value === true) {
      newAddresses.forEach((address, i) => {
        if (i !== index) {
          newAddresses[i] = { ...newAddresses[i], current: false };
        }
      });
    }
    
    setAddresses(newAddresses);
  };
  
  const handleAddAddress = () => {
    setAddresses([...addresses, { line1: '', line2: '', city: '', postcode: '', country: 'United Kingdom', current: false }]);
  };
  
  const handleRemoveAddress = (index) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };
  
  const handlePreviousNameChange = (index, field, value) => {
    const newPreviousNames = [...previousNames];
    newPreviousNames[index] = { ...newPreviousNames[index], [field]: value };
    setPreviousNames(newPreviousNames);
  };
  
  const handleAddPreviousName = () => {
    setPreviousNames([...previousNames, { firstName: '', lastName: '' }]);
  };
  
  const handleRemovePreviousName = (index) => {
    const newPreviousNames = [...previousNames];
    newPreviousNames.splice(index, 1);
    setPreviousNames(newPreviousNames);
  };
  
  const handleSubmit = async () => {
    // Validate required fields
    if (!dateOfBirth) {
      alert('Please provide your date of birth');
      return;
    }
    
    const hasEmptyAddress = addresses.some(addr => 
      !addr.line1 || !addr.city || !addr.postcode
    );
    
    if (hasEmptyAddress) {
      alert('Please complete all required address fields');
      return;
    }
    
    const hasEmptyPreviousName = previousNames.some(name => 
      !name.firstName || !name.lastName
    );
    
    if (hasPreviousNames && hasEmptyPreviousName) {
      alert('Please complete all previous name fields or remove them');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the date for session storage
      const formattedUserDetails = {
        dateOfBirth: dateOfBirth.toISOString(),
        addresses,
        previousNames: hasPreviousNames ? previousNames : []
      };
      
      // Store user details in session storage for next step
      sessionStorage.setItem('userDetails', JSON.stringify(formattedUserDetails));
      
      // For demo purposes - simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step
      router.push('/dashboard/claims/new/review');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error saving your details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p className="text-gray-600 mb-4">
          We need this information to help lenders locate your agreements accurately.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={user.firstName || ''}
              disabled
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={user.lastName || ''}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="dob">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dob"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateOfBirth}
                onSelect={setDateOfBirth}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Addresses</h2>
        <p className="text-gray-600 mb-4">
          Please provide all addresses you've lived at during the period of your finance agreements.
        </p>
        
        {addresses.map((address, index) => (
          <div key={index} className="mb-6 p-4 border rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Address {index + 1}</h3>
              {addresses.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAddress(index)}
                  className="text-red-600 hover:text-red-800"
                  disabled={isSubmitting}
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor={`address-line1-${index}`}>Address Line 1</Label>
                <Input
                  id={`address-line1-${index}`}
                  value={address.line1}
                  onChange={(e) => handleAddressChange(index, 'line1', e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`address-line2-${index}`}>Address Line 2 (Optional)</Label>
                <Input
                  id={`address-line2-${index}`}
                  value={address.line2 || ''}
                  onChange={(e) => handleAddressChange(index, 'line2', e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`address-city-${index}`}>City</Label>
                  <Input
                    id={`address-city-${index}`}
                    value={address.city}
                    onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`address-postcode-${index}`}>Postcode</Label>
                  <Input
                    id={`address-postcode-${index}`}
                    value={address.postcode}
                    onChange={(e) => handleAddressChange(index, 'postcode', e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Checkbox
                  id={`address-current-${index}`}
                  checked={address.current}
                  onCheckedChange={(checked) => handleAddressChange(index, 'current', checked)}
                  disabled={isSubmitting || address.current}
                />
                <Label htmlFor={`address-current-${index}`} className="ml-2">
                  This is my current address
                </Label>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          onClick={handleAddAddress}
          variant="outline"
          className="mt-2"
          disabled={isSubmitting}
        >
          <Plus size={16} className="mr-2" />
          Add Another Address
        </Button>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Previous Names</h2>
        
        <div className="flex items-center mb-4">
          <Checkbox
            id="has-previous-names"
            checked={hasPreviousNames}
            onCheckedChange={setHasPreviousNames}
            disabled={isSubmitting}
          />
          <Label htmlFor="has-previous-names" className="ml-2">
            I have used previous names
          </Label>
        </div>
        
        {hasPreviousNames && (
          <div className="space-y-4">
            {previousNames.map((name, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Previous Name {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemovePreviousName(index)}
                    className="text-red-600 hover:text-red-800"
                    disabled={isSubmitting}
                  >
                    <Trash size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`prev-firstname-${index}`}>First Name</Label>
                    <Input
                      id={`prev-firstname-${index}`}
                      value={name.firstName}
                      onChange={(e) => handlePreviousNameChange(index, 'firstName', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`prev-lastname-${index}`}>Last Name</Label>
                    <Input
                      id={`prev-lastname-${index}`}
                      value={name.lastName}
                      onChange={(e) => handlePreviousNameChange(index, 'lastName', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              onClick={handleAddPreviousName}
              variant="outline"
              className="mt-2"
              disabled={isSubmitting}
            >
              <Plus size={16} className="mr-2" />
              Add Another Previous Name
            </Button>
          </div>
        )}
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
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
        >
          {isSubmitting ? 'Saving...' : 'Continue to Review'}
        </Button>
      </div>
    </div>
  );
} 