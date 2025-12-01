import { forwardRef } from 'react';
import { InputProps } from '../../types/nutrition';

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  value,
  onChange,
  placeholder: _placeholder,
  required = false,
  error,
  className = '',
  type = 'text',
  autoFocus = false,
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder=" "
        autoFocus={autoFocus}
        className={`
          peer
          w-full h-10 px-3
          text-sm font-medium text-[#244348]
          border rounded
          ${error ? 'border-red-500' : 'border-[#C1C9CB]'}
          focus:outline-none focus:border-[#96a5a8] focus:border-2
          transition-colors
        `}
      />
      <label
        className={`
          absolute left-3 top-2
          text-sm font-medium text-[#657A7E]
          pointer-events-none
          transition-all duration-200
          bg-white px-1
          peer-focus:top-[-8px] peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#385459]
          peer-[:not(:placeholder-shown)]:top-[-8px]
          peer-[:not(:placeholder-shown)]:text-xs
          peer-[:not(:placeholder-shown)]:font-semibold
          peer-[:not(:placeholder-shown)]:text-[#385459]
          ${error ? 'text-red-500 peer-focus:text-red-500' : ''}
        `}
      >
        {label}
        {required && <span className="text-[#244348]"> *</span>}
      </label>
      {error && (
        <p className="text-xs text-red-500 mt-1 px-3">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
