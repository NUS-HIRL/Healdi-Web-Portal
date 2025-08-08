import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

export function PasswordInput({ label, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative flex flex-col">
      {label && (
        <label htmlFor={props.name} className="mb-1 text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        id={props.name}
        type={visible ? 'text' : 'password'}
        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}