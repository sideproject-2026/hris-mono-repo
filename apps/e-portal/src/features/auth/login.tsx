import ButtonLoading from "@/components/buttons/button-loading";
import InputFields from "@/components/form-components/input-fields";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/features/auth/hooks/auth";
import { LockCircle, TagUser } from "iconsax-reactjs";

const Login = () => {
  
  const { loginForm, login: handleLogin, isPending, error } = useLogin();
  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <div className="bg-black/20 absolute w-full h-screen"></div>
      <img src="/background.jpg" alt="background" className="w-full" />
      <Card className="w-full xl:w-[440px] lg:w-[440px] md:w-[520px] sm:w-[440px] flex flex-col items-center gap-2 absolute rounded-lg bg-background h-fit">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            className="w-full p-5 space-y-2"
          >
            <div className="flex flex-col items-center justify-center">
              <img src="/logo.png" alt="logo" className="w-[60%] pb-3" />
              <span className="text-secondary font-sans text-center text-lg font-bold">CROSSWORLD EMPLOYEE PORTAL</span>
            </div>
            <p className="paragraph-sm font-sans"> Please login your credential to continue.</p>
            <InputFields
              control={loginForm.control}
              name="userName"
              label=""
              type="text"
              placeholder="Username"
              icon={<TagUser size={24} variant={'Bold'} color="#A6A6A6" />}
            />
            <InputFields
              control={loginForm.control}
              name="password"
              label=""
              type="password"
              placeholder="Password"
              icon={<LockCircle size={24} variant={'Bold'} color="#A6A6A6" />}
            />
            <p className="text-red-400 text-xs text-left">{error}</p>
            <ButtonLoading className="w-full h-11" text={'Login'} textLoading="Logging in..." loading={isPending} onClick={loginForm.handleSubmit(handleLogin)} />
          </form>
        </Form>
        <p className="paragraph-sm text-center font-sans">Crossworld Employee Portal v.2.0.0</p>
        <img src="/crossworld-line.png" alt="background" className="w-full h-1 rounded-b-lg bottom-0 absolute" />
      </Card>
    </div>
  );
};

export default Login;
