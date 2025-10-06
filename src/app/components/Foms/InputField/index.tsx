"use client";
import { useState } from "react";

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  type?: string;
  isMoney?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = ({
  label,
  placeholder,
  error,
  type = "text",
  isMoney = false,
  value: propValue,
  onChange,
  ...rest
}: InputFieldProps) => {
  const [internalValue, setInternalValue] = useState(propValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (isMoney) {
      val = val.replace(/[^0-9,]/g, "");

      const normalized = val.replace(",", ".");
      if (onChange) {
        onChange({ ...e, target: { ...e.target, value: normalized } });
      }
    } else {
      if (onChange) onChange(e);
    }

    setInternalValue(val);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-body">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        className="h-12 bg-grey-1 rounded-lg px-2"
        {...rest}
      />
      <span className="text-body text-negative">{error || " "}</span>
    </div>
  );
};

export default InputField;