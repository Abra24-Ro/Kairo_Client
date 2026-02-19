import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MoreVertical, Edit3, Trash2, ExternalLink } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dashboardProyectSchema, type User } from "@/types";
import { isManager } from "@/utils/policies";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { z } from "zod";


type DashboardProject = z.infer<typeof dashboardProyectSchema>[number];

type Props = {
  proyect: DashboardProject;
  user: User;
};

export const ProyectItem = ({ proyect, user }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isOwner = isManager(proyect.manager, user._id);

  const handleDeleteClick = () => {
    navigate(location.pathname + `?deleteProject=${proyect._id}`);
  };

  return (
    <>
      <div
        className={`
          relative rounded-xl border p-6 shadow-sm transition hover:shadow-md
          ${isOwner ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Link
                to={`/projects/${proyect._id}`}
                className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition truncate"
              >
                {proyect.projectName}
              </Link>

              <span
                className={`
                  inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${
                    isOwner
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }
                `}
              >
                {isOwner ? "Propietario" : "Colaborador"}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              Cliente: <span className="font-medium">{proyect.clientName}</span>
            </p>

            <p className="text-sm text-gray-500 line-clamp-2">
              {proyect.description}
            </p>
          </div>

          {/* Menu solo si es owner */}
          {isOwner && !confirmDelete && (
            <Menu as="div" className="relative shrink-0">
              <Menu.Button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                <MoreVertical className="h-5 w-5" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden z-10">
                  <div className="py-1 cursor-pointer">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/projects/${proyect._id}`}
                          className={`
                            cursor-pointer
                            flex items-center gap-2 px-4 py-2.5 text-sm transition
                            ${active ? "bg-gray-50 text-gray-900" : "text-gray-700"}
                          `}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Ver proyecto
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/projects/${proyect._id}/edit`}
                          className={`
                            cursor-pointer
                            flex items-center gap-2 px-4 py-2.5 text-sm transition
                            ${active ? "bg-gray-50 text-gray-900" : "text-gray-700"}
                          `}
                        >
                          <Edit3 className="h-4 w-4" />
                          Editar proyecto
                        </Link>
                      )}
                    </Menu.Item>

                    <div className="border-t border-gray-100" />

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setConfirmDelete(true)}
                          className={`
                            cursor-pointer
                            w-full flex items-center gap-2 px-4 py-2.5 text-sm transition text-left
                            ${active ? "bg-red-50 text-red-700" : "text-red-600"}
                          `}
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar proyecto
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>

        {/* Confirm Delete */}
        {confirmDelete && isOwner && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <Trash2 className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">
                  ¿Eliminar proyecto?
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Esta acción es permanente y no se puede deshacer.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteClick}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteProjectModal />
    </>
  );
};