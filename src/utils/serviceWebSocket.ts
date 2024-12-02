import type { ServiceStatus, StatusUpdate } from '../types/service';
import { mockServiceStatus } from './mockData';

// Simulated WebSocket events
const events = [
  {
    delay: 5000,
    update: {
      message: 'Diagnostic scan in progress...',
      type: 'info' as const,
    },
  },
  {
    delay: 10000,
    update: {
      message: 'Found potential issue with brake fluid levels',
      type: 'warning' as const,
    },
    status: {
      ...mockServiceStatus,
      steps: mockServiceStatus.steps.map(step =>
        step.id === 'inspection' ? { ...step, status: 'completed', completedAt: new Date().toISOString() } :
        step.id === 'service' ? { ...step, status: 'in-progress' } :
        step
      ),
      currentStep: 'service',
    },
  },
  {
    delay: 15000,
    update: {
      message: 'Beginning brake system maintenance',
      type: 'info' as const,
    },
  },
];

type WebSocketCallback = {
  onStatusUpdate: (status: ServiceStatus) => void;
  onNewUpdate: (update: StatusUpdate) => void;
  onError: (error: string) => void;
};

export function connectToServiceWebSocket(callbacks: WebSocketCallback) {
  // Simulate WebSocket connection and events
  events.forEach(({ delay, update, status }) => {
    setTimeout(() => {
      if (update) {
        callbacks.onNewUpdate({
          timestamp: new Date().toISOString(),
          ...update,
        });
      }
      if (status) {
        callbacks.onStatusUpdate(status);
      }
    }, delay);
  });

  // Return cleanup function
  return () => {
    // Cleanup would disconnect the WebSocket in a real implementation
  };
}