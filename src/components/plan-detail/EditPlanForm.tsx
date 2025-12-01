import { useState, useEffect, useRef, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ExclusionIcon from '@mui/icons-material/NoFoodOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import Avatar from '../common/Avatar';
import Select from '../common/Select';
import Button from '../common/Button';
import MultiSelectField from '../common/MultiSelectField';
import { NutritionPlan, SelectOption } from '../../types/nutrition';
import { FOOD_EXCLUSIONS } from '../../constants/foodExclusions';
import { mockOwners } from '../../data/mockOwners';

interface EditPlanFormProps {
  plan: NutritionPlan;
  onSave: (updates: Partial<NutritionPlan>) => void;
  onCancel: () => void;
  openOwnerDropdown?: boolean;
  focusField?: string;
}

const DIETARY_PREFERENCE_OPTIONS = [
  'Vegan',
  'Vegetarian',
  'Gluten-Free',
  'Dairy-Free',
  'Paleo',
  'Keto',
  'Low-Carb',
  'Mediterranean',
  'Pescatarian',
  'Whole 30',
];

const GOAL_OPTIONS = [
  'Weight Loss',
  'Muscle Gain',
  'Maintain Weight',
  'Improve Energy',
  'Better Sleep',
  'Reduce Inflammation',
  'Heart Health',
  'Blood Sugar Control',
  'Digestive Health',
  'Athletic Performance',
];

// Get all exclusion options from FOOD_EXCLUSIONS
const EXCLUSION_OPTIONS = FOOD_EXCLUSIONS.map(item => item.name);

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
    // We need to match all non-generic tags from the group
    const groupSpecificTags = selectedFood.tags.filter(tag => tag !== 'Allergens' && tag !== 'Proteins' && tag !== 'Grains & Starches' && tag !== 'Vegetables' && tag !== 'Fruits' && tag !== 'Legumes' && tag !== 'Other');

    // If the group has specific tags, check if the item has all of them
    if (groupSpecificTags.length > 0) {
      return groupSpecificTags.every(tag => item.tags.includes(tag));
    }

    // For groups with only generic tags (like Lamb which only has 'Proteins'),
    // we need a different approach - check if the item matches the group name
    return item.tags.some(tag => selectedFood.tags.includes(tag) && tag !== 'Allergens');
  });
};

const parseToArray = (value: string | undefined): string[] => {
  if (!value) return [];
  return value.split(',').map(item => item.trim()).filter(Boolean);
};

