"use client"
import { TextInput } from '@/components/auth/TextInput'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { Checkbox } from '@/components/auth/Checkbox'
import { Button } from '@/components/auth/Button'
import Image from 'next/image'

export default function SignUpPage() {
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
          <h1 className="mt-2 text-2xl font-bold text-gray-800">Sign in to Healdi</h1>
        </div>

        <h2 className="text-sm font-small text-gray-700 text-center">Not your device? Use a private or incognito window to sign in.</h2>

        {/* Form */}
        <form className="space-y-4">
          <TextInput name="username" placeholder="Username" />
          <PasswordInput name="password" placeholder="Password" />

          <div className="flex items-center justify-between">
            <Checkbox name="terms" label="Remember Me" />
            <a href="/forgot-password" className="text-xs  text-gray-500 hover:opacity-75">
              Forgot your password?
            </a>
          </div>

          <Button type="submit">Sign Up</Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          <a href="/create-account" >
            Create Account
          </a>
        </p>

        <p className="text-center text-xs text-gray-400">© Healdi. All rights reserved.</p>
      </div>
    </div>
  )
}