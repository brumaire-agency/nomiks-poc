'use client'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text'|'number';
  value: string | number | undefined;
  suffixText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
  
export const Input = ({
  label,
  type = "text",
  value = '',
  suffixText,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div>
      {label && <label className="block text-xs font-medium leading-6 text-gray-900">{label}</label>}
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className={`flex block w-full rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 ${props.disabled && 'bg-gray-200 text-gray-400'}`}>
          <input 
            type={type}
            value={value}
            className="flex-1 placeholder:text-gray-400 focus:outline-0 disabled:bg-transparent"
            onChange={onChange}
            {...props}
          />
          <span>{suffixText}</span>
        </div>
      </div>
    </div>
  )
}