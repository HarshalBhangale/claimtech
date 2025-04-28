"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, FileText, Car, Building, CreditCard } from "lucide-react";

// Step content components
const StepOne = ({ formData, updateFormData, goToNextStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Claim Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="claimType" className="block text-sm font-medium text-gray-700 mb-1">
            Claim Type
          </label>
          <select
            id="claimType"
            value={formData.claimType}
            onChange={(e) => updateFormData("claimType", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select claim type</option>
            <option value="PCP">Personal Contract Purchase (PCP)</option>
            <option value="HP">Hire Purchase (HP)</option>
            <option value="PCH">Personal Contract Hire (PCH)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="lender" className="block text-sm font-medium text-gray-700 mb-1">
            Lender / Finance Company
          </label>
          <select
            id="lender"
            value={formData.lender}
            onChange={(e) => updateFormData("lender", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select lender</option>
            <option value="volkswagen">Volkswagen Financial Services</option>
            <option value="black_horse">Black Horse</option>
            <option value="santander">Santander Consumer Finance</option>
            <option value="close_brothers">Close Brothers</option>
            <option value="barclays">Barclays Partner Finance</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="agreementNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Agreement Number
          </label>
          <input
            type="text"
            id="agreementNumber"
            value={formData.agreementNumber}
            onChange={(e) => updateFormData("agreementNumber", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. FIN12345678"
            required
          />
        </div>

        <div>
          <label htmlFor="agreementDate" className="block text-sm font-medium text-gray-700 mb-1">
            Agreement Date
          </label>
          <input
            type="date"
            id="agreementDate"
            value={formData.agreementDate}
            onChange={(e) => updateFormData("agreementDate", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <button
        onClick={goToNextStep}
        className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

const StepTwo = ({ formData, updateFormData, goToPreviousStep, goToNextStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Vehicle Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Make
          </label>
          <input
            type="text"
            id="vehicleMake"
            value={formData.vehicleMake}
            onChange={(e) => updateFormData("vehicleMake", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Ford"
            required
          />
        </div>
        
        <div>
          <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Model
          </label>
          <input
            type="text"
            id="vehicleModel"
            value={formData.vehicleModel}
            onChange={(e) => updateFormData("vehicleModel", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Focus"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicleReg" className="block text-sm font-medium text-gray-700 mb-1">
            Registration Number
          </label>
          <input
            type="text"
            id="vehicleReg"
            value={formData.vehicleReg}
            onChange={(e) => updateFormData("vehicleReg", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. AB12 CDE"
            required
          />
        </div>

        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Price (£)
          </label>
          <input
            type="number"
            id="purchasePrice"
            value={formData.purchasePrice}
            onChange={(e) => updateFormData("purchasePrice", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. 15000"
            required
          />
        </div>
      </div>

      <div className="flex mt-6 space-x-3">
        <button
          onClick={goToPreviousStep}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <button
          onClick={goToNextStep}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const StepThree = ({ formData, updateFormData, goToPreviousStep, goToNextStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Your Complaint</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="complaintReason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Complaint
          </label>
          <select
            id="complaintReason"
            value={formData.complaintReason}
            onChange={(e) => updateFormData("complaintReason", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select reason</option>
            <option value="commission">Undisclosed Commission</option>
            <option value="misrepresentation">Misrepresentation of Terms</option>
            <option value="affordability">Affordability Issues</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="complaintDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            id="complaintDetails"
            value={formData.complaintDetails}
            onChange={(e) => updateFormData("complaintDetails", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Please provide any additional details about your complaint..."
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="hasComplainedBefore"
              type="checkbox"
              checked={formData.hasComplainedBefore}
              onChange={(e) => updateFormData("hasComplainedBefore", e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <label htmlFor="hasComplainedBefore" className="ml-3 block text-sm text-gray-700">
            I have already complained to the lender about this issue
          </label>
        </div>

        {formData.hasComplainedBefore && (
          <div>
            <label htmlFor="complaintDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Previous Complaint
            </label>
            <input
              type="date"
              id="complaintDate"
              value={formData.complaintDate}
              onChange={(e) => updateFormData("complaintDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>

      <div className="flex mt-6 space-x-3">
        <button
          onClick={goToPreviousStep}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <button
          onClick={goToNextStep}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Review
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const StepFour = ({ formData, goToPreviousStep, submitClaim }) => {
  const getLenderName = (code) => {
    const lenders = {
      volkswagen: "Volkswagen Financial Services",
      black_horse: "Black Horse",
      santander: "Santander Consumer Finance",
      close_brothers: "Close Brothers",
      barclays: "Barclays Partner Finance",
      other: "Other"
    };
    return lenders[code] || code;
  };

  const getReasonText = (code) => {
    const reasons = {
      commission: "Undisclosed Commission",
      misrepresentation: "Misrepresentation of Terms",
      affordability: "Affordability Issues",
      other: "Other"
    };
    return reasons[code] || code;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Review Your Claim</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <FileText className="mr-2 h-5 w-5 text-blue-600" />
          Claim Details
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Claim Type</dt>
            <dd className="font-medium">{formData.claimType}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Lender</dt>
            <dd className="font-medium">{getLenderName(formData.lender)}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Agreement Number</dt>
            <dd className="font-medium">{formData.agreementNumber}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Agreement Date</dt>
            <dd className="font-medium">{formData.agreementDate}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Car className="mr-2 h-5 w-5 text-blue-600" />
          Vehicle Information
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Make</dt>
            <dd className="font-medium">{formData.vehicleMake}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Model</dt>
            <dd className="font-medium">{formData.vehicleModel}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Registration</dt>
            <dd className="font-medium">{formData.vehicleReg}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-gray-500">Purchase Price</dt>
            <dd className="font-medium">£{formData.purchasePrice}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Building className="mr-2 h-5 w-5 text-blue-600" />
          Complaint Information
        </h3>
        <dl className="grid grid-cols-1 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500">Reason</dt>
            <dd className="font-medium">{getReasonText(formData.complaintReason)}</dd>
          </div>
          {formData.complaintDetails && (
            <div>
              <dt className="text-gray-500">Details</dt>
              <dd className="font-medium">{formData.complaintDetails}</dd>
            </div>
          )}
          <div>
            <dt className="text-gray-500">Previous Complaint</dt>
            <dd className="font-medium">{formData.hasComplainedBefore ? "Yes" : "No"}</dd>
          </div>
          {formData.hasComplainedBefore && formData.complaintDate && (
            <div>
              <dt className="text-gray-500">Previous Complaint Date</dt>
              <dd className="font-medium">{formData.complaintDate}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          By submitting this claim, you confirm that all the information provided is accurate to the best of your knowledge.
        </p>
      </div>

      <div className="flex mt-6 space-x-3">
        <button
          onClick={goToPreviousStep}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <button
          onClick={submitClaim}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Submit Claim
          <Check className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const SuccessStep = ({ claimNumber, router }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <Check className="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800">Claim Submitted Successfully!</h2>
      
      <p className="text-gray-600">
        Your claim has been successfully submitted and is now being processed. We will keep you updated on its progress.
      </p>
      
      <div className="py-4">
        <p className="text-sm text-gray-500">Claim Reference</p>
        <p className="text-xl font-bold text-blue-600">{claimNumber}</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-200">
        We've sent a confirmation email with your claim details and next steps.
      </div>
      
      <div className="pt-4 space-y-3">
        <button
          onClick={() => router.push('/dashboard/claims')}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          View My Claims
        </button>
        
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

// Main new claim component
export default function NewClaimPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    claimType: "",
    lender: "",
    agreementNumber: "",
    agreementDate: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleReg: "",
    purchasePrice: "",
    complaintReason: "",
    complaintDetails: "",
    hasComplainedBefore: false,
    complaintDate: ""
  });
  const [claimNumber, setClaimNumber] = useState("");

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  const submitClaim = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock claim number
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const claimRef = `CL-${new Date().getFullYear()}-${randomId}`;
    setClaimNumber(claimRef);
    
    setIsSubmitting(false);
    goToNextStep();
  };

  // Progress indicator steps
  const steps = [
    { id: 1, name: "Details" },
    { id: 2, name: "Vehicle" },
    { id: 3, name: "Complaint" },
    { id: 4, name: "Review" }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Start New Claim</h1>
        <p className="mt-1 text-sm text-gray-600">
          {currentStep < 5 ? "Complete the form below to initiate your car finance claim." : ""}
        </p>
      </div>

      {/* Progress steps - show only if not on success step */}
      {currentStep < 5 && (
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className={`relative pr-8 ${stepIdx === steps.length - 1 ? "flex-1" : ""}`}>
                  <div className="flex items-center">
                    <div
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                        currentStep >= step.id
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-5 w-5 text-white" aria-hidden="true" />
                      ) : (
                        <span className={`text-sm font-semibold ${currentStep >= step.id ? "text-white" : "text-gray-600"}`}>
                          {step.id}
                        </span>
                      )}
                    </div>
                    <div className={`hidden sm:block ml-2 text-sm ${currentStep >= step.id ? "font-medium text-gray-900" : "text-gray-500"}`}>
                      {step.name}
                    </div>
                  </div>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={`absolute top-4 h-0.5 w-5 sm:w-full sm:right-8 ${
                        currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}

      {/* Card containing the form steps */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Submitting your claim...</p>
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <StepOne
                formData={formData}
                updateFormData={updateFormData}
                goToNextStep={goToNextStep}
              />
            )}
            
            {currentStep === 2 && (
              <StepTwo
                formData={formData}
                updateFormData={updateFormData}
                goToPreviousStep={goToPreviousStep}
                goToNextStep={goToNextStep}
              />
            )}
            
            {currentStep === 3 && (
              <StepThree
                formData={formData}
                updateFormData={updateFormData}
                goToPreviousStep={goToPreviousStep}
                goToNextStep={goToNextStep}
              />
            )}
            
            {currentStep === 4 && (
              <StepFour
                formData={formData}
                goToPreviousStep={goToPreviousStep}
                submitClaim={submitClaim}
              />
            )}
            
            {currentStep === 5 && (
              <SuccessStep
                claimNumber={claimNumber}
                router={router}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
} 