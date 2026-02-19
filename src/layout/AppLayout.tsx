import { Navigate, Outlet } from "react-router-dom";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/UI/Loader";

export const AppLayout = () => {
  const { data, isLoading, isError } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // Auth error or not logged in
  if (isError || !data) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <div className="h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};