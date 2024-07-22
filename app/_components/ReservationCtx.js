'use client';

const { useContext, createContext, useState } = require('react');

const Context = createContext();
const initialRange = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialRange);

  const resetRange = () => setRange(initialRange);

  return <Context.Provider value={{ range, setRange, resetRange }}>{children}</Context.Provider>;
}

export function useReservation() {
  const context = useContext(Context);
  if (!context) throw new Error('useReservation is use outside ReservationProvider', { cause: 'some fucking mistake' });

  return context;
}

export default ReservationProvider;
