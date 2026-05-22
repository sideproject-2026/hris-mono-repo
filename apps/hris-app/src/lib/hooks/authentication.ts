import { LocalStorageAuth } from "../stores/useAuthStore";


export const isAuthenticated = () => {
   const auth = LocalStorageAuth.get();
   return auth?.isAuthenticated || false;
}