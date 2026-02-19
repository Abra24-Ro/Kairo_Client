import { getProjectTeam } from "@/api/TeamApi";
import { AddMemberModal } from "@/components/team/AddMemberModal";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { ErrorUi } from "@/components/UI/ErrorUi";
import { Loader } from "@/components/UI/Loader";
import { PageHeader } from "@/components/UI/projects/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { Plus, Users } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export const ProjectTeamView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam({ projectId: projectId! }),
    retry: false,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorUi message="Error al obtener el equipo" />;
  if (!data) return null;

  const hasMembers = data.length > 0;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
          {/* Header */}
          <PageHeader
            title="Equipo del proyecto"
            description="Gestiona los miembros del equipo asignados a este proyecto"
            backTo={`/projects/${projectId}`}
            backLabel="Volver al proyecto"
          />

          {/* Section */}
          <section className="space-y-6">
            {/* Section header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-wider">
                Miembros del equipo
              </h2>

              <button
                onClick={() => navigate(`${location.pathname}?addMember=true`)}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-lg bg-indigo-600 px-4 py-2.5
                  text-sm font-medium text-white
                  hover:bg-indigo-500 active:bg-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  transition shadow-sm hover:shadow-md
                "
              >
                <Plus className="h-4 w-4" />
                Agregar miembro
              </button>
            </div>

            {/* Empty State */}
            {!hasMembers ? (
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col items-center text-center px-6 py-12 sm:py-16">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
                    <Users className="h-8 w-8 text-indigo-400" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Aún no hay miembros en el equipo
                  </h3>

                  <p className="mt-2 max-w-md text-sm sm:text-base text-gray-500">
                    Agrega personas al proyecto para comenzar a colaborar y
                    distribuir las tareas.
                  </p>
                </div>
              </div>
            ) : (
              /* Grid */
              <div
                className="
                grid grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
              >
                {data.map((member) => (
                  <TeamMemberCard key={member._id} data={member} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Modal */}
      <AddMemberModal />
    </>
  );
};
