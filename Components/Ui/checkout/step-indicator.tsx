import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
}

const STEPS: Step[] = [
  { number: 1, title: 'Shipping' },
  { number: 2, title: 'Method' },
  { number: 3, title: 'Payment' },
  { number: 4, title: 'Review' },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex-1">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step.number < currentStep
                    ? 'bg-green-500 text-white'
                    : step.number === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
              </div>

              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <p className="text-xs font-medium text-gray-600 mt-2 text-center">{step.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
