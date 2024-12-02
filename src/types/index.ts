export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleInfo: VehicleInfo;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  vin?: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  serviceType: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}