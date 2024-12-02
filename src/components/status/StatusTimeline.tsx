import type { ServiceStatus } from '../../types/service';
import ServiceStepIndicator from './ServiceStepIndicator';

interface StatusTimelineProps {
  status: ServiceStatus;
}

export default function StatusTimeline({ status }: StatusTimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {status.steps.map((step, idx) => (
          <li key={step.id} className="relative pb-8">
            <ServiceStepIndicator
              step={step}
              isActive={step.id === status.currentStep}
              isLast={idx === status.steps.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}