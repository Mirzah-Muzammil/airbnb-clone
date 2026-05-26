import { Search, Heart, UserCircle } from "lucide-react";

const MobileFooter = () => (
  <footer className="fixed inset-x-0 bottom-0 z-[900] border-t border-gray-200 bg-white px-6 py-3 md:hidden">
    <div className="mx-auto flex max-w-md items-center gap-10 justify-center">
      <button
        type="button"
        className="flex flex-col items-center gap-1 text-[#E11D48]"
      >
        <Search className="h-6 w-6" />
        <span className="text-xs font-semibold">Explore</span>
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-1 text-gray-500"
      >
        <Heart className="h-6 w-6" />
        <span className="text-xs font-medium">Wishlists</span>
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-1 text-gray-500"
      >
        <UserCircle className="h-6 w-6" />
        <span className="text-xs font-medium">Log in</span>
      </button>
    </div>
  </footer>
);

export default MobileFooter;
