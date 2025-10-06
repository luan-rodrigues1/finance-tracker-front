type SelectFieldProps = {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = ({ label, options, error, ...rest }: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-body">{label}</label>}
      <select className="h-12 bg-grey-1 rounded-lg px-2" {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="text-body text-negative">{error || " "}</span>
    </div>
  );
};

export default SelectField;