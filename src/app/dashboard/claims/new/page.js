"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, FileText, Car, Building, CreditCard, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Combobox } from "@/components/ui/combobox";
import { AddressSuggestions } from "@/components/address-suggestions";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Mock lenders data
const lenders = [
  { id: 1, name: "Barclays Bank", hasDCA: true },
  { id: 2, name: "HSBC", hasDCA: false },
  { id: 3, name: "Lloyds Bank", hasDCA: true },
  { id: 4, name: "NatWest", hasDCA: false },
  { id: 5, name: "Santander", hasDCA: true },
  { id: 6, name: "Royal Bank of Scotland", hasDCA: false },
  { id: 7, name: "Nationwide", hasDCA: true },
  { id: 8, name: "TSB", hasDCA: false },
];

// Mock data for testing
const mockLender = {
  id: '1',
  name: 'Barclays Bank',
  hasDCA: true
};

const subscriptionPlans = [
  {
    id: 'monthly',
    name: 'Monthly Subscription',
    price: '£24.99',
    interval: 'month',
    features: [
      'Unlimited claims',
      'Priority support',
      'Regular updates',
      'Cancel anytime'
    ]
  },
  {
    id: 'one-time',
    name: 'One-time Payment',
    price: '£99',
    features: [
      'Single claim processing',
      'Email support',
      'One-time payment'
    ]
  }
];

// Step components
const LenderSelection = ({ selectedLenders, onSelect, onRemove }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedLender, setSelectedLender] = useState(null);

  const filteredLenders = lenders.filter(lender =>
    lender.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLenderSelect = (lender) => {
    setSelectedLender(lender);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedLender && !selectedLenders.some(l => l.id === selectedLender.id)) {
      onSelect(selectedLender);
    }
    setShowConfirmation(false);
    setSelectedLender(null);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          placeholder="Search lenders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        {filteredLenders.map((lender) => (
          <div
            key={lender.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
            onClick={() => handleLenderSelect(lender)}
          >
            <div>
              <h3 className="font-medium">{lender.name}</h3>
              <p className="text-sm text-muted-foreground">
                {lender.hasDCA ? "Has DCA involvement" : "No DCA involvement"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedLenders.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Selected Lenders</h3>
          {selectedLenders.map((lender) => (
            <div
              key={lender.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-accent"
            >
              <div>
                <h3 className="font-medium">{lender.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {lender.hasDCA ? "Has DCA involvement" : "No DCA involvement"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(lender.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Lender Selection</DialogTitle>
            <DialogDescription>
              {selectedLender?.hasDCA
                ? `${selectedLender.name} has Debt Collection Agency (DCA) involvement. This may affect your claim process.`
                : `${selectedLender?.name} has no DCA involvement.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UserDetails = ({ formData, onUpdate }) => {
  const handleAddressSelect = (address) => {
    onUpdate("address", {
      line1: address.line_1,
      line2: address.line_2,
      town: address.town,
      county: address.county,
      postcode: address.postcode,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => onUpdate("fullName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => onUpdate("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => onUpdate("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <div className="relative">
            <Input
              placeholder="Enter your postcode"
              value={formData.address?.postcode || ''}
              onChange={(e) => onUpdate("address", { ...formData.address, postcode: e.target.value })}
              className="pl-10"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <AddressSuggestions onSelect={handleAddressSelect} />
        </div>
      </div>
    </div>
  );
};

const PaymentStep = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      if (!sessionId) {
        throw new Error('No session ID received');
      }

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Subscription</CardTitle>
            <CardDescription>Perfect for multiple claims</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">£24.99<span className="text-sm text-muted-foreground">/month</span></div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Unlimited claims</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Regular updates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </li>
            </ul>
            <Button
              className="w-full mt-6"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>One-time Payment</CardTitle>
            <CardDescription>Ideal for single claims</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">£99</div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Single claim processing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Email support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>One-time payment</span>
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Once'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Development Skip Button */}
      {process.env.NODE_ENV === 'development' && (
        <Button
          variant="outline"
          className="w-full"
          onClick={onComplete}
        >
          Skip Payment (Dev Only)
        </Button>
      )}
    </div>
  );
};

// Main component
export default function NewClaimPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedLenders: [],
    fullName: '',
    email: '',
    phone: '',
    address: null,
  });

  const handleLenderSelect = (lender) => {
    setFormData(prev => ({
      ...prev,
      selectedLenders: [...prev.selectedLenders, lender]
    }));
  };

  const handleLenderRemove = (lenderId) => {
    setFormData(prev => ({
      ...prev,
      selectedLenders: prev.selectedLenders.filter(l => l.id !== lenderId)
    }));
  };

  const handleFormUpdate = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1 && formData.selectedLenders.length === 0) {
      return;
    }
    if (currentStep === 2 && (!formData.fullName || !formData.email || !formData.phone || !formData.address)) {
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Claim</h1>
        <p className="text-muted-foreground mt-2">
          Follow these steps to create your claim
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}>
            1
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">Select Lenders</p>
          </div>
        </div>
        <div className="flex-1 h-0.5 bg-muted mx-4" />
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}>
            2
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">Your Details</p>
          </div>
        </div>
        <div className="flex-1 h-0.5 bg-muted mx-4" />
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}>
            3
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">Payment</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Select Your Lenders'}
            {currentStep === 2 && 'Your Details'}
            {currentStep === 3 && 'Choose a Payment Plan'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Choose the lenders you want to make claims against'}
            {currentStep === 2 && 'Please provide your details to proceed'}
            {currentStep === 3 && 'Select a payment plan to complete your claim'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <LenderSelection
              selectedLenders={formData.selectedLenders}
              onSelect={handleLenderSelect}
              onRemove={handleLenderRemove}
            />
          )}
          {currentStep === 2 && (
            <UserDetails
              formData={formData}
              onUpdate={handleFormUpdate}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep onComplete={() => router.push('/dashboard/claims')} />
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {currentStep < 3 && (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 