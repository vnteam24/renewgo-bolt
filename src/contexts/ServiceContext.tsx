import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import type { ServiceStatus, StatusUpdate } from '../types/service';
import { mockServiceStatus, mockUpdates } from '../utils/mockData';

interface ServiceState {
  status: ServiceStatus;
  updates: StatusUpdate[];
  isLoading: boolean;
  error: string | null;
}

type ServiceAction =
  | { type: 'SET_STATUS'; payload: ServiceStatus }
  | { type: 'ADD_UPDATE'; payload: StatusUpdate }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: ServiceState = {
  status: mockServiceStatus,
  updates: mockUpdates,
  isLoading: false,
  error: null,
};

const ServiceContext = createContext<{
  state: ServiceState;
  dispatch: React.Dispatch<ServiceAction>;
} | null>(null);

function serviceReducer(state: ServiceState, action: ServiceAction): ServiceState {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'ADD_UPDATE':
      return { ...state, updates: [action.payload, ...state.updates] };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(serviceReducer, initialState);

  return (
    <ServiceContext.Provider value={{ state, dispatch }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
}