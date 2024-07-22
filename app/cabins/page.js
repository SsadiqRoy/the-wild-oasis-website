import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '../_lib/data-service';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';
import Filter from '../_components/Filter';
import ReservationReminder from '../_components/ReservationReminder';

export const metadata = {
  title: 'Cabins',
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? 'all';
  // CHANGE

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Luxury Cabins</h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private hot tub under the stars. Enjoy nature&apos;s beauty in your own
        little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to paradise.
      </p>

      <div className="flex justify-end mb-5">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

//

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins;

  if (filter === 'small') filteredCabins = cabins.filter((c) => c.maxCapacity < 4);
  if (filter === 'medium') filteredCabins = cabins.filter((c) => c.maxCapacity > 3 && c.maxCapacity < 8);
  if (filter === 'large') filteredCabins = cabins.filter((c) => c.maxCapacity > 7 && c.maxCapacity < 13);
  if (filter === 'all') filteredCabins = cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
