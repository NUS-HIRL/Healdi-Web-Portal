interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  placeholder?: string;
}

export function TextInput({ label, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={props.name} className="mb-1 text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        id={props.name}
        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
        {...props}
      />
    </div>
  );
}








