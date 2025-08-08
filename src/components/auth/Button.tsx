interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-full py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition"
      {...props}
    >
      {children}
    </button>
  );
}