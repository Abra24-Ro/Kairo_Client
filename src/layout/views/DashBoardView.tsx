import { getProjects } from "@/api/ProjectApi";
import { Loader } from "@/components/UI/Loader";
import { ProyectItem } from "@/components/UI/projects/ProyectItem";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { dashboardProyectSchema } from "@/types";
import { ErrorUi } from "@/components/UI/ErrorUi";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

// Usamos el tipo real que retorna getProjects, no Project[]
type DashboardProject = z.infer<typeof dashboardProyectSchema>[number];

export const DashBoardView = () => {
  const { data: user, isLoading: isLoadingAuth } = useAuth();
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<DashboardProject[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading && isLoadingAuth) return <Loader />;

  if (isError) {
    return <ErrorUi message="Error al cargar proyectos" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Mis Proyectos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Aquí puedes ver y administrar todos tus proyectos activos.
          </p>
        </div>

        <Link
          to="/projects/create"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-500 transition"
        >
          + Crear Proyecto
        </Link>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No tienes proyectos aún.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProyectItem key={project._id} proyect={project} user={user!} />
          ))}
        </div>
      )}
    </div>
  );
};