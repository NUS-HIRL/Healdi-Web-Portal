"use client"

import Image from "next/image"
import { useForm, FormProvider } from "react-hook-form"
import { TextInput } from "@/components/auth/TextInput"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/auth"
import { useRouter } from "next/navigation"

type FormValues = {
  username: string
  password: string
  terms: boolean
}

// TODO: Kervyn: Remove the use of TextInput and PasswordInput
const SignUpPage = () => {
  const router = useRouter()

  const methods = useForm<FormValues>({
    defaultValues: { username: "", password: "", terms: false }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.username, data.password)
      router.push("/home")
    } catch (e) {
      console.error(e)
      // TODO: Kervyn: Create a proper alert
      alert("Username or Password is incorrect.")
    }
  }

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
          <h1 className="mt-2 text-2xl font-bold text-gray-800">
            Sign in to Healdi
          </h1>
        </div>

        <h2 className="text-sm text-gray-700 text-center">
          Not your device? Use a private or incognito window to sign in.
        </h2>

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

            <PasswordInput
              name="password"
              autoComplete="new-password"
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" }
              }}
            />

            <div className="flex items-center justify-between">
              <a
                href="/forgot-password"
                className="text-xs text-gray-500 hover:opacity-75">
                Forgot your password?
              </a>
            </div>

            <div className="flex justify-center">
              <Button className="w-full h-14 rounded-full  text-lg font-semibold">
                Sign In
              </Button>
            </div>
          </form>
        </FormProvider>

        <p className="text-center text-sm text-gray-600">
          <a href="/create-account">Create Account</a>
        </p>
        <p className="text-center text-xs text-gray-400">
          © Healdi. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
