'use client';
import { useFormStatus } from 'react-dom';

function Button({ children, pendingText, ...rest }) {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? pendingText : children}
    </button>
  );
}

export default Button;
