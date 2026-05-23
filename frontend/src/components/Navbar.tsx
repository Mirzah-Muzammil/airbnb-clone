type NavbarProps = {
  // Navigation no longer handles state since FilterPanel is the primary search bar
};

const Navbar = () => (
  <header className="sticky top-0 z-10 w-full border-b border-[#EBEBEB] bg-white">
    <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-[#FF385C]">airbnb</span>
      </div>

      <div className="flex items-center gap-2">
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
  </header>
);

export default Navbar;
