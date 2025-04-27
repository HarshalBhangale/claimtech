'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Search, Plus, CheckCircle, Info } from 'lucide-react';

export default function LenderSelectionForm({ lenders, userId }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLenders, setSelectedLenders] = useState([]);
  const [currentLender, setCurrentLender] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const filteredLenders = lenders.filter(lender => 
    lender.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleLenderSelect = (lender) => {
    setCurrentLender(lender);
    setModalOpen(true);
  };
  
  const handleConfirmLender = () => {
    if (currentLender && !selectedLenders.some(l => l.id === currentLender.id)) {
      setSelectedLenders([...selectedLenders, currentLender]);
    }
    setModalOpen(false);
  };
  
  const handleRemoveLender = (lenderId) => {
    setSelectedLenders(selectedLenders.filter(lender => lender.id !== lenderId));
  };
  
  const handleSubmit = async () => {
    if (selectedLenders.length === 0) {
      alert('Please select at least one lender');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store selected lenders in session storage for next step
      sessionStorage.setItem('selectedLenders', JSON.stringify(selectedLenders));
      
      // Navigate to next step
      router.push('/dashboard/claims/new/user-details');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Select Your Lenders</h2>
        <p className="text-gray-600 mb-4">
          Let's check if your lenders were involved in the commission scandal.
        </p>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Search for lenders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2"
          />
        </div>
        
        <div className="border rounded-md h-60 overflow-y-auto">
          {filteredLenders.map((lender) => (
            <div 
              key={lender.id}
              className={`p-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between items-center ${
                selectedLenders.some(l => l.id === lender.id) ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleLenderSelect(lender)}
            >
              <span>{lender.name}</span>
              {selectedLenders.some(l => l.id === lender.id) ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Plus className="h-5 w-5 text-gray-400" />
              )}
            </div>
          ))}
          
          {filteredLenders.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No lenders found matching your search
            </div>
          )}
        </div>
      </div>
      
      {selectedLenders.length > 0 && (
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Selected Lenders ({selectedLenders.length})</h3>
          
          <div className="space-y-2">
            {selectedLenders.map((lender) => (
              <div 
                key={lender.id}
                className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
              >
                <div>
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
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveLender(lender.id);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="pt-4 border-t flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={selectedLenders.length === 0 || isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
        >
          {isSubmitting ? 'Processing...' : 'Continue to Next Step'}
        </Button>
      </div>
      
      {/* Lender confirmation dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm Lender Selection
            </DialogTitle>
          </DialogHeader>
          
          {currentLender && (
            <div className="py-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md mb-4">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-700">Lender Information</p>
                  <p className="text-sm text-blue-600">
                    {currentLender.name} {currentLender.hasDCA ? 'used Discretionary Commission Arrangements (DCA)' : 'did not use DCA'}
                    {currentLender.hasHiddenComm ? ' and had Hidden Commissions linked to their agreements.' : '.'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {currentLender.hasDCA ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Info className="h-5 w-5 text-amber-500" />
                  )}
                  <span className={currentLender.hasDCA ? 'text-green-700' : 'text-amber-700'}>
                    {currentLender.hasDCA ? 'Eligible for DCA claim' : 'Not eligible for DCA claim'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {currentLender.hasHiddenComm ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Info className="h-5 w-5 text-amber-500" />
                  )}
                  <span className={currentLender.hasHiddenComm ? 'text-green-700' : 'text-amber-700'}>
                    {currentLender.hasHiddenComm ? 'Eligible for Hidden Commission claim' : 'Not eligible for Hidden Commission claim'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmLender}>
              Add Lender
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 