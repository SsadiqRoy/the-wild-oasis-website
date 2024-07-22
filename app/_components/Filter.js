'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('capacity', filter);
    const url = `${pathname}?${params.toString()}`;
    router.replace(url);
  }

  return (
    <div className="flex border border-primary-700">
      <Button activeFilter={activeFilter} filter="all" handleFilter={handleFilter}>
        all cabins
      </Button>
      <Button activeFilter={activeFilter} filter="small" handleFilter={handleFilter}>
        1&mdash;3 guests
      </Button>
      <Button activeFilter={activeFilter} filter="medium" handleFilter={handleFilter}>
        4&mdash;7 guests
      </Button>
      <Button activeFilter={activeFilter} filter="large" handleFilter={handleFilter}>
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ children, filter, handleFilter, activeFilter }) {
  const active = activeFilter === filter ? 'bg-primary-700' : '';
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`${active} border border-primary-700 px-5 py-2 capitalize hover:bg-primary-700 transition-colors`}
    >
      {children}
    </button>
  );
}

export default Filter;
