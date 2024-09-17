'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type Value = Date | null | [Date | null, Date | null];

export default function Page() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <main className="cont min-h-screen">
      <h3 className="mt-7 text-2xl font-medium">Book an appointment</h3>
      <form className="mt-7">
        <section className="flex flex-col space-y-2">
          <span className="font-medium">Pick the date</span>
          <Calendar
            value={value}
            onChange={onChange}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          />
        </section>
      </form>
    </main>
  );
}
