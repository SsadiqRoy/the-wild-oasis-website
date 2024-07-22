function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">Cabin could not be found. May be removed :(</h1>
      <a href="/cabins" className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg">
        Go back to cabins
      </a>
    </main>
  );
}

export default NotFound;
