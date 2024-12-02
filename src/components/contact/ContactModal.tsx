import { X, Phone, Mail, MessageSquare } from 'lucide-react';
import type { ServiceStatus } from '../../types/service';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceStatus: ServiceStatus;
}

export default function ContactModal({ isOpen, onClose, serviceStatus }: ContactModalProps) {
  if (!isOpen) return null;

  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Phone',
      description: 'Speak directly with our service team',
      action: '1-800-AUTO-CARE',
      primary: true,
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      description: 'Send us a detailed message',
      action: 'support@autocare.com',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                  Contact Service Center
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Service ID: {serviceStatus.id}
                    <br />
                    Technician: {serviceStatus.technician.name}
                  </p>
                </div>

                <div className="mt-4 space-y-4">
                  {contactMethods.map((method) => (
                    <div
                      key={method.title}
                      className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0 text-blue-600">
                        {method.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {method.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          className={`px-4 py-2 text-sm rounded-md ${
                            method.primary
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {method.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}