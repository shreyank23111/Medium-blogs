import { ChangeEvent } from "react";

interface BlogInputsType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function BlogInputs({label, placeholder, onChange}: BlogInputsType) {
  return <div>
    <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
    <input type="text" onChange={onChange} placeholder={placeholder}
    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
    />
  </div>
}