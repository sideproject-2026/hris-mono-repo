import { request } from "@/lib/http";
import { CROSSWORLD_IMAGE_URL } from "@/types/constant";
import {useAuthContext} from "@cwmsi/auth-package"
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext, type FC } from "react";


type UserContextType = {
   profile: UserProfileType | null;
   getPhotoUrl?: () => string | undefined;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
   
   const { auth } = useAuthContext();

   const {data: userProfile} = useSuspenseQuery({
      queryKey: ["user-profile",auth?.accessToken],
      queryFn: async () => {
         const response = await request.get<ApiResponse<UserProfileType>>('/users')
         const data = response.data
         return data
      },
   })

   const getPhotoUrl = useCallback(() => {
      return userProfile?.photo ? `${CROSSWORLD_IMAGE_URL}/${userProfile?.photo}` : "";
   }, [userProfile]);
   

   return (
      <UserContext.Provider value={{ profile: userProfile, getPhotoUrl }} >
         {children}
      </UserContext.Provider>
   )

}

export const useUserContext = () => {
   const context =  useContext(UserContext);
   if (context === undefined) {
      throw new Error("useUserContext must be used within a UserProvider");
   }
   return context;
}

export default UserProvider;


