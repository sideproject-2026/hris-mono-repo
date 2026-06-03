import {createHttpClient} from "@cwmsi/auth-package";

export const {request} = createHttpClient({
   baseURL: import.meta.env.VITE_API_URL,
   storageKey: "auth-storage-key"
});

