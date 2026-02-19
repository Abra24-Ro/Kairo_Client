import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left - Copyright */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">
              © {currentYear} Kairo
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="hidden sm:inline text-xs text-gray-500">
              Todos los derechos reservados
            </span>
          </div>

          {/* Right - Tagline */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Hecho con</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span>para equipos enfocados</span>
          </div>
        </div>
      </div>
    </footer>
  );
};