import React, { useState, useEffect } from 'react';
import EmailInputStep from './EmailInputPage';
import OtpVerificationStep from './OtpVerificationPage';
import NewPasswordStep from './NewPasswordPage';

const ResetPassword = () => {
  // Initialize the state from localStorage or set default to 1
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem('email');
    return savedEmail || '';
  });



  // Save the email to localStorage whenever it changes
  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email);
    }
  }, [email]);

  // This function moves to the next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // This function moves back a step (optional, for going back)
  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        {currentStep === 1 && (
          <EmailInputStep
            email={email}
            setEmail={setEmail}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <OtpVerificationStep
            email={email}
            setEmail={setEmail}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        )}
        {currentStep === 3 && (
          <NewPasswordStep
            email={email}
            previousStep={previousStep}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
