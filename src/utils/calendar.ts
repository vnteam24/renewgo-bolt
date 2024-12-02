import { addDays, format, setHours, setMinutes, startOfDay } from 'date-fns';
import type { DaySchedule, TimeSlot } from '../types/calendar';

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8; // 8 AM
  const endHour = 17; // 5 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = format(setMinutes(setHours(startOfDay(date), hour), minute), 'HH:mm');
      slots.push({
        time,
        available: Math.random() > 0.3, // Simulate availability
      });
    }
  }

  return slots;
};

export const generateAvailableDays = (startDate: Date, numberOfDays: number): DaySchedule[] => {
  const days: DaySchedule[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    const date = addDays(startDate, i);
    days.push({
      date,
      slots: generateTimeSlots(date),
    });
  }

  return days;
};