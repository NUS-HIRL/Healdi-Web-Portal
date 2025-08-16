"use client";

import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { TextInput } from "@/components/auth/TextInput";
import { Button } from "@/components/auth/Button";

type FormValues = {
  username: string;
};

export default function SignUpPage() {
  const methods = useForm<FormValues>({
    mode: "onChange", 
    defaultValues: { username: "" },
  });

  const onSubmit = async (data: FormValues) => {
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src="/common/logo-healdi.svg"
              alt="Healdi logo"
              width={60}
              height={60}
            />
            <Image
              src="/common/Healdi.svg"
              alt="Healdi Name"
              width={80}
              height={60}
            />
          </div>
          <Image
            src="/auth/pw-forgot.svg"
            alt="Forgot Pw"
            width={150}
            height={150}
          />
          <h1 className="mt-2 text-2xl font-bold text-gray-800">
            Forgot Password
          </h1>
        </div>

        <h2 className="text-sm font-small text-gray-700 text-center">
          To continue, enter your username.
        </h2>

        {/* RHF wiring */}
        <FormProvider {...methods}>
          <form
            className="space-y-4"
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
          >
            <TextInput
              name="username"
              placeholder="Username"
              autoComplete="username"
              rules={{ required: "Username is required" }}
            />

            <Button disableWhileSubmitting disableWhenInvalid>
              Continue
            </Button>
          </form>
        </FormProvider>

        <p className="text-center text-sm text-gray-600">
          <a href="/login">Back to login</a>
        </p>

        <p className="text-center text-xs text-gray-400">
          © Healdi. All rights reserved.
        </p>
      </div>
    </div>
  );
}
