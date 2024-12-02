import { useState } from 'react';
import Header from './components/layout/Header';
import ServiceForm from './components/customer/ServiceForm';
import AppointmentCalendar from './components/calendar/AppointmentCalendar';
import ServiceStatusTracker from './components/status/ServiceStatusTracker';
import { ServiceProvider } from './contexts/ServiceContext';

function App() {
  const [step, setStep] = useState<'service' | 'calendar' | 'status'>('status');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ServiceProvider>
          {step === 'service' ? (
            <ServiceForm onComplete={() => setStep('calendar')} />
          ) : step === 'calendar' ? (
            <AppointmentCalendar />
          ) : (
            <ServiceStatusTracker />
          )}
        </ServiceProvider>
      </main>
    </div>
  );
}

export default App;