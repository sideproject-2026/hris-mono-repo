import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ButtonLoading from "@/components/buttons/button-loading";
import { Send, TagUser, ArrowLeft } from "iconsax-reactjs";
import InputFields from "@/components/form-components/input-fields";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "../hooks/auth";
import { showToast } from "@/lib/utils";
import ChangePassword from "./change-password";

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
  const [view, setView] = useState<"forgot-password" | "change-password">(
    "forgot-password",
  );

  const [error, setError] = useState<string | null>(null);
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      userName: "",
    },
  });

  const { mutateAsync, isPending } = useForgotPassword();

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    try {
      setError(null);
      await mutateAsync(data);
      setView("change-password");
    } catch (error) {
      setError("User Not Found!");
      showToast("User Not Found!", "error");
    }
  };

  return (
    <>
      {view === "forgot-password" && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[430px] p-5 space-y-2 transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-secondary font-sans text-center text-xl font-semibold">
                Forgot Password?
              </span>
            </div>
            <p className="paragraph-sm font-sans text-center">
              {" "}
              Please enter your username to reset your password.
            </p>
            <InputFields
              control={form.control}
              name="userName"
              label=""
              type="text"
              placeholder="Username"
              icon={<TagUser size={24} variant={"Bold"} color="#A6A6A6" />}
            />
            {error && (
              <p className="text-red-500 text-xs font-sans mt-2">{error}</p>
            )}

            <ButtonLoading
              type="submit"
              className="w-full h-11 mt-5 font-sans"
              text={"Reset Password"}
              textLoading="Resetting..."
              loading={isPending}
              icon={<Send size={24} variant={"Bold"} color="#ffffff" />}
            />

            <Button
              type="button"
              variant={"ghost"}
              onClick={onBack}
              className="w-full text-secondary text-sm font-sans flex items-center justify-center gap-2 mt-2 hover:underline"
            >
              <ArrowLeft size={16} /> Back to Login
            </Button>
          </form>
        </Form>
      )}
      {view === "change-password" && (
        <ChangePassword
          onBack={() => setView("forgot-password")}
          onSuccess={onBack}
          userName={form.getValues("userName")}
        />
      )}
    </>
  );
};

export default ForgotPassword;
