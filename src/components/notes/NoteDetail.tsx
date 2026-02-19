import { useAuth } from "@/hooks/useAuth";
import type { Note } from "@/types";
import { Loader } from "../UI/Loader";
import { useMemo } from "react";
import { Trash2, Loader as LoaderIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/NoteApi";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
  isLast?: boolean;
};

export const NoteDetail = ({ note, isLast }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const canDelete = useMemo(
    () => data?._id === note.createdBy?._id,
    [data, note.createdBy?._id]
  );
   const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success("Nota eliminada exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDeleteNote = () => {
    mutate({
      projectId,
      taskId,
      noteId: note._id,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative pl-5">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-gray-200" />
      )}

      {/* Dot */}
      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-gray-300" />

      {/* Content */}
      <div className="pb-5">
        {/* Date */}
        <p className="text-xs text-gray-400 mb-2">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>

        {/* Card */}
        <div className="space-y-1">
          {/* Header with author and delete */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {note.createdBy?.name}
            </p>

            {canDelete && (
              <button
                type="button"
                disabled={isPending}
                className="cursor-pointer text-gray-400 hover:text-red-600 transition"
                onClick={() => {
                  handleDeleteNote();
                }}
              >
                {isPending ? (
                  <LoaderIcon className="h-4 w-4" />
                ) : (
                  <Trash2 size={14} />
                )}
              </button>
            )}
          </div>

          {/* Note content */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
};
