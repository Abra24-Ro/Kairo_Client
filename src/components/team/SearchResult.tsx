import { addUserToProject } from "@/api/TeamApi";
import type { TeamMember } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, UserPlus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type SearchResultProps = {
  user: TeamMember;
  handleAddUser: () => void;
};

export const SearchResult = ({ user, handleAddUser }: SearchResultProps) => {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Colaborador agregado correctamente");
      handleAddUser();
      navigate(location.pathname, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
    },
  });

  const handleAddToProject = () => {
    mutate({ projectId, id: user._id });
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
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* User info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold">
            {getInitials(user.name)}
          </div>

          {/* Name and email */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleAddToProject}
          disabled={isPending}
          className="cursor-pointer shrink-0 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        > 
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Agregando...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Agregar
            </>
          )}
        </button>
      </div>
    </div>
  );
};