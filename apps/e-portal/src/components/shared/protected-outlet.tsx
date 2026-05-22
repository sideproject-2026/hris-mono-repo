import { useAuthContext } from "@cwmsi/auth-package";
import { Navigate, Outlet } from "@tanstack/react-router";



const ProtectedOutlet = () => {
   const { isAuthenticated } = useAuthContext();

   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }
   return <Outlet />;
};

export default ProtectedOutlet;
