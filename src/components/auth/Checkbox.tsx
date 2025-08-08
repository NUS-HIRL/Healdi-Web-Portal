interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2 text-sm text-gray-600">
      <input
        id={props.name}
        type="checkbox"
        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}