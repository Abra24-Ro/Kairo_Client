import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export const NotFoundView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
            <Search className="h-10 w-10 text-indigo-600" />
          </div>
        </div>

        <h1 className="select-none text-6xl font-bold text-gray-900 mb-4">
          404
        </h1>

        <h2 className="select-none text-2xl font-semibold text-gray-900 mb-2">
          Página no encontrada
        </h2>
        <p className="select-none text-sm text-gray-600 mb-8 max-w-sm mx-auto">
          La página que buscas no existe o fue movida a otra ubicación.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Ir al inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};
