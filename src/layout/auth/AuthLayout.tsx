import { Footer } from "@/components/layouts/Footer";
import { Logo } from "@/components/layouts/Logo";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 via-white to-gray-100">
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <Logo size="xl" />

            <p className="text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed">
              Plataforma inteligente para organizar, gestionar y escalar tus
              proyectos de forma simple y eficiente.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            className="
              bg-white
              rounded-2xl
              border border-gray-200/70
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              px-6 sm:px-8 py-7 sm:py-8
              backdrop-blur-sm
            "
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
