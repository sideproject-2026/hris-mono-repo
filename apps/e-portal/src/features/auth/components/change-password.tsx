import { type ResetPasswordSchemaType } from "../types/schema";
import { Form } from "@/components/ui/form";
import ButtonLoading from "@/components/buttons/button-loading";
import { Send, LockCircle, ArrowLeft, TickCircle, Key } from "iconsax-reactjs";
import InputFields from "@/components/form-components/input-fields";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "../hooks/auth";
import { useEffect, useState } from "react";

interface ChangePasswordProps {
  onBack: () => void;
  onSuccess: () => void;
  userName: string;
}

const ChangePassword = ({
  onBack,
  onSuccess,
  userName,
}: ChangePasswordProps) => {
  const [view, setView] = useState<
    "change-password" | "password-reset-success"
  >("change-password");
  const { resetPassword, isPending, resetForm, error } = useResetPassword(() =>
    setView("password-reset-success"),
  );

  useEffect(() => {
    if (userName) {
      resetForm.setValue("userName", userName);
    }
  }, [userName, resetForm]);

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    await resetPassword(data);
  };
  return (
    <div key={view} className="w-full animate-auth-transition">
      {view === "change-password" ? (
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(onSubmit)}
            className="w-[430px] p-5 space-y-2 transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-secondary font-sans text-center text-xl font-semibold">
                Change your password
              </span>
            </div>
            <p className="paragraph-sm font-sans text-center">
              {" "}
              Please enter the code sent to your email address.
            </p>
            <InputFields
              control={resetForm.control}
              name="code"
              label=""
              type="text"
              placeholder="Enter code"
              icon={<Key size={24} variant={"Bold"} color="#A6A6A6" />}
            />
            <InputFields
              control={resetForm.control}
              name="newPassword"
              label=""
              type="password"
              placeholder="New Password"
              icon={<LockCircle size={24} variant={"Bold"} color="#A6A6A6" />}
            />
            <InputFields
              control={resetForm.control}
              name="newPasswordConfirmation"
              label=""
              type="password"
              placeholder="Confirm Password"
              icon={<LockCircle size={24} variant={"Bold"} color="#A6A6A6" />}
            />

            <ButtonLoading
              type="submit"
              className="w-full h-11 mt-5 font-sans"
              text={"Change Password"}
              textLoading="Please wait..."
              loading={isPending}
              icon={<Send size={24} variant={"Bold"} color="#ffffff" />}
            />

            {error && (
              <p className="text-red-500 text-xs font-sans text-center mt-2">
                {error}
              </p>
            )}

            <Button
              type="button"
              variant={"ghost"}
              onClick={onBack}
              className="w-full text-secondary text-sm font-sans flex items-center justify-center gap-2 mt-2 hover:underline"
            >
              <ArrowLeft size={16} /> Back
            </Button>
          </form>
        </Form>
      ) : (
        <PasswordResetSuccessfully onSuccess={onSuccess} />
      )}
    </div>
  );
};

export default ChangePassword;

const PasswordResetSuccessfully = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  return (
    <div className="w-[430px] p-8 flex flex-col items-center justify-center space-y-4 transition-all duration-300 ease-in-out">
      <div className="bg-green-100 p-4 rounded-full">
        <TickCircle size={48} variant="Bold" className="text-green-600" />
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-secondary font-sans text-center text-xl font-semibold">
          Password Reset Successfully!
        </span>
        <p className="paragraph-sm font-sans text-center text-gray-500">
          Your password has been reset successfully. You can now login with your
          new password.
        </p>
      </div>
      <Button
        type="button"
        variant={"default"}
        onClick={onSuccess}
        className="w-full h-11 text-white font-sans flex items-center justify-center gap-2 mt-4"
      >
        Back to Login
      </Button>
    </div>
  );
};
