import { ButtonProps } from '../../types/nutrition';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  id = ""
}: ButtonProps) => {
  const baseClasses = 'rounded font-semibold transition-colors duration-200 flex items-center gap-1';

  const variantClasses = {
    primary: disabled
      ? 'bg-[#C1C9CB] text-white cursor-not-allowed'
      : 'bg-[#01272E] text-white hover:bg-[#244348] active:bg-[#01272E]',
    secondary: disabled
      ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
      : 'bg-white text-[#01272E] border border-slate-500 hover:bg-gray-50',
    ghost: disabled
      ? 'bg-transparent text-gray-400 cursor-not-allowed'
      : 'bg-transparent text-[#385459] hover:bg-gray-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm h-[30px]',
    md: 'px-4 py-2 text-sm h-[36px]',
    lg: 'px-6 py-2.5 text-sm h-[40px]',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} flex items-center justify-center`}
    >
      {icon && iconPosition === 'left' && <span className="flex items-center">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex items-center">{icon}</span>}
    </button>
  );
};

export default Button;
