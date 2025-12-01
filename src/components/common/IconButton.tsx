import * as Tooltip from '@radix-ui/react-tooltip';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tooltip: string;
  disabled?: boolean;
  className?: string;
}

const IconButton = ({
  icon,
  onClick,
  variant = 'ghost',
  size = 'md',
  tooltip,
  disabled = false,
  className = '',
}: IconButtonProps) => {
  const baseClasses = 'rounded transition-colors duration-200 flex items-center justify-center shrink-0';

  const variantClasses = {
    primary: disabled
      ? 'bg-[#C1C9CB] text-white cursor-not-allowed'
      : 'bg-[#01272E] text-white hover:bg-[#244348] active:bg-[#01272E]',
    secondary: disabled
      ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
      : 'bg-white text-[#01272E] border border-slate-500 hover:bg-gray-50',
    ghost: disabled
      ? 'bg-transparent text-gray-400 cursor-not-allowed'
      : 'bg-transparent text-[#385459] hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'w-[30px] h-[30px]',
    md: 'w-[36px] h-[36px]',
    lg: 'w-[40px] h-[40px]',
  };

  const handleClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
          >
            {icon}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="px-2 py-1 bg-[#01272E] text-white text-xs rounded whitespace-nowrap z-[9999]"
            sideOffset={5}
          >
            {tooltip}
            <Tooltip.Arrow className="fill-[#01272E]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default IconButton;
