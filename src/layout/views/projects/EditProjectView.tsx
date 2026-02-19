import { getProjectById } from "@/api/ProjectApi";
import { ErrorUi } from "@/components/UI/ErrorUi";

import { Loader } from "@/components/UI/Loader";
import { EditProjectForm } from "@/components/UI/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, error } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <Loader />;

  if (error) return <ErrorUi message="Error al obtener el proyecto" />;

  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <EditProjectForm key={projectId} data={data} projectId={projectId} />
    </div>
  );
};
