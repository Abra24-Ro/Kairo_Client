import { User, KeyRound, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { name: "Mi Cuenta", href: "/profile", icon: User },
  { name: "Cambiar Password", href: "/profile/change-password", icon: KeyRound },
];

export const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab =
    tabs.find((tab) => tab.href === location.pathname)?.href ?? tabs[0].href;
  
  const currentTabData = tabs.find((tab) => tab.href === currentTab);
  const CurrentIcon = currentTabData?.icon ?? User;

  return (
    <div className="mb-8">
      {/* Mobile */}
      <div className="sm:hidden relative">
        <label htmlFor="tabs" className="sr-only">
          Seleccionar sección
        </label>
        
        <div className="relative">
          <CurrentIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-600 pointer-events-none z-10" />
          
          <select
            id="tabs"
            value={currentTab}
            onChange={(e) => navigate(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-11 pr-10 py-3.5 text-sm font-medium text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {tabs.map((tab) => (
              <option key={tab.href} value={tab.href}>
                {tab.name}
              </option>
            ))}
          </select>
          
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Desktop / Tablet */}
      <nav className="hidden sm:inline-flex items-center gap-1.5 p-1.5 bg-gray-100 rounded-xl">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              to={tab.href}
              className={`
                group flex items-center gap-2.5 px-6 py-3 text-sm font-medium 
                whitespace-nowrap rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }
              `}
            >
              <Icon
                className={`
                  h-4 w-4 transition-colors duration-200
                  ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                `}
              />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};