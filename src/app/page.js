"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Redirect to dashboard if user is signed in
    if (isLoaded && userId) {
      router.push('/dashboard');
    }
  }, [isLoaded, userId, router]);

  return (
    <div className="flex min-h-screen flex-col bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-emerald-50"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] lg:w-[25vw] lg:h-[25vw] rounded-full bg-gradient-to-r from-blue-300/20 to-emerald-300/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] md:w-[25vw] md:h-[25vw] lg:w-[20vw] lg:h-[20vw] rounded-full bg-gradient-to-r from-emerald-300/20 to-blue-300/20 blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-[15%] left-[15%] w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] rounded-full bg-gradient-to-r from-blue-400/20 to-emerald-400/20 blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">ClaimBuddy</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12"></path>
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Benefits
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              How It Works
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              FAQ
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-medium border-none shadow-lg hover:shadow-xl transition-all duration-300 px-5 py-2 rounded-full">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9 rounded-full border-2 border-emerald-200"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className="text-sm font-medium py-2 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="#benefits" 
                  className="text-sm font-medium py-2 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Benefits
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="text-sm font-medium py-2 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  href="#faq" 
                  className="text-sm font-medium py-2 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-medium border-none shadow-md hover:shadow-lg transition-all duration-300 mt-2 px-4 py-2 rounded-full">
                      Login
                    </button>
                  </SignInButton>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center justify-between py-2 mt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Your Account</span>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-8 h-8 rounded-full border-2 border-emerald-200"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
                {/* Left column - Text content */}
                <div className="space-y-6 md:space-y-8 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                  <div className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent leading-tight">
                      Take control of your car finance claims
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">
                      We'll show you how to run your own claims and save an average of £3,500 in legal fees.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button 
                      className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white border-none px-6 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      aria-label="Calculate Your Savings"
                    >
                      Calculate Your Savings
                    </button>
                    <Link href="/sign-up">
                      <button 
                        className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full text-base font-medium"
                        aria-label="Get Started"
                      >
                        Get Started
                      </button>
                    </Link>
                  </div>
                  
                  <div className="space-y-3 flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-emerald-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-700">95% cheaper than signing up to a law firm</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-emerald-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-700">98% receive the same result</span>
                    </div>
                  </div>
                </div>
                
                {/* Right column - Calculator */}
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-md shadow-lg rounded-xl overflow-hidden border-none transform hover:scale-[1.01] transition-all duration-300">
                    <div className="p-6 sm:p-8 bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">See how much you'll save</h3>
                          <p className="text-gray-600">
                            Tell us how many agreements you have, we'll let you know how much you could save with us.
                          </p>
                        </div>
                        <button 
                          className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 py-3 rounded-full text-base font-medium"
                          aria-label="Calculate Now"
                        >
                          Calculate Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-emerald-50 -z-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-4">
                Why Choose ClaimBuddy?
              </h2>
              <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600">
                Our platform makes it easy to manage your own claims without the need for expensive solicitors.
              </p>
            </div>
            
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600" aria-hidden="true">
                        <circle cx="12" cy="12" r="8"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    ),
                    title: "Save Money",
                    description: "Save an average of £3,500 in legal fees by managing your own claims."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-emerald-500" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ),
                    title: "Same Results",
                    description: "98% of our users receive the same results as those using solicitors."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    ),
                    title: "Full Control",
                    description: "Maintain complete control over your claims process with our guided approach."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="h-full border border-gray-100 rounded-xl shadow-md group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-6 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm h-full rounded-xl">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 mb-4 group-hover:from-blue-200 group-hover:to-emerald-200 transition-all duration-300">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">{benefit.title}</h3>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-4">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600">
                Our guided process makes it simple to manage your claims from start to finish.
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    step: "01",
                    title: "Sign Up",
                    description: "Create your account in minutes"
                  },
                  {
                    step: "02",
                    title: "Enter Details",
                    description: "Tell us about your agreements"
                  },
                  {
                    step: "03",
                    title: "Generate Documents",
                    description: "We create all paperwork automatically"
                  },
                  {
                    step: "04",
                    title: "Submit Your Claim",
                    description: "Send documents with our guidance"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-4 p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center text-lg font-bold text-blue-600">
                        {step.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 -z-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-3xl text-center space-y-6 md:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Ready to take control of your claims?
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Start your journey today and save thousands in legal fees.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/sign-up">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 py-3 px-6 rounded-full text-base font-medium" aria-label="Get Started Now">
                    Get Started Now
                  </button>
                </Link>
                <button 
                  className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-full text-base font-medium"
                  aria-label="Calculate Your Savings"
                >
                  Calculate Your Savings
                </button>
              </div>
              <p className="text-sm text-gray-500">
                ClaimBuddy is an educational service that helps you manage your claims independently. 
                We do not provide financial or legal advice, and results may vary based on your individual circumstances.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-gradient-to-r from-blue-50 to-emerald-50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">ClaimBuddy</span>
            </div>
            <p className="text-sm text-gray-500 text-center md:text-left">© 2024 ClaimBuddy. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 text-sm justify-center md:justify-end">
              <Link href="/terms" className="text-gray-500 hover:text-emerald-500 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-emerald-500 transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-emerald-500 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
      
      {/* Add animations */}
      {mounted && (
        <style jsx global>{`
          @keyframes pulse {
            0% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.05);
            }
            100% {
              opacity: 0.5;
              transform: scale(1);
            }
          }
          .animate-pulse {
            animation: pulse 6s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      )}
    </div>
  );
}
