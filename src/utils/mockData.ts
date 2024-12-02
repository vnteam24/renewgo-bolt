import type { ServiceStatus, StatusUpdate } from '../types/service';

export const mockServiceStatus: ServiceStatus = {
  id: 'service-123',
  currentStep: 'inspection',
  startTime: new Date().toISOString(),
  estimatedEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  steps: [
    {
      id: 'check-in',
      title: 'Vehicle Check-In',
      description: 'Initial inspection and documentation',
      estimatedDuration: 15,
      status: 'completed',
      completedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: 'inspection',
      title: 'Diagnostic Inspection',
      description: 'Thorough vehicle inspection and diagnosis',
      estimatedDuration: 45,
      status: 'in-progress',
    },
    {
      id: 'service',
      title: 'Service in Progress',
      description: 'Performing requested service work',
      estimatedDuration: 60,
      status: 'pending',
    },
    {
      id: 'quality-check',
      title: 'Quality Check',
      description: 'Final inspection and quality assurance',
      estimatedDuration: 15,
      status: 'pending',
    },
  ],
  technician: {
    id: 'tech-1',
    name: 'John Smith',
  },
  notes: [],
};

export const mockUpdates: StatusUpdate[] = [
  {
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    message: 'Vehicle received and initial inspection started',
    type: 'info',
  },
  {
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    message: 'Initial inspection completed, proceeding with diagnostic check',
    type: 'success',
  },
  {
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    message: 'Additional inspection required for brake system',
    type: 'warning',
  },
];