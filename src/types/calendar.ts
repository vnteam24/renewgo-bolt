export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

export interface CalendarState {
  selectedDate: Date | null;
  selectedTime: string | null;
}