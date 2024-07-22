'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';

function ReservationsList({ reserves }) {
  const [bookings, optimisticDelete] = useOptimistic(reserves, (bookings, bookingId) => {
    return bookings.filter((b) => b.id !== bookingId);
  });

  function handleDelete(bookingId) {
    optimisticDelete(bookingId);
  }

  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default ReservationsList;
