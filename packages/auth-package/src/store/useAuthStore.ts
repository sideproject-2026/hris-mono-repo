import { create } from "zustand";
import { AuthState } from "../types/auth-type";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  getAuth: () => AuthState;
  clearAuth: () => void;
}

const initialState: AuthState = {
  accessToken: null,
  expiresAt: null,
  expiresIn: null,
  isAuthenticated: false,
  refreshToken: null,
  error: null,
}



export const useAuthStore = create<AuthStore>()(
  persist((set, get) => ({
    auth: initialState,
    setAuth: (auth) => {
      set({ auth });
    },
    getAuth: () => get().auth,
    clearAuth: () => set({ auth: initialState })
  }),
    {
      name: 'auth-storage-key',
      storage: createJSONStorage(() => localStorage),
    })
);


export const LocalStorageAuth = {
  get: (key: string) => {
    const auth = localStorage.getItem(key);
    if (auth) {
      const response = JSON.parse(auth);
      return response.state.auth as AuthState;
    }
    return null;
  },
  set: (key: string, value: { authState: AuthState }) => {
    const state = { auth: value.authState };
    localStorage.setItem(key, JSON.stringify(state));
  },
  clear: (key: string) => {
    localStorage.removeItem(key);
  }
}
