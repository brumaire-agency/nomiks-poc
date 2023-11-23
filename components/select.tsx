'use client'

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  selectedValue?: string | number;
  options: OptionProps[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface OptionProps {
  value: string|number;
  label: string;
}
  
export const Select = ({
  selectedValue,
  options,
  onChange,
  ...props
}: SelectProps) => {
  return (
  <select 
    {...props}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    value={selectedValue}
    onChange={onChange}
  >
    {options.map(option => (
      <option 
        key={option.value}
        value={option.value}
      >
        {option.label}
      </option>
    ))}
  </select>
  )
}