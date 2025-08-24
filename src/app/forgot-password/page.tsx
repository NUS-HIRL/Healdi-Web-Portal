"use client"

import Image from "next/image"
import { useForm, FormProvider } from "react-hook-form"
import { TextInput } from "@/components/auth/TextInput"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Username = string

type FormValues = {
  username: Username
}

export default function SignUpPage() {
  const methods = useForm<FormValues>({
    defaultValues: { username: "" as Username }
  })

  // TODO: Sai: Add data: FormValues when integrating form submission through API
  const onSubmit = async () => {}

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
            noValidate>
            <TextInput
              name="username"
              placeholder="Username"
              autoComplete="username"
              rules={{ required: "Username is required" }}
            />

            <div className="flex justify-center">
              <Button className="w-full h-14 rounded-full  text-lg font-semibold">
                Continue
              </Button>
            </div>
          </form>
        </FormProvider>

        <p className="text-center text-sm text-gray-600">
          <Link href="/login" className="hover:opacity-75">
            Back to login
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400">
          © Healdi. All rights reserved.
        </p>
      </div>
    </div>
  )
}
