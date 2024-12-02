import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import StatusTimeline from './StatusTimeline';
import ServiceNotes from './ServiceNotes';
import ContactModal from '../contact/ContactModal';
import { useService } from '../../contexts/ServiceContext';
import { connectToServiceWebSocket } from '../../utils/serviceWebSocket';

export default function ServiceStatusTracker() {
  const { state, dispatch } = useService();
  const { status, updates, error } = state;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const cleanup = connectToServiceWebSocket({
      onStatusUpdate: (newStatus) => {
        dispatch({ type: 'SET_STATUS', payload: newStatus });
      },
      onNewUpdate: (update) => {
        dispatch({ type: 'ADD_UPDATE', payload: update });
      },
      onError: (error) => {
        dispatch({ type: 'SET_ERROR', payload: error });
      },
    });

    return cleanup;
  }, [dispatch]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h2 className="text-xl font-bold text-white">Service Status</h2>
          <p className="text-blue-100">
            Estimated completion: {new Date(status.estimatedEndTime).toLocaleTimeString()}
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Current Progress</h3>
                <p className="text-sm text-gray-500">
                  Technician: {status.technician.name}
                </p>
              </div>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Service Center
              </button>
            </div>
            <StatusTimeline status={status} />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Service Updates
            </h3>
            <ServiceNotes updates={updates} />
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        serviceStatus={status}
      />
    </div>
  );
}