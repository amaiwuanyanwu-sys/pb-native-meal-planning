import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface Tab {
  id: string;
  label: string;
}

interface TabControlPanelProps<T extends string = string> {
  tabs: Tab[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

const TabControlPanel = <T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
}: TabControlPanelProps<T>) => {
  const hasSearch = searchValue !== undefined && onSearchChange !== undefined;

  return (
    <div className="flex items-center justify-between w-full gap-4">
      {/* Tabs Section */}
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as T)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-[#01272E] border-b-2 border-[#01272E]'
                : 'text-[#657A7E] hover:text-[#385459]'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Section (Optional) */}
      {hasSearch && (
        <div className="w-80">
          <TextField
            fullWidth
            size="small"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#657A7E', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '14px',
                fontFamily: 'Inter',
                fontWeight: 500,
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: '#DFE3E4',
                },
                '&:hover fieldset': {
                  borderColor: '#96A5A8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#385459',
                  borderWidth: '2px',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '12px 14px',
                fontFamily: 'Inter',
                '&::placeholder': {
                  color: '#96A5A8',
                  opacity: 1,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TabControlPanel;
