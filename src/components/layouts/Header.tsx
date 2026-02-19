import { NavMenu } from "@/components/UI/NavMenu";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between gap-4">
          
          <div className="flex items-center shrink-0">
            <Logo size="lg" />
          </div>

          <div className="hidden md:flex flex-1 justify-center max-w-2xl mx-auto">
            {/* <SearchBar /> - Future implementation */}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <NavMenu />
          </div>
        </div>
      </div>
    </header>
  );
};