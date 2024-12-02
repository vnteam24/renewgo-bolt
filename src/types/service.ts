export type ServiceStep = {
  id: string;
  title: string;
  description: string;
  estimatedDuration: number; // in minutes
  status: 'pending' | 'in-progress' | 'completed';
  completedAt?: string;
};

export type ServiceStatus = {
  id: string;
  currentStep: string;
  startTime: string;
  estimatedEndTime: string;
  steps: ServiceStep[];
  notes: string[];
  technician: {
    name: string;
    id: string;
  };
};

export type StatusUpdate = {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success';
};