import ButtonLoading from "@hris/shared-ui/buttons/button-loading";
import InputField from "@hris/shared-ui/inputs/InputField";
import { Card } from "@hris/shared-ui/card";
import { Form } from "@hris/shared-ui/form";
import { LockCircle, Send, TagUser } from "iconsax-reactjs";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import ForgotPassword from "./forgot-password";
import { useLogin, type AuthSchemaType } from "@cwmsi/auth-package";
import { getErrorMessage, showToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Login = () => {

   const { formAuth, handleLogin, isPending } = useLogin({
      baseUrl: import.meta.env.VITE_API_URL as string,
      storageKey: import.meta.env.VITE_AUTH_STORAGE_KEY as string,
   });
	const navigate = useNavigate();

   const onSubmit = (data: AuthSchemaType) => {
      handleLogin(data, {
         onSuccessCallback: () => {
            showToast("Login Successful", "success");
            navigate({ to: "/" });
         },
         onErrorCallback: (error: unknown) => {
            showToast("Login Failed", getErrorMessage(error));
         },
      });
   };

   const [view, setView] = useState<"login" | "forgot-password">("login");

   return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
         <div className="bg-black/20 absolute w-full h-screen"></div>
         <img src="/background.jpg" alt="background" className="w-full" />
         <Card className="flex flex-col items-center gap-2 absolute rounded-sm bg-background h-fit">
            <div key={view} className="w-full animate-auth-transition">
               {view === "login" && (
                  <Form {...formAuth}>
                     <form
                        onSubmit={formAuth.handleSubmit(onSubmit)}
                        className="w-[430px] p-5 space-y-2 transition-all duration-300 ease-in-out"
                     >
                        <div className="flex flex-col items-center justify-center">
                           <img
                              src="/cwicon.png"
                              alt="logo"
                              className="w-20 h-auto"
                           />
                           <span className="text-secondary font-sans text-center text-xl font-semibold mt-2">
                              Employee Portal
                           </span>
                        </div>
                        <p className="paragraph-sm font-sans text-center">
                           {" "}
                           Sign In to access your employee portal workspace.
                        </p>
                        <InputField
                           control={formAuth.control}
                           name="userName"
                           label=""
                           type="text"
                           placeholder="Username"
                           baseClassName="w-full"
                           icon={
                              <TagUser
                                 size={24}
                                 variant={"Bold"}
                                 color="#A6A6A6"
                              />
                           }
                        />
                        <InputField
                           control={formAuth.control}
                           name="password"
                           label=""
                           type="password"
                           placeholder="Password"
                           baseClassName="w-full"
                           icon={
                              <LockCircle
                                 size={24}
                                 variant={"Bold"}
                                 color="#A6A6A6"
                              />
                           }
                        />
                        <Button
									type="button"
									variant="outline"
                           className="text-secondary text-right text-sm block font-sans cursor-pointer hover:underline p-0"
                           onClick={() => setView("forgot-password")}
                        >
                           Forgot your password?
                        </Button>

                        <ButtonLoading
                           type="submit"
                           className="w-full h-11 mt-5 font-sans"
                           text={"Sign In"}
                           textLoading="Signing in..."
                           loading={isPending}
                           icon={
                              <Send
                                 size={24}
                                 variant={"Bold"}
                                 color="#ffffff"
                              />
                           }
                           onClick={formAuth.handleSubmit(onSubmit)}
                           variant="default"
                        />

                        {formAuth.formState.errors.root && (
                           <p className="text-red-400 text-sm text-left font-sans">
                              {formAuth.formState.errors.root.message}
                           </p>
                        )}
                     </form>
                  </Form>
               )}

               {view === "forgot-password" && (
                  <ForgotPassword onBack={() => setView("login")} />
               )}
            </div>
            <p className="paragraph-sm text-center font-sans absolute bottom-2">
               Crossworld Employee Portal v.2.0.0
            </p>
            <img
               src="/crossworld-line.png"
               alt="background"
               className="w-full h-1 rounded-b-sm bottom-0 absolute"
            />
         </Card>
      </div>
   );
};

export default Login;
