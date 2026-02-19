import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProjectForm } from "@/components/UI/projects/ProjectForm";
import type { ProjectFormData } from "@/types";
import { createProject } from "@/api/ProjectApi";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/UI/projects/PageHeader";

export const CreateProjectView = () => {
  const navigate = useNavigate();

  const initialValue: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message || "Error al crear el proyecto");
    },
    onSuccess: () => {
      toast.success("Proyecto creado exitosamente");
      navigate("/");
    },
  });

  const handleForm = (data: ProjectFormData) => mutate(data);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Encabezado */}
      <PageHeader
        title="Crear nuevo proyecto"
        description="Define la información básica para comenzar a trabajar en tu proyecto."
        backTo="/"
        backLabel="← Volver a proyectos"
      />

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
      >
        <ProjectForm register={register} errors={errors} />

        {/* Acciones */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="
              cursor-pointer
              inline-flex items-center justify-center
              px-5 py-2.5 rounded-md text-sm font-medium
              bg-indigo-600 text-white
              hover:bg-indigo-500
              disabled:bg-indigo-400 disabled:cursor-not-allowed
              transition
            "
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            {isPending ? "Creando proyecto..." : "Crear proyecto"}
          </button>
        </div>
      </form>
    </div>
  );
};
