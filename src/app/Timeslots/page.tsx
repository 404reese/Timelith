// components/TimeSlotPicker.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

const TimeSlotPicker: React.FC = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [timeSlots, setTimeSlots] = useState<Record<string, any>>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [breaks, setBreaks] = useState<number>(1);
  const [breakTimes, setBreakTimes] = useState<{ start: string; end: string }[]>([{ start: '', end: '' }]);

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    const existingSlot = timeSlots[day];
    if (existingSlot) {
      setStartTime(existingSlot.startTime);
      setEndTime(existingSlot.endTime);
      setBreaks(existingSlot.breaks);
      setBreakTimes(existingSlot.breakTimes || [{ start: '', end: '' }]);
    }
  };

  const handleAddOrUpdateTimeSlot = () => {
    if (selectedDay) {
      const newTimeSlot = {
        startTime,
        endTime,
        breaks,
        breakTimes,
        slots: generateTimeSlots(startTime, endTime, breakTimes),
      };
      setTimeSlots((prev) => ({
        ...prev,
        [selectedDay]: newTimeSlot,
      }));
      resetFields();
    }
  };

  const generateTimeSlots = (start: string, end: string, breaks: { start: string; end: string }[]) => {
    const slots: { start: string; end: string }[] = [];
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);

    // Convert break times to Date objects
    const breakIntervals = breaks.map(b => ({
      start: new Date(`1970-01-01T${b.start}:00`),
      end: new Date(`1970-01-01T${b.end}:00`),
    }));

    while (startDate < endDate) {
      const nextStart = new Date(startDate);
      const nextEnd = new Date(startDate.setHours(startDate.getHours() + 1));

      // Check if the slot overlaps with any break times
      const isOverlapping = breakIntervals.some(b =>
        (nextStart < b.end && nextEnd > b.start)
      );

      if (!isOverlapping) {
        slots.push({ start: nextStart.toTimeString().slice(0, 5), end: nextEnd.toTimeString().slice(0, 5) });
      }
    }

    return slots;
  };

  const handleDeleteTimeSlot = (day: string) => {
    setTimeSlots((prev) => {
      const newSlots = { ...prev };
      delete newSlots[day];
      return newSlots;
    });
  };

  const resetFields = () => {
    setSelectedDay(null);
    setStartTime('');
    setEndTime('');
    setBreaks(1);
    setBreakTimes([{ start: '', end: '' }]);
  };

  const handleBreakChange = (index: number, field: 'start' | 'end', value: string) => {
    const newBreakTimes = [...breakTimes];
    newBreakTimes[index][field] = value;
    setBreakTimes(newBreakTimes);
  };

  const handleBreaksChange = (num: number) => {
    const newBreakTimes = Array.from({ length: num }, () => ({ start: '', end: '' }));
    setBreaks(num);
    setBreakTimes(newBreakTimes);
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <h2>Time Slot Picker</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {daysOfWeek.map((day) => (
          <button key={day} onClick={() => handleDayClick(day)} style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '5px' }}>
            {day}
          </button>
        ))}
      </div>
      {selectedDay && (
        <div style={{ marginTop: '20px' }}>
          <h3>{selectedDay}</h3>
          <label>
            Start Time:
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ marginLeft: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }} />
          </label>
          <label style={{ marginLeft: '10px' }}>
            End Time:
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{ marginLeft: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }} />
          </label>
          <label style={{ marginLeft: '10px' }}>
            Breaks:
            <select value={breaks} onChange={(e) => handleBreaksChange(Number(e.target.value))} style={{ marginLeft: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
          {breakTimes.map((breakTime, index) => (
            <div key={index} style={{ marginTop: '10px' }}>
              <label>
                Break {index + 1} Start Time:
                <input type="time" value={breakTime.start} onChange={(e) => handleBreakChange(index, 'start', e.target.value)} style={{ marginLeft: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }} />
              </label>
              <label style={{ marginLeft: '10px' }}>
                Break {index + 1} End Time:
                <input type="time" value={breakTime.end} onChange={(e) => handleBreakChange(index, 'end', e.target.value)} style={{ marginLeft: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }} />
              </label>
            </div>
          ))}
          <button onClick={handleAddOrUpdateTimeSlot} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {selectedDay in timeSlots ? 'Update Time Slot' : 'Add Time Slot'}
          </button>
        </div>
      )}
      <h3>Time Slots</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: '#fff' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #444' }}>Day</th>
            <th style={{ border: '1px solid #444' }}>Start Time</th>
            <th style={{ border: '1px solid #444' }}>End Time</th>
            <th style={{ border: '1px solid #444' }}>Slots</th>
            <th style={{ border: '1px solid #444' }}>Break Times</th> {/* New Break Times Column */}
            <th style={{ border: '1px solid #444' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(timeSlots).map(([day, { startTime, endTime, slots, breakTimes }]) => (
            <tr key={day}>
              <td style={{ border: '1px solid #444' }}>{day}</td>
              <td style={{ border: '1px solid #444' }}>{startTime}</td>
              <td style={{ border: '1px solid #444' }}>{endTime}</td>
              <td style={{ border: '1px solid #444' }}>
              {slots.map((slot: { start: string; end: string }, index: number) => (
  <div key={index}>
    {slot.start} - {slot.end}
  </div>
))}
              </td>
              <td style={{ border: '1px solid #444' }}>
                {breakTimes.map((breakTime : { start: string; end: string }, index: number) => (
                  <div key={index}>
                    {breakTime.start} - {breakTime.end}
                  </div>
                ))}
              </td>
              <td style={{ border: '1px solid #444', display: 'flex', gap: '5px' }}>
                <button onClick={() => handleDayClick(day)} style={{ backgroundColor: '#ffa500', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '5px' }}>Edit</button>
                <button onClick={() => handleDeleteTimeSlot(day)} style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link href="/Classrooms" passHref>
          <Button 
            variant="bottom" 
            size='lg'
            onClick={() => {
              console.log("Previous Section");
            }}
          >
            ← Previous Section
          </Button>
        </Link>
        <Link href="/Generation" passHref>
          <Button 
            variant="bottom" 
            size='lg'
            onClick={() => {
              console.log("Next Section");
            }}
          >
            Next Section →
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TimeSlotPicker;
