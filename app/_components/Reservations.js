import { auth } from '../_lib/auth';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import DateSelector from './DateSelector';
import LoginMessage from './LoginMessage';
import ReservationForm from './ReservationForm';

async function Reservations({ cabin }) {
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 border-r-4">
      <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
      {!session?.user && <LoginMessage />}
      {session?.user && <ReservationForm cabin={cabin} user={session.user} />}
    </div>
  );
}

export default Reservations;
