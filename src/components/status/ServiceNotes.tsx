import type { StatusUpdate } from '../../types/service';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ServiceNotesProps {
  updates: StatusUpdate[];
}

export default function ServiceNotes({ updates }: ServiceNotesProps) {
  const getIcon = (type: StatusUpdate['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {updates.map((update, idx) => (
          <li key={idx} className="relative pb-4">
            <div className="flex items-start space-x-3">
              {getIcon(update.type)}
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  {new Date(update.timestamp).toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-900">{update.message}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}