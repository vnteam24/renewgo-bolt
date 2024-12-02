import { format } from 'date-fns';
import type { DaySchedule } from '../../types/calendar';

interface CalendarGridProps {
  days: DaySchedule[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export default function CalendarGrid({ days, selectedDate, onDateSelect }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div
          key={day}
          className="p-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
        >
          {day}
        </div>
      ))}
      {days.map(({ date, slots }) => {
        const hasAvailableSlots = slots.some((slot) => slot.available);
        const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

        return (
          <button
            key={date.toISOString()}
            onClick={() => hasAvailableSlots && onDateSelect(date)}
            disabled={!hasAvailableSlots}
            className={`
              p-2 text-center border border-gray-200 transition-colors
              ${hasAvailableSlots ? 'hover:bg-blue-50 cursor-pointer' : 'bg-gray-100 cursor-not-allowed'}
              ${isSelected ? 'bg-blue-100 border-blue-500' : ''}
            `}
          >
            <span className="text-sm">{format(date, 'd')}</span>
            {hasAvailableSlots && (
              <div className="text-xs text-green-600">Available</div>
            )}
          </button>
        );
      })}
    </div>
  );
}