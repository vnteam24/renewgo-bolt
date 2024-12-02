import { Check, Clock, Wrench } from 'lucide-react';
import type { ServiceStep } from '../../types/service';

interface ServiceStepIndicatorProps {
  step: ServiceStep;
  isActive: boolean;
  isLast: boolean;
}

export default function ServiceStepIndicator({ step, isActive, isLast }: ServiceStepIndicatorProps) {
  const getIcon = () => {
    if (step.status === 'completed') return <Check className="w-5 h-5" />;
    if (step.status === 'in-progress') return <Wrench className="w-5 h-5 animate-spin" />;
    return <Clock className="w-5 h-5" />;
  };

  const getStatusColor = () => {
    if (step.status === 'completed') return 'bg-green-500';
    if (step.status === 'in-progress') return 'bg-blue-500';
    return 'bg-gray-300';
  };

  return (
    <div className="flex items-center">
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${getStatusColor()} text-white`}>
        {getIcon()}
      </div>
      <div className="ml-4 flex-1">
        <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
        <p className="text-sm text-gray-500">{step.description}</p>
        {step.status === 'in-progress' && (
          <p className="text-sm text-blue-600 mt-1">
            Estimated time: {step.estimatedDuration} minutes
          </p>
        )}
        {step.status === 'completed' && step.completedAt && (
          <p className="text-sm text-green-600 mt-1">
            Completed at {new Date(step.completedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
      {!isLast && (
        <div className={`h-full w-0.5 absolute left-5 -bottom-4 ${
          step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
        }`} />
      )}
    </div>
  );
}