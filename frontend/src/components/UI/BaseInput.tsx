import { InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function BaseInput({ label, ...inputProps }: CustomInputProps) {
  return (
    <div className="w-full">
      <h1 className="pb-1 pl-4 font-medium">{label}</h1>
      <input
        {...inputProps}
        className={
          'w-full rounded-3xl border border-solid border-gray-200 bg-white px-5 py-3 ring-primary-600 transition placeholder:text-sm placeholder:text-gray-600 focus:ring-2 '
        }
      />
    </div>
  );
}