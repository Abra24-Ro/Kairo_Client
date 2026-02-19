import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { User, FolderKanban, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const NavMenu = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN_kairo");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    toast.success("Sesión cerrada correctamente");
    navigate("/auth");
  };

  // Obtener iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {/* Botón del menú */}
          <Popover.Button
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all
              ${
                open
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            {/* Avatar con iniciales */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-medium">
              {data?.name ? getInitials(data.name) : "U"}
            </div>

            {/* Nombre (hidden en mobile) */}
            <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">
              {data?.name}
            </span>

            {/* Chevron */}
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </Popover.Button>

          {/* Panel desplegable */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95 translate-y-1"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {data?.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {data?.email}
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Popover.Button
                  as={Link}
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition w-full"
                >
                  <User className="h-4 w-4 text-gray-400" />
                  Mi Perfil
                </Popover.Button>

                <Popover.Button
                  as={Link}
                  to="/"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition w-full"
                >
                  <FolderKanban className="h-4 w-4 text-gray-400" />
                  Mis Proyectos
                </Popover.Button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100">
                <Popover.Button
                  as="button"
                  onClick={logout}
                  className="cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full rounded-b-xl"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Popover.Button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};