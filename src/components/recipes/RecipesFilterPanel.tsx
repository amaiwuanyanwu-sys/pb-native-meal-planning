import { useState, useEffect, useRef } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '../common/IconButton';
import CollapsibleRailHeader from '../common/CollapsibleRailHeader';
import { FOOD_EXCLUSIONS } from '../../constants/foodExclusions';

interface FilterCategory {
  id: string;
  name: string;
  count: number;
  appliedCount: number;
  tags: FilterTag[];
  isExpanded: boolean;
}

interface FilterTag {
  id: string;
  label: string;
  applied: boolean;
  conflicted?: boolean;
}

interface RecipesFilterPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onFilterChange?: (filters: Record<string, string[]>) => void;
}

// Common exclusion groups to show as cards
const COMMON_EXCLUSION_GROUPS = [
  'Tree Nuts',
  'Dairy',
  'Eggs',
  'Wheat',
  'Shellfish',
  'Fish',
  'Soy',
  'Pork'
];

// Helper Functions for Group/Item Management

// Get all individual items that belong to a group
const getItemsInGroup = (groupName: string): string[] => {
  const group = FOOD_EXCLUSIONS.find(f => f.name === groupName && f.isGroup);
  if (!group) return [];

  return FOOD_EXCLUSIONS
    .filter(f => !f.isGroup && f.tags.some(tag => group.tags.includes(tag)))
    .map(f => f.name);
};

// Check if an item should be disabled (its parent group is selected)
const isItemDisabledByGroup = (itemName: string, selectedExclusions: string[]): boolean => {
  const item = FOOD_EXCLUSIONS.find(f => f.name === itemName);
  if (!item || item.isGroup) return false;

  // Check if any selected group contains this item
  return selectedExclusions.some(selected => {
    const selectedFood = FOOD_EXCLUSIONS.find(f => f.name === selected);
    if (!selectedFood?.isGroup) return false;

    // An item belongs to a group if it has ALL of the group's specific tags
    const groupSpecificTags = selectedFood.tags.filter(tag =>
      tag !== 'Allergens' && tag !== 'Proteins' && tag !== 'Grains & Starches' &&
      tag !== 'Vegetables' && tag !== 'Fruits' && tag !== 'Legumes' && tag !== 'Other'
    );

    if (groupSpecificTags.length > 0) {
      return groupSpecificTags.every(tag => item.tags.includes(tag));
    }

    return item.tags.some(tag => selectedFood.tags.includes(tag) && tag !== 'Allergens');
  });
};

