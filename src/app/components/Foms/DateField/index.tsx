"use client";

import { forwardRef } from "react";

type DateFieldProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-body">{label}</label>}

        <input
          type="date"
          className="h-12 bg-grey-1 rounded-lg px-2"
          ref={ref}
          {...props}
        />

        <span className="text-body text-negative">{error || "\u00A0"}</span>
      </div>
    );
  }
);

DateField.displayName = "DateField";

export default DateField;