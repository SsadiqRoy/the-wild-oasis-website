import SideNavigation from '../_components/SideNavigation';

function Page({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full">
      <SideNavigation />
      <div className="px-2 ">{children}</div>
    </div>
  );
}

export default Page;
