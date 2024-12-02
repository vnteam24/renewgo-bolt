import { useState } from 'react';
import { startOfToday } from 'date-fns';
import type { CalendarState, DaySchedule } from '../../types/calendar';
import { generateAvailableDays } from '../../utils/calendar';
import CalendarGrid from './CalendarGrid';
import TimeSlotPicker from './TimeSlotPicker';

export default function AppointmentCalendar() {
  const [availableDays] = useState<DaySchedule[]>(() => 
    generateAvailableDays(startOfToday(), 14)
  );
  
  const [calendarState, setCalendarState] = useState<CalendarState>({
    selectedDate: null,
    selectedTime: null,
  });

  const selectedDaySlots = calendarState.selectedDate
    ? availableDays.find(
        (day) => day.date.toDateString() === calendarState.selectedDate?.toDateString()
      )?.slots || []
    : [];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Select Appointment Time</h2>
      
      <CalendarGrid
        days={availableDays}
        selectedDate={calendarState.selectedDate}
        onDateSelect={(date) => setCalendarState((prev) => ({ ...prev, selectedDate: date }))}
      />

      {calendarState.selectedDate && (
        <TimeSlotPicker
          slots={selectedDaySlots}
          selectedTime={calendarState.selectedTime}
          onTimeSelect={(time) => setCalendarState((prev) => ({ ...prev, selectedTime: time }))}
        />
      )}

      {calendarState.selectedDate && calendarState.selectedTime && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-900">Selected Appointment</h3>
          <p className="text-blue-800">
            Date: {calendarState.selectedDate.toLocaleDateString()}
          </p>
          <p className="text-blue-800">
            Time: {calendarState.selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}