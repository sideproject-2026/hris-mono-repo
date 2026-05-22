import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
};

export const useAuthStore = create<AuthStore>()(
  persist((set,get) => ({
    auth: initialState,
    setAuth: (auth) => {
      set({ auth });
      
    },
    getAuth: () => get().auth,
    clearAuth: () => set({ auth: initialState })
  }), 
  {
    name: 'portal-auth-storage',
    storage: createJSONStorage(() => localStorage),
  })
);


export const LocalStorageAuth = {
  get: () => {
    const auth = localStorage.getItem('portal-auth-storage');
    if (auth) {
      const response = JSON.parse(auth);
      return response.state.auth as AuthState;
    }
    return null;
  },
  set: (value: {state: {auth: AuthState}}) => {
    localStorage.setItem('auth-storage', JSON.stringify(value));
  },
  clear: () => {
    localStorage.removeItem('auth-storage');
  }

}


