import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* Icono animado */}
        <div className="p-4 bg-white rounded-full shadow-sm border border-gray-200">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>

        {/* Texto */}
        <p className="text-sm text-gray-500">
          Cargando contenido…
        </p>
      </div>
    </div>
  );
};
