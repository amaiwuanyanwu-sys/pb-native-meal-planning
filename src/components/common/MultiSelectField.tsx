import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

interface MultiSelectFieldProps {
  value: string[];
  onChange: (newValue: string[]) => void;
  options: string[];
  label: string;
  placeholder?: string;
  freeSolo?: boolean;
  renderOption?: (props: any, option: string) => React.ReactNode;
  ListboxComponent?: React.ComponentType<any>;
  filterOptions?: (options: string[], state: any) => string[];
  getOptionDisabled?: (option: string) => boolean;
  inputValue?: string;
  onInputChange?: (event: React.SyntheticEvent, value: string) => void;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onDone?: () => void;
  onReset?: () => void;
}

const MultiSelectField = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  freeSolo = false,
  renderOption,
  ListboxComponent,
  filterOptions,
  getOptionDisabled,
  inputValue,
  onInputChange,
  open,
  onOpen,
  onClose,
  onDone,
  onReset,
}: MultiSelectFieldProps) => {

  // Default render option with checkbox
  const defaultRenderOption = (props: any, option: string) => {
    const isSelected = value.includes(option);

    return (
      <li
        {...props}
        className="px-2 py-2 text-sm font-medium text-[#385459] hover:bg-[#F8F9F9] cursor-pointer flex items-center gap-2"
        style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}
      >
        <Checkbox
          checked={isSelected}
          size="small"
          sx={{
            padding: 0,
            color: '#C1C9CB',
            fontFamily: 'Inter',
            '&.Mui-checked': {
              color: '#385459',
            },
          }}
        />
        <span className="flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>{option}</span>
      </li>
    );
  };

  // Wrapper for ListboxComponent to add footer
  const ListboxWithFooter = (props: any) => {
    const { children, ...other } = props;
    const CustomListbox = ListboxComponent || 'ul';

    return (
      <div>
        <CustomListbox {...other}>{children}</CustomListbox>
        <div
          style={{
            padding: '4px 8px',
            borderTop: '1px solid #DFE3E4',
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
            backgroundColor: 'white',
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onReset?.();
            }}
            sx={{
              fontFamily: 'Inter',
              textTransform: 'none',
              fontSize: '0.875rem',
              color: '#385459',
              borderColor: '#C1C9CB',
              '&:hover': {
                borderColor: '#385459',
                backgroundColor: '#F8F9F9',
              },
            }}
          >
            Reset
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              onDone?.();
            }}
            sx={{
              fontFamily: 'Inter',
              textTransform: 'none',
              fontSize: '0.875rem',
              backgroundColor: '#244348',
              '&:hover': {
                backgroundColor: '#385459',
              },
            }}
          >
            Done
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Autocomplete
      multiple
      freeSolo={freeSolo}
      size="small"
      disableCloseOnSelect
      disablePortal={false}
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue as string[])}
      inputValue={inputValue}
      onInputChange={onInputChange}
      getOptionDisabled={getOptionDisabled}
      filterOptions={filterOptions}
      ListboxComponent={ListboxWithFooter}
      renderOption={renderOption || defaultRenderOption}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            label={option}
            size="small"
            sx={{
              backgroundColor: '#244348',
              color: 'white',
              fontSize: '0.75rem',
              fontFamily: 'Inter',
              height: '24px',
              '& .MuiChip-label': {
                fontFamily: 'Inter',
              },
              '& .MuiChip-deleteIcon': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: 'white',
                },
              },
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={value.length === 0 ? placeholder : ''}
          sx={{
            '& .MuiOutlinedInput-root.MuiInputBase-root': {
              fontSize: '14px !important',
              fontFamily: 'Inter',
              padding: '6px 8px',
              '& fieldset': {
                borderColor: '#C1C9CB',
              },
              '&:hover fieldset': {
                borderColor: '#385459',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#385459',
                borderWidth: '2px',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 6px',
              fontFamily: 'Inter',
              fontWeight: 500,
              '&::placeholder': {
                color: '#657A7E',
                opacity: 1,
                fontWeight: 500,
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px !important',
              fontFamily: 'Inter',
              color: '#657A7E',
              fontWeight: 500,
              '&.Mui-focused': {
                color: '#385459',
              },
            },
            '& .MuiInputLabel-shrink': {
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'Inter',
            },
          }}
        />
      )}
      sx={{
        '& .MuiAutocomplete-popupIndicator': {
          color: '#657A7E',
        },
        '& .MuiAutocomplete-clearIndicator': {
          display: 'none',
        },
      }}
      slotProps={{
        paper: {
          sx: {
            border: '1px solid #DFE3E4',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '& .MuiAutocomplete-listbox': {
              padding: 0,
            },
          },
        },
        popper: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 8,
                altAxis: true,
                tether: true,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'bottom'],
              },
            },
          ],
          sx: {
            maxHeight: 'calc(100vh - 16px)',
          },
        } as any,
        listbox: {
          sx: {
            maxHeight: '300px',
            overflowY: 'auto',
          },
        },
      }}
    />
  );
};

export default MultiSelectField;