const EditPlanForm = ({ plan, onSave, onCancel, openOwnerDropdown = false, focusField }: EditPlanFormProps) => {
  const [planName, setPlanName] = useState(plan.title);

  // Template option for dropdown
  const TEMPLATE_OPTION: SelectOption = useMemo(() => ({
    id: 'template',
    name: 'Template',
    avatarUrl: null,
    isTemplate: true,
    icon: <DescriptionOutlined sx={{ fontSize: 14, color: '#385459' }} />
  }), []);

  // Merge template with owners (template first)
  const availableOptions = useMemo(() => {
    return [TEMPLATE_OPTION, ...mockOwners];
  }, [TEMPLATE_OPTION]);

  // Find the owner ID based on the name (or template if no owner)
  const initialOwnerId = plan.ownerName
    ? mockOwners.find(o => o.name === plan.ownerName)?.id || null
    : 'template';
  const [ownerId, setOwnerId] = useState<string | null>(initialOwnerId);
  const [ownerDropdownOpen, setOwnerDropdownOpen] = useState(openOwnerDropdown);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(
    parseToArray(plan.dietaryPreferences)
  );
  const [goals, setGoals] = useState<string[]>(parseToArray(plan.goals));
  const [exclusions, setExclusions] = useState<string[]>(
    parseToArray(plan.exclusions)
  );
  const [exclusionSearchInput, setExclusionSearchInput] = useState('');
  const [exclusionsDropdownOpen, setExclusionsDropdownOpen] = useState(false);

  // Refs for focusing
  const planNameRef = useRef<HTMLInputElement>(null);
  const dietaryPreferencesRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const exclusionsRef = useRef<HTMLDivElement>(null);

  // Handle focus and dropdown opening based on focusField
  useEffect(() => {
    if (focusField) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        switch (focusField) {
          case 'owner':
            setOwnerDropdownOpen(true);
            break;
          case 'title':
          case 'planName':
            planNameRef.current?.querySelector('input')?.focus();
            break;
          case 'dietaryPreferences':
            dietaryPreferencesRef.current?.querySelector('input')?.focus();
            break;
          case 'goals':
            goalsRef.current?.querySelector('input')?.focus();
            break;
          case 'exclusions':
            setExclusionsDropdownOpen(true);
            exclusionsRef.current?.querySelector('input')?.focus();
            break;
          default:
            break;
        }
      }, 100);
    }
  }, [focusField]);


  const handleSave = () => {
    // Handle template case
    if (ownerId === 'template') {
      onSave({
        title: planName,
        ownerName: '',
        avatarUrl: null,
        dietaryPreferences: dietaryPreferences.join(', '),
        goals: goals.join(', '),
        exclusions: exclusions.join(', '),
      });
      return;
    }

    // Find the owner name and avatar from the ID
    const selectedOwner = mockOwners.find(o => o.id === ownerId);

    onSave({
      title: planName,
      ownerName: selectedOwner?.name || '',
      avatarUrl: selectedOwner?.avatarUrl || null,
      dietaryPreferences: dietaryPreferences.join(', '),
      goals: goals.join(', '),
      exclusions: exclusions.join(', '),
    });
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      fontSize: '14px',
      fontFamily: 'Inter',
      fontWeight: 500,
      height: '40px',
      color: '#244348',
      '& fieldset': {
        borderColor: '#C1C9CB',
      },
      '&:hover fieldset': {
        borderColor: '#96a5a8',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#385459',
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px !important',
      fontFamily: 'Inter',
      fontWeight: 500,
      color: '#657A7E',
      '&.Mui-focused': {
        color: '#385459',
      },
    },
    '& .MuiInputLabel-shrink': {
      fontSize: '14px !important',
      fontWeight: 600,
      fontFamily: 'Inter',
    },
  };

  return (
    <div className="h-full w-80 shrink-0 bg-white border-l border-[#DFE3E4] shadow-lg flex flex-col">
      {/* Header */}
      <div className="h-10 w-full border-b border-[#DFE3E4] flex items-center px-4 shrink-0 bg-white">
        <h3 className="text-sm font-semibold text-[#244348]">Edit Plan Settings</h3>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Plan Name */}
        <div className="p-4 border-b border-[#DFE3E4]" ref={planNameRef}>
          <TextField
            fullWidth
            size="small"
            label="Plan name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            sx={inputStyles}
          />
        </div>

        <div className="p-4 flex flex-col gap-6">
          {/* Owner */}
          <div className="flex items-start gap-3">
            {(() => {
              if (ownerId === 'template') {
                return (
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-[#DFE3E4] mt-2">
                    {TEMPLATE_OPTION.icon}
                  </div>
                );
              }

              const selectedOwner = mockOwners.find(o => o.id === ownerId);
              return (
                <Avatar
                  imageUrl={selectedOwner?.avatarUrl || null}
                  name={selectedOwner?.name || 'Unknown'}
                  size="sm"
                  className="mt-2"
                />
              );
            })()}
            <div className="flex-1">
              <Select
                label="Owner"
                value={ownerId}
                onChange={setOwnerId}
                options={availableOptions}
                open={ownerDropdownOpen}
                onOpenChange={setOwnerDropdownOpen}
                showAvatar={false}
              />
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="flex items-start gap-3">
            <RestaurantIcon sx={{ fontSize: 24 }} className="text-[#657A7E] shrink-0 mt-2" />
            <div className="flex-1" ref={dietaryPreferencesRef}>
              <MultiSelectField
                value={dietaryPreferences}
                onChange={setDietaryPreferences}
                options={DIETARY_PREFERENCE_OPTIONS}
                label="Dietary preferences"
                placeholder="Add preferences..."
                freeSolo
              />
            </div>
          </div>

          {/* Goals */}
          <div className="flex items-start gap-3">
            <TrackChangesIcon sx={{ fontSize: 24 }} className="text-[#657A7E] shrink-0 mt-2" />
            <div className="flex-1" ref={goalsRef}>
              <MultiSelectField
                value={goals}
                onChange={setGoals}
                options={GOAL_OPTIONS}
                label="Goals"
                placeholder="Add goals..."
                freeSolo
              />
            </div>
          </div>

          {/* Exclusions */}
          <div className="flex items-start gap-3">
            <ExclusionIcon sx={{ fontSize: 24 }} className="text-[#657A7E] shrink-0 mt-2" />
            <div className="flex-1" ref={exclusionsRef}>
              <Autocomplete
                multiple
                freeSolo
                size="small"
                disableCloseOnSelect
                disablePortal={false}
                open={exclusionsDropdownOpen}
                onOpen={() => setExclusionsDropdownOpen(true)}
                onClose={() => setExclusionsDropdownOpen(false)}
                options={EXCLUSION_OPTIONS}
                value={exclusions}
                onChange={(_, newValue) => {
                  // When a group is added, remove any individual items that belong to that group
                  const addedItems = newValue.filter(v => !exclusions.includes(v));
                  const addedGroup = addedItems.find(item => {
                    const food = FOOD_EXCLUSIONS.find(f => f.name === item);
                    return food?.isGroup;
                  });

                  if (addedGroup) {
                    // Get all items in this group
                    const groupItems = getItemsInGroup(addedGroup);
                    // Remove those items from the selection
                    const cleanedValue = newValue.filter(v => !groupItems.includes(v));
                    setExclusions(cleanedValue);
                  } else {
                    setExclusions(newValue);
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
                  return isItemDisabledByGroup(option, exclusions);
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
                    );
                  })
                }
                renderOption={(props, option) => {
                  const foodItem = FOOD_EXCLUSIONS.find(f => f.name === option);
                  const isGroup = foodItem?.isGroup;
                  const isSelected = exclusions.includes(option);

                  // Check if this item is disabled because its group is selected
                  const isDisabled = !isGroup && isItemDisabledByGroup(option, exclusions);

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
                      style={{ fontFamily: 'Inter', lineHeight: '1.4' }}
                      onClick={isDisabled ? (e) => e.stopPropagation() : props.onClick}
                    >
                      <Checkbox
                        checked={isSelected || isDisabled}
                        disabled={isDisabled}
                        size="small"
                        sx={{
                          padding: 0,
                          color: '#C1C9CB',
                          '&.Mui-checked': {
                            color: '#385459',
                          },
                          '&.Mui-disabled': {
                            color: '#96A5A8',
                          },
                        }}
                      />
                      <span className="flex-1">
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
                    label="Exclusions"
                    placeholder={exclusions.length === 0 ? "Add exclusions..." : ""}
                    sx={{
                      '& .MuiOutlinedInput-root.MuiInputBase-root': {
                        ontSize: '16px !important',
                        fontFamily: 'Inter',
                        padding: '12px 8px',
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
                        padding: '8.5px 14px',
                        fontFamily: 'Inter',
                        '&::placeholder': {
                          color: '#657A7E',
                          opacity: 1,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '16px !important',
                        fontFamily: 'Inter',
                        color: '#657A7E',
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
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save/Cancel Buttons - Fixed at bottom */}
      <div className="border-t border-[#DFE3E4] p-4 flex items-center gap-3 bg-white">
        <Button variant="ghost" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} className="flex-1">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditPlanForm;
