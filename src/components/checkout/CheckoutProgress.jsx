import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function CheckoutProgress({ currentStep }) {
  const steps = [
    { id: 'shipping', name: 'Shipping' },
    { id: 'confirmation', name: 'Confirmation' },
    { id: 'payment', name: 'Payment' }
  ];

  return (
    <div className="py-4">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center ${
              currentStep === step.id
                ? 'text-blue-600'
                : index < steps.findIndex(s => s.id === currentStep)
                  ? 'text-green-600'
                  : 'text-gray-400'
            }`}>
              <span className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${currentStep === step.id
                  ? 'bg-blue-100 border-2 border-blue-600'
                  : index < steps.findIndex(s => s.id === currentStep)
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }
              `}>
                {index < steps.findIndex(s => s.id === currentStep) ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </span>
              <span className="ml-2 text-sm font-medium">{step.name}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 ${
                index < steps.findIndex(s => s.id === currentStep)
                  ? 'bg-green-600'
                  : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}