const RecipesFilterPanel = ({ isCollapsed, onToggleCollapse, onFilterChange: _onFilterChange }: RecipesFilterPanelProps) => {
  const [selectedExclusions, setSelectedExclusions] = useState<string[]>([]);
  const [isExclusionsExpanded, setIsExclusionsExpanded] = useState(true);
  const [isEditingExclusions, setIsEditingExclusions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [exclusionSearchInput, setExclusionSearchInput] = useState('');
  const multiSelectRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close multiselect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditingExclusions && multiSelectRef.current && !multiSelectRef.current.contains(event.target as Node)) {
        setIsEditingExclusions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingExclusions]);

  const [categories, setCategories] = useState<FilterCategory[]>([
    {
      id: 'meal-type',
      name: 'Meal type',
      count: 4,
      appliedCount: 0,
      isExpanded: true,
      tags: [
        { id: 'breakfast', label: 'Breakfast', applied: false },
        { id: 'lunch', label: 'Lunch', applied: false },
        { id: 'dinner', label: 'Dinner', applied: false },
        { id: 'snack', label: 'Snack', applied: false },
      ],
    },
    {
      id: 'diet',
      name: 'Diet',
      count: 10,
      appliedCount: 0,
      isExpanded: true,
      tags: [
        { id: 'vegan', label: 'Vegan', applied: false },
        { id: 'vegetarian', label: 'Vegetarian', applied: false },
        { id: 'gluten-free', label: 'Gluten-Free', applied: false },
        { id: 'dairy-free', label: 'Dairy-free', applied: false },
        { id: 'paleo', label: 'Paleo', applied: false },
        { id: 'keto', label: 'Keto', applied: false },
        { id: 'low-carb', label: 'Low carb', applied: false },
        { id: 'high-fiber', label: 'High fiber', applied: false },
        { id: 'high-protein', label: 'High protein', applied: false },
        { id: 'low-fodmap', label: 'Low fodmap', applied: false },
      ],
    },
    {
      id: 'cuisine',
      name: 'Cuisine',
      count: 9,
      appliedCount: 0,
      isExpanded: true,
      tags: [
        { id: 'mediterranean', label: 'Mediterranean', applied: false },
        { id: 'chinese', label: 'Chinese', applied: false },
        { id: 'thai', label: 'Thai', applied: false },
        { id: 'italian', label: 'Italian', applied: false },
        { id: 'mexican', label: 'Mexican', applied: false },
        { id: 'middle-eastern', label: 'Middle Eastern', applied: false },
        { id: 'ethiopian', label: 'Ethiopian', applied: false },
        { id: 'indian', label: 'Indian', applied: false },
        { id: 'north-american', label: 'North American', applied: false },
      ],
    },
    {
      id: 'skill-level',
      name: 'Skill level',
      count: 3,
      appliedCount: 0,
      isExpanded: true,
      tags: [
        { id: 'simple', label: 'Simple', applied: false },
        { id: 'intermediate', label: 'Intermediate', applied: false },
        { id: 'advanced', label: 'Advanced', applied: false },
      ],
    },
    {
      id: 'cooking-appliance',
      name: 'Cooking appliance',
      count: 6,
      appliedCount: 0,
      isExpanded: true,
      tags: [
        { id: 'oven', label: 'Oven', applied: false },
        { id: 'stovetop', label: 'Stovetop', applied: false },
        { id: 'slow-cooker', label: 'Slow cooker', applied: false },
        { id: 'instant-pot', label: 'Instant Pot', applied: false },
        { id: 'air-fryer', label: 'Air fryer', applied: false },
        { id: 'no-cook', label: 'No cook', applied: false },
      ],
    },
  ]);

  const totalApplied = categories.reduce((sum, cat) => sum + cat.appliedCount, 0);

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
      )
    );
  };

  const toggleTag = (categoryId: string, tagId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          const updatedTags = cat.tags.map((tag) =>
            tag.id === tagId ? { ...tag, applied: !tag.applied } : tag
          );
          const appliedCount = updatedTags.filter((tag) => tag.applied).length;
          return { ...cat, tags: updatedTags, appliedCount };
        }
        return cat;
      })
    );
  };

  const clearAllFilters = () => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        appliedCount: 0,
        tags: cat.tags.map((tag) => ({ ...tag, applied: false })),
      }))
    );
    setSelectedExclusions([]);
  };

  if (isCollapsed) {
    const totalFiltersActive = selectedExclusions.length + totalApplied;

    return (
      <div className="w-[52px] h-full bg-white border-l border-[#C1C9CB] flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
        {/* Header with Expand Button */}
        <CollapsibleRailHeader
          isExpanded={!isCollapsed}
          onToggle={onToggleCollapse}
          side="right"
        />

        {/* Filter Icon with Badge */}
        <div className="flex-1 flex flex-col items-center justify-start pt-6 gap-2">
          <div className="relative">
            <IconButton
              icon={<FilterAltOutlinedIcon sx={{ fontSize: 20 }} />}
              onClick={onToggleCollapse}
              variant="ghost"
              size="md"
              tooltip={totalFiltersActive > 0 ? "Filters active" : "Open filters"}
            />
            {totalFiltersActive > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4CAF50] border-2 border-white flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-white leading-none">{totalFiltersActive}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 h-full bg-white border-l border-[#DFE3E4] flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header with Collapse Button */}
      <CollapsibleRailHeader
        isExpanded={!isCollapsed}
        onToggle={onToggleCollapse}
        side="right"
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <FilterAltOutlinedIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />
            <h2 className="text-md font-semibold text-[#385459]">Filters</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearAllFilters}
              className="text-sm font-semibold text-[#385459] hover:text-[#244348] underline transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Exclusions Section */}
        <div className="border-b border-[#DFE3E4]">
          {/* Category Header */}
          {!isEditingExclusions ? (
            <button
              onClick={() => setIsExclusionsExpanded(!isExclusionsExpanded)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors text-left"
            >
              <h3 className="text-sm font-semibold text-[#385459]">Exclusions</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#C64838]">
                  {selectedExclusions.length} excluded
                </span>
                <div className="pointer-events-none">
                  {isExclusionsExpanded ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />
                  )}
                </div>
              </div>
            </button>
          ) : (
            <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors">
              <h3 className="text-sm font-semibold text-[#385459]">Exclusions</h3>
              <button
                onClick={() => setIsEditingExclusions(false)}
                className="px-2 py-1 text-xs font-semibold text-[#385459] hover:bg-gray-100 rounded transition-colors"
              >
                Save
              </button>
            </div>
          )}

          {/* Chips Display or MultiSelect */}
          {isExclusionsExpanded && (
            <>
              {!isEditingExclusions ? (
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {selectedExclusions.map((name) => {
                    const foodItem = FOOD_EXCLUSIONS.find(f => f.name === name);
                    const displayName = foodItem?.isGroup ? `All ${name}` : name;

                    return (
                      <div
                        key={name}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#C64838] border border-[#A33A2C] text-white h-6"
                      >
                        <span className="leading-tight">{displayName}</span>
                        <button
                          onClick={() => setSelectedExclusions(selectedExclusions.filter(e => e !== name))}
                          className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-[#A33A2C] transition-colors"
                          aria-label={`Remove ${displayName}`}
                        >
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M1 1L9 9M9 1L1 9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}

                  {/* Add Button */}
                  <button
                    onClick={() => {
                      setIsEditingExclusions(true);
                      setIsDropdownOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-white border border-[#96a5a8] text-[#244348] hover:border-[#657A7E] hover:bg-[#F0F2F3] transition-all h-6"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="shrink-0">
                      <path
                        d="M6 1V11M1 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="leading-tight">Add</span>
                  </button>
                </div>
              ) : (
                <div ref={multiSelectRef} className="px-4 pb-4">
                  <Autocomplete
                    multiple
                    freeSolo
                    size="small"
                    disableCloseOnSelect
                    disablePortal={false}
                    open={isDropdownOpen}
                    onOpen={() => setIsDropdownOpen(true)}
                    onClose={() => setIsDropdownOpen(false)}
                    options={FOOD_EXCLUSIONS.map(f => f.name)}
                    value={selectedExclusions}
                    onChange={(_, newValue) => {
                      // Ensure all values are strings
                      const stringValues = (Array.isArray(newValue) ? newValue : []).filter((v): v is string => typeof v === 'string');

                      // When a group is added, remove any individual items that belong to that group
                      const addedItems = stringValues.filter(v => !selectedExclusions.includes(v));
                      const addedGroup = addedItems.find(item => {
                        const food = FOOD_EXCLUSIONS.find(f => f.name === item);
                        return food?.isGroup;
                      });

                      if (addedGroup) {
                        // Get all items in this group
                        const groupItems = getItemsInGroup(addedGroup);
                        // Remove those items from the selection
                        const cleanedValue = stringValues.filter(v => !groupItems.includes(v));
                        setSelectedExclusions(cleanedValue);
                      } else {
                        setSelectedExclusions(stringValues);
                      }
                    }}
                    inputValue={exclusionSearchInput}
                    onInputChange={(_, newInputValue, reason) => {
                      // Only update search when user is typing, not when selecting/clearing
                      if (reason === 'input') {
                        setExclusionSearchInput(newInputValue);
                      }
                    }}
                    getOptionDisabled={(option) => {
                      const foodItem = FOOD_EXCLUSIONS.find(f => f.name === option);
                      if (foodItem?.isGroup) return false;
                      return isItemDisabledByGroup(option, selectedExclusions);
                    }}
                    filterOptions={(options, params) => {
                      const query = params.inputValue.toLowerCase();

                      if (!query) {
                        // Show groups first (max 4), then individual items (max 8)
                        const groups = options.filter(option => {
                          const foodItem = FOOD_EXCLUSIONS.find(f => f.name === option);
                          return foodItem?.isGroup && COMMON_EXCLUSION_GROUPS.includes(option);
                        }).slice(0, 4);

                        const individuals = options.filter(option => {
                          const foodItem = FOOD_EXCLUSIONS.find(f => f.name === option);
                          return !foodItem?.isGroup;
                        }).slice(0, 8);

                        return [...groups, ...individuals];
                      }

                      // When searching, show matching groups and individuals
                      const matchingGroups: string[] = [];
                      const matchingIndividualItems: string[] = [];
                      const parentGroupsOfMatchingItems = new Set<string>();

                      FOOD_EXCLUSIONS.forEach(food => {
                        const nameMatches = food.name.toLowerCase().includes(query);
                        const tagMatches = food.tags.some(tag =>
                          tag.toLowerCase().includes(query)
                        );

                        if (nameMatches || tagMatches) {
                          if (food.isGroup) {
                            matchingGroups.push(food.name);
                          } else {
                            matchingIndividualItems.push(food.name);

                            // Find parent groups for this individual item
                            FOOD_EXCLUSIONS.forEach(possibleParent => {
                              if (possibleParent.isGroup) {
                                // Check if this individual item belongs to this parent group
                                const groupSpecificTags = possibleParent.tags.filter(
                                  tag => tag !== 'Allergens' && tag !== 'Proteins' &&
                                         tag !== 'Grains & Starches' && tag !== 'Vegetables' &&
                                         tag !== 'Fruits' && tag !== 'Legumes' && tag !== 'Other'
                                );

                                if (groupSpecificTags.length > 0) {
                                  const itemBelongsToGroup = groupSpecificTags.every(tag =>
                                    food.tags.includes(tag)
                                  );
                                  if (itemBelongsToGroup) {
                                    parentGroupsOfMatchingItems.add(possibleParent.name);
                                  }
                                }
                              }
                            });
                          }
                        }
                      });

                      // Combine all matching groups (direct matches + parent groups of matching items)
                      const allMatchingGroups = [...new Set([...matchingGroups, ...Array.from(parentGroupsOfMatchingItems)])];

                      // Limit to 4 groups and 8 individuals
                      return [...allMatchingGroups.slice(0, 4), ...matchingIndividualItems.slice(0, 8)];
                    }}
                    ListboxComponent={(props) => {
                      const { children, ...other } = props;

                      // Split children into groups and individuals
                      const childrenArray = Array.isArray(children) ? children : [children];
                      const groupItems: React.ReactNode[] = [];
                      const individualItems: React.ReactNode[] = [];

                      childrenArray.forEach((child: any) => {
                        if (child && child.key) {
                          const option = child.key;
                          const foodItem = FOOD_EXCLUSIONS.find(f => f.name === option);
                          if (foodItem?.isGroup) {
                            groupItems.push(child);
                          } else {
                            individualItems.push(child);
                          }
                        }
                      });

                      return (
                        <ul {...other}>
                          {groupItems.length > 0 && (
                            <>
                              <li className="px-2 py-1.5 text-xs font-semibold text-[#657A7E] uppercase tracking-wide pointer-events-none">
                                Groups
                              </li>
                              {groupItems}
                              {individualItems.length > 0 && <Divider sx={{ my: 1 }} />}
                            </>
                          )}
                          {individualItems.length > 0 && (
                            <>
                              <li className="px-2 py-1.5 text-xs font-semibold text-[#657A7E] uppercase tracking-wide pointer-events-none">
                                Ingredients
                              </li>
                              {individualItems}
                            </>
                          )}
                        </ul>
                      );
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const foodItem = FOOD_EXCLUSIONS.find(f => f.name === option);
                        const isGroup = foodItem?.isGroup;

                        return (
                          <Chip
                            {...getTagProps({ index })}
                            label={isGroup ? `All ${option}` : option}
                            size="small"
                            sx={{
                              backgroundColor: '#C64838',
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
                        );
                      })
                    }
                    renderOption={(props, option) => {
                      const foodItem = FOOD_EXCLUSIONS.find(f => f.name === option);
                      const isGroup = foodItem?.isGroup;
                      const isSelected = selectedExclusions.includes(option);

                      // Check if this item is disabled because its group is selected
                      const isDisabled = !isGroup && isItemDisabledByGroup(option, selectedExclusions);

                      // Count items in group if it's a group
                      let itemCount = 0;
                      if (isGroup && foodItem) {
                        itemCount = FOOD_EXCLUSIONS.filter(f =>
                          !f.isGroup && f.tags.some(tag => foodItem.tags.includes(tag))
                        ).length;
                      }

                      return (
                        <li
                          {...props}
                          className={`px-2 py-2 text-sm font-medium flex items-center gap-2 ${
                            isDisabled
                              ? 'text-[#96A5A8] cursor-not-allowed pointer-events-none'
                              : 'text-[#385459] hover:bg-[#F8F9F9] cursor-pointer'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}
                        >
                          <Checkbox
                            checked={isSelected || isDisabled}
                            disabled={isDisabled}
                            size="small"
                            sx={{
                              padding: 0,
                              color: '#C1C9CB',
                              fontFamily: 'Inter',
                              '&.Mui-checked': {
                                color: '#385459',
                              },
                              '&.Mui-disabled': {
                                color: '#96A5A8',
                              },
                            }}
                          />
                          <span className="flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {isGroup ? `All ${option}` : option}
                          </span>
                          {isGroup && (
                            <span className="text-xs text-[#96A5A8] ml-auto">
                              {itemCount} {itemCount === 1 ? 'item' : 'items'}
                            </span>
                          )}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={selectedExclusions.length === 0 ? 'Select food exclusions...' : ''}
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
                </div>
              )}
            </>
          )}
        </div>

        {/* Filter Categories */}
        <div className="flex flex-col">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-[#DFE3E4]">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors text-left"
            >
              <h3 className="text-sm font-semibold text-[#385459]">
                {category.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#657A7E]">
                  {category.appliedCount} applied
                </span>
                <div className="pointer-events-none">
                  {category.isExpanded ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />
                  )}
                </div>
              </div>
            </button>

            {/* Tags */}
            {category.isExpanded && category.tags.length > 0 && (
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(category.id, tag.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold transition-all h-6 ${
                      tag.applied
                        ? 'bg-[#244348] border border-[#01272e] text-white'
                        : 'bg-white border border-[#96a5a8] text-[#244348] hover:border-[#657A7E] hover:bg-[#F0F2F3]'
                    }`}
                  >
                    {tag.applied && (
                      <svg width="8" height="6" viewBox="0 0 12 9" fill="none" className="shrink-0">
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <span className="leading-tight">{tag.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default RecipesFilterPanel;
