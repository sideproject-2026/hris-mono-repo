import { ButtonLoading, InputField, Card, Form } from "@hris/shared-ui";
import { LockCircle, Send, TagUser } from "iconsax-reactjs";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ForgotPassword from "./forgot-password";
import { useLogin } from "../hooks/auth";


const Login = () => {
  const { loginForm, login: handleLogin, isPending, error } = useLogin();
  const [view, setView] = useState<"login" | "forgot-password">("login");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <div className="bg-black/20 absolute w-full h-screen"></div>
      <img src="/background.jpg" alt="background" className="w-full" />
      <Card className="flex flex-col items-center gap-2 absolute rounded-sm bg-background h-fit">
        <div key={view} className="w-full animate-auth-transition">
          {view === "login" && (
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="w-[430px] p-5 space-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="flex flex-col items-center justify-center">
                  <img src="/cwicon.png" alt="logo" className="w-20 h-auto" />
                  <span className="text-secondary font-sans text-center text-xl font-semibold mt-2">
                    Employee Portal
                  </span>
                </div>
                <p className="paragraph-sm font-sans text-center">
                  {" "}
                  Sign In to access your employee portal workspace.
                </p>
                <InputField
                  control={loginForm.control}
                  name="userName"
                  label=""
                  type="text"
                  placeholder="Username"
                  baseClassName="w-full"
                  icon={<TagUser size={24} variant={"Bold"} color="#A6A6A6" />}
                />
                <InputField
                  control={loginForm.control}
                  name="password"
                  label=""
                  type="password"
                  placeholder="Password"
                  baseClassName="w-full"
                  icon={
                    <LockCircle size={24} variant={"Bold"} color="#A6A6A6" />
                  }
                />
                <Link
                  className="text-secondary text-right text-sm block font-sans cursor-pointer hover:underline p-0"
                  onClick={() => setView("forgot-password")}
                >
                  Forgot your password?
                </Link>

                <ButtonLoading
                  type="submit"
                  className="w-full h-11 mt-5 font-sans"
                  text={"Sign In"}
                  textLoading="Signing in..."
                  loading={isPending}
                  icon={<Send size={24} variant={"Bold"} color="#ffffff" />}
                  onClick={loginForm.handleSubmit(handleLogin)}
                  variant="default"
                />

                <p className="text-red-400 text-sm text-left font-sans">
                  {error}
                </p>
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
