import { Home, Compass, Bell, Search } from "lucide-react";

type NavbarProps = {
  // Navigation no longer handles state since FilterPanel is the primary search bar
};

const Navbar = () => (
  <header className="sticky top-0 z-[999] w-full border-b border-[#EBEBEB] bg-white">
    {/* Desktop View */}
    <div className="hidden md:grid mx-auto w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-[#FF385C]">airbnb</span>
      </div>

      <nav className="flex items-center justify-center gap-6 text-sm font-semibold text-gray-700">
        <button
          type="button"
          className="group relative flex items-center gap-2 px-2 py-2 text-gray-900"
        >
          <Home className="h-5 w-5" />
          <span>Homes</span>
          <span className="absolute -bottom-2 left-1/2 h-[2px] w-16 -translate-x-1/2 rounded-full bg-gray-900" />
        </button>
        <button
          type="button"
          className="group relative flex items-center gap-2 px-2 py-2 text-gray-500 hover:text-gray-700"
        >
          <Compass className="h-5 w-5" />
          <span>Experiences</span>
          <span className="ml-1 rounded-full bg-gray-800 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            New
          </span>
        </button>
        <button
          type="button"
          className="group relative flex items-center gap-2 px-2 py-2 text-gray-500 hover:text-gray-700"
        >
          <Bell className="h-5 w-5" />
          <span>Services</span>
          <span className="ml-1 rounded-full bg-gray-800 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            New
          </span>
        </button>
      </nav>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="rounded-full px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
        >
          Become a host
        </button>
        <button className="flex items-center gap-2 rounded-full border border-gray-300 p-2 pl-3 hover:shadow-md transition">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <div className="w-7 h-7 bg-gray-500 rounded-full text-white flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    {/* Mobile View */}
    <div className="flex md:hidden flex-col px-4 pt-3 pb-0 gap-4">
      {/* Mobile Search Pill */}
      <button
        onClick={() => {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("open-mobile-search"));
          }, 10);
        }}
        className="mobile-search-pill mx-auto flex w-[90%] items-center justify-center gap-3 rounded-full border border-gray-300 shadow-[0_3px_10px_rgba(0,0,0,0.08)] px-4 py-3 bg-white"
      >
        <Search className="w-5 h-5 text-gray-800" strokeWidth={3} />
        <span className="text-sm font-semibold text-gray-800">
          Start your search
        </span>
      </button>

      {/* Nav Items */}
      <nav className="flex items-center justify-center gap-8 text-sm font-semibold text-gray-700">
        <button
          type="button"
          className="group relative flex flex-col pt-1 pb-3 items-center justify-center gap-1 text-gray-900"
        >
          <Home className="h-6 w-6 opacity-80" />
          <span className="text-xs">Homes</span>
          <span className="absolute bottom-0 left-1/2 h-[2px] w-full -translate-x-1/2 rounded-full bg-gray-900" />
        </button>
        <button
          type="button"
          className="group relative flex flex-col pt-1 pb-3 items-center justify-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <Compass className="h-6 w-6 opacity-70" />
          <span className="text-xs">Experiences</span>
          <span className="absolute top-0 -right-2 rounded-full bg-gray-800 px-1 py-0.5 text-[8px] leading-tight font-bold uppercase text-white shadow-sm border border-white">
            New
          </span>
        </button>
        <button
          type="button"
          className="group relative flex flex-col pt-1 pb-3 items-center justify-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <Bell className="h-6 w-6 opacity-70" />
          <span className="text-xs">Services</span>
          <span className="absolute top-0 -right-2 rounded-full bg-gray-800 px-1 py-0.5 text-[8px] leading-tight font-bold uppercase text-white shadow-sm border border-white">
            New
          </span>
        </button>
      </nav>
    </div>
  </header>
);

export default Navbar;
