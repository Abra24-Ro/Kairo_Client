import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { Loader } from "../UI/Loader";
import { EditTaskModal } from "./EditTaskModal";

export const EditTaskData = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask");

  const { data, isLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId: taskId! }),
    enabled: !!taskId && !!projectId,
    retry: false,
    staleTime: 0,
  });

  if (!taskId) return null;

  if (isLoading) return <Loader />;

  if (!data) return null;

  return <EditTaskModal data={data} taskId={taskId} />;
};
