import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check authentication after component mounts
    const checkAuth = () => {
      try {
        const auth = isAuthenticated();
        setIsAuth(auth);
      } catch (error) {
        console.warn('Authentication check failed:', error);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure localStorage is available
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من المصادقة...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}