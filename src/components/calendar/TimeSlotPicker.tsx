import type { TimeSlot } from '../../types/calendar';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export default function TimeSlotPicker({ slots, selectedTime, onTimeSelect }: TimeSlotPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {slots.map(({ time, available }) => (
        <button
          key={time}
          onClick={() => available && onTimeSelect(time)}
          disabled={!available}
          className={`
            p-2 text-sm rounded-md border transition-colors
            ${available 
              ? 'hover:bg-blue-50 cursor-pointer' 
              : 'bg-gray-100 cursor-not-allowed text-gray-400'
            }
            ${selectedTime === time ? 'bg-blue-100 border-blue-500' : 'border-gray-200'}
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
}