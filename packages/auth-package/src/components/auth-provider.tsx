import { createContext, useContext } from "react";
import type { FC } from "react";
import type { AuthState, UserType } from "../types/auth-type";
import { LocalStorageAuth } from "../store/useAuthStore";

type AuthContextType = {
   isAuthorized?: (requiredRoles: string[], user: UserType) => boolean;
   isAuthenticated?: boolean | undefined;
   auth: AuthState | null;
   clearAuth?: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode, storageKey: string }> = ({
   storageKey,
   children,
}) => {

   const auth = LocalStorageAuth.get(storageKey);
   //const accessToken = auth?.accessToken || "";

   const isAuthorized = (requiredRoles: string[], user: UserType) => {
      if (!user) return false;
      return requiredRoles.some((role) => user.roles.includes(role));
   };

   const isAuthenticated = auth?.isAuthenticated && !!auth?.accessToken;

   const clearAuth = () => LocalStorageAuth.clear(storageKey);

   const contextValue: AuthContextType = {
      isAuthorized,
      isAuthenticated,
      auth: auth || null,
      clearAuth,
   };

   return (
      <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuthContext = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuthContext must be used within a AuthProvider");
   }
   return context;
};
