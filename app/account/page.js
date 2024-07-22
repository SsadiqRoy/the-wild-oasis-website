import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Guest Area',
};

async function page() {
  const session = await auth();

  return <h2 className="font-semibold text-2xl mb-7 text-accent-400">Welcome, {session.user.name}</h2>;
}

export default page;
