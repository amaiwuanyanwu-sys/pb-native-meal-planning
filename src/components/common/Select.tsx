import * as SelectPrimitive from '@radix-ui/react-select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SelectProps } from '../../types/nutrition';
import Avatar from './Avatar';

const Select = ({
  label,
  value,
  onChange,
  options,
  helpText,
  className = '',
  open,
  onOpenChange,
  showAvatar = true,
}: SelectProps) => {
  const selectedOption = options.find((opt) => opt.id === value);
  const hasValue = !!value;

  return (
    <div className={`relative ${className}`}>
      <SelectPrimitive.Root
        value={value || undefined}
        onValueChange={onChange}
        open={open}
        onOpenChange={onOpenChange}
      >
        <SelectPrimitive.Trigger
          className={`
            peer
            w-full h-10 px-3
            flex items-center justify-between gap-2
            text-sm font-medium
            border border-[#C1C9CB] rounded
            bg-white
            focus:outline-none focus:border-[#385459] focus:border-2
            data-[state=open]:border-[#96a5a8] data-[state=open]:border-2
            transition-colors
          `}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {selectedOption && (
              <>
                {showAvatar && (
                  <Avatar
                    imageUrl={selectedOption.avatarUrl}
                    name={selectedOption.name}
                    size="sm"
                  />
                )}
                <SelectPrimitive.Value className="text-[#244348] truncate" />
              </>
            )}
          </div>
          <SelectPrimitive.Icon className="flex-shrink-0">
            <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#385459' }} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <label
          className={`
            absolute left-3
            font-medium text-[#657A7E]
            pointer-events-none
            transition-all duration-200
            bg-white px-1
            font-[Inter]
            ${
              hasValue
                ? 'top-[-8px] text-[0.75rem] font-semibold text-[#385459]'
                : 'top-2 text-sm peer-focus:top-[-8px] peer-focus:text-[0.75rem] peer-focus:font-semibold peer-focus:text-[#385459] peer-data-[state=open]:top-[-8px] peer-data-[state=open]:text-[0.75rem] peer-data-[state=open]:font-semibold peer-data-[state=open]:text-[#385459]'
            }
          `}
        >
          {label}
        </label>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="
              bg-white border border-[#C1C9CB] rounded shadow-lg
              overflow-hidden
              z-50
            "
            position="popper"
            sideOffset={4}
            align="start"
            avoidCollisions={true}
            collisionPadding={8}
            style={{ width: 'var(--radix-select-trigger-width)' }}
          >
            <SelectPrimitive.Viewport className="p-1 max-h-60">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.id}
                  value={option.id}
                  className="
                    flex items-center gap-2 px-3 py-2
                    text-sm font-medium text-[#244348]
                    cursor-pointer rounded
                    outline-none
                    data-[highlighted]:bg-gray-100
                    data-[state=checked]:bg-gray-50
                  "
                >
                  <Avatar
                    imageUrl={option.avatarUrl}
                    name={option.name}
                    size="sm"
                  />
                  <SelectPrimitive.ItemText>{option.name}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {helpText && (
        <p className="text-xs font-medium text-[#657A7E] mt-1 px-3">{helpText}</p>
      )}
    </div>
  );
};

export default Select;
