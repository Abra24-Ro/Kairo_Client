import { removeUserFromProject } from "@/api/TeamApi";
import type { TeamMember } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "../UI/ConfirmDialog";
import { useParams } from "react-router-dom";

interface TeamMemberCardProps {
  data: TeamMember;
}

export const TeamMemberCard = ({ data }: TeamMemberCardProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const projectId = useParams<{ projectId: string }>().projectId!;

  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Colaborador eliminado del proyecto");
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      setShowDialog(false);
    },
  });

  const handleRemoveUser = () => {
    mutate({ projectId, id: data._id });
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
    <>
      <div className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
        {/* Content */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 text-white text-sm font-semibold shadow-sm">
            {getInitials(data.name)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {data.name}
            </h3>
            
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{data.email}</span>
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => setShowDialog(true)}
            disabled={isPending}
            className="cursor-pointer opacity-0 group-hover:opacity-100 shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Eliminar del proyecto"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleRemoveUser}
        title="Eliminar colaborador"
        description={`¿Estás seguro de eliminar a ${data.name} del proyecto? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        isLoading={isPending}
      />
    </>
  );
};