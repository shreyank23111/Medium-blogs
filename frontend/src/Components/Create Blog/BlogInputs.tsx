import { ChangeEvent } from "react";

interface BlogInputsType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function BlogInputs({ label, placeholder, onChange }: BlogInputsType) {
  return (
    <div className="mb-4 w-full">
      <label className="block mb-2 text-lg text-black font-semibold pt-4">{label}</label>
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-500 rounded-md px-4 py-3 w-full focus:outline-none focus:border-blue-500 text-lg"
      />
    </div>
  );
}
