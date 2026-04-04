// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

// const ProtectedRoute = ({ children }: any) => {
//   const { isAuthenticated, loading } = useAuth();

//   // ⛔ Wait until auth check completes
//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   // 🔐 Not logged in
//   if (!isAuthenticated) {
//     return <Navigate to="/auth" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;





import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;