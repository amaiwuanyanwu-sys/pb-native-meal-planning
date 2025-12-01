import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard, clearDraft } from '../../../contexts/WizardContext';
import WizardNavigation from '../WizardNavigation';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { foodExclusionService } from '../../../services/foodExclusionService';

// Get all exclusion options from service
const EXCLUSION_OPTIONS = foodExclusionService.getAllFoodItems().map(item => item.name);

// Common exclusion groups to show as cards (mix of allergens and compound-based)
const COMMON_EXCLUSION_GROUPS = [
  'Tree Nuts',
  'Dairy',
  'Eggs',
  'Wheat',
  'High FODMAP',
  'High Salicylate',
  'Nightshades',
  'Alliums'
];

// Map dietary preferences to food exclusions
const DIET_TO_EXCLUSIONS_MAP: Record<string, string[]> = {
  'Vegan': ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Poultry', 'Beef', 'Pork', 'Lamb'],
  'Vegetarian': ['Fish', 'Shellfish', 'Poultry', 'Beef', 'Pork', 'Lamb'],
  'Dairy-Free': ['Dairy'],
  'Gluten-Free': ['Wheat', 'Gluten'],
  'Pescatarian': ['Poultry', 'Beef', 'Pork', 'Lamb'],
  'Paleo': ['Dairy', 'Wheat', 'Beans', 'Soy'],
  'Keto': [], // Keto doesn't necessarily exclude food groups, just limits carbs
  'Low-Carb': [], // Same as keto
};

// Helper Functions for Group/Item Management

// Get all individual items that belong to a group
const getItemsInGroup = (groupName: string): string[] => {
  const group = foodExclusionService.getGroupByName(groupName);
  return group ? group.members : [];
};

// Check if an item should be disabled (its parent group is selected)
const isItemDisabledByGroup = (itemName: string, selectedExclusions: string[]): boolean => {
  return foodExclusionService.isItemDisabledByGroup(itemName, selectedExclusions);
};

const Step4AllergiesExclusions = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, nextStep, previousStep, updateStepDescription, planId } =
    useWizard();

  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [hasAutoPopulated, setHasAutoPopulated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // State
  const [exclusions, setExclusions] = useState<string[]>(() => {
    return formData.allergiesExclusions.allergies || [];
  });
  const [exclusionSearchInput, setExclusionSearchInput] = useState('');


  // Auto-populate exclusions based on dietary preferences (only once)
  useEffect(() => {
    if (hasAutoPopulated) return;

    const dietPreferences = formData.foodPreferences.dietPreferences || [];
    const suggestedExclusions = new Set<string>();

    // Collect all suggested exclusions from dietary preferences
    dietPreferences.forEach(diet => {
      const exclusionsForDiet = DIET_TO_EXCLUSIONS_MAP[diet] || [];
      exclusionsForDiet.forEach(exclusion => suggestedExclusions.add(exclusion));
    });

    // Only add suggestions that aren't already selected
    const newExclusions = Array.from(suggestedExclusions).filter(
      suggestion => !exclusions.includes(suggestion)
    );

    if (newExclusions.length > 0) {
      const updatedExclusions = [...exclusions, ...newExclusions];
      setExclusions(updatedExclusions);
    }

    setHasAutoPopulated(true);
  }, [formData.foodPreferences.dietPreferences, hasAutoPopulated, exclusions]);

  // Auto-focus and open the dropdown when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = autocompleteRef.current?.querySelector('input');
      if (input) {
        input.focus();
        setIsOpen(true);
      }
    }, 300); // Small delay to ensure the component is fully rendered

    return () => clearTimeout(timer);
  }, []);

  // Sync with WizardContext
  useEffect(() => {
    updateFormData({
      allergiesExclusions: {
        allergies: exclusions,
        dietaryRestrictions: [],
        dislikedFoods: [],
      },
    });
  }, [exclusions]);

  const handleNext = () => {
    let description = '';

    if (exclusions.length > 0) {
      if (exclusions.length <= 3) {
        description = exclusions.join(', ');
      } else {
        const first3 = exclusions.slice(0, 3).join(', ');
        const remaining = exclusions.length - 3;
        description = `${first3}...+${remaining} more`;
      }
    }

    if (description) {
      updateStepDescription(2, description);
    }

    nextStep();
  };

  const handlePrevious = () => {
    previousStep();
  };

  const handleCancel = () => {
    clearDraft(planId);
    navigate(`/plans/${planId}`);
  };

  const handleDone = () => {
    setIsOpen(false);
  };

  const handleReset = () => {
    setExclusions([]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-[630px] flex flex-col gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#01272E] leading-tight">
              What foods would you like to exclude?
            </h1>
            <p className="text-sm font-medium text-[#657A7E] mt-1">
              Select any allergies, dietary restrictions, or foods you'd like to avoid.
            </p>
          </div>

          {/* Multi-Select Field */}
          <div ref={autocompleteRef}>
            <Autocomplete
              multiple
              freeSolo
              size="small"
              disableCloseOnSelect
              open={isOpen}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              options={EXCLUSION_OPTIONS}
              value={exclusions}
              onChange={(_, newValue) => {
                // When a group is added, remove any individual items that belong to that group
                const addedItems = newValue.filter(v => !exclusions.includes(v));
                const addedGroup = addedItems.find(item => {
                  return foodExclusionService.getGroupByName(item) !== undefined;
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
                const serviceGroup = foodExclusionService.getGroupByName(option);
                if (serviceGroup) return false;
                return isItemDisabledByGroup(option, exclusions);
              }}
              filterOptions={(options, params) => {
                const query = params.inputValue.toLowerCase();

                if (!query) {
                  // Show common groups first, then some individuals
                  const groups = COMMON_EXCLUSION_GROUPS.slice(0, 4);
                  const individuals = foodExclusionService.getAllIngredients()
                    .slice(0, 8)
                    .map(i => i.name);
                  return [...groups, ...individuals];
                }

                // Use service search
                const searchResults = foodExclusionService.search(query);
                const matchingGroups = searchResults.groups.slice(0, 4).map(g => g.name);
                const matchingIndividuals = searchResults.ingredients.slice(0, 8).map(i => i.name);
                return [...matchingGroups, ...matchingIndividuals];
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
                    const serviceGroup = foodExclusionService.getGroupByName(option);
                    if (serviceGroup) {
                      groupItems.push(child);
                    } else {
                      individualItems.push(child);
                    }
                  }
                });

                return (
                  <div>
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
                          handleReset();
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
                          handleDone();
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
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const serviceGroup = foodExclusionService.getGroupByName(option);
                  const isGroup = serviceGroup !== undefined;

                  return (
                    <Chip
                      {...getTagProps({ index })}
                      label={isGroup ? `All ${option}` : option}
                      sx={{
                        backgroundColor: '#244348',
                        color: 'white',
                        fontSize: '0.875rem', // text-sm
                        fontFamily: 'Inter',
                        fontWeight: 600, // font-semibold
                        height: 'auto',
                        padding: '8px 12px', // py-2 px-3
                        borderRadius: '9999px', // rounded-full
                        border: '1px solid #01272e',
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiChip-label': {
                          fontFamily: 'Inter',
                          padding: 0,
                          paddingRight: '4px',
                          display: 'flex',
                          alignItems: 'center',
                        },
                        '& .MuiChip-deleteIcon': {
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '18px',
                          margin: 0,
                          marginLeft: '4px',
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
                const serviceGroup = foodExclusionService.getGroupByName(option);
                const isGroup = serviceGroup !== undefined;
                const isSelected = exclusions.includes(option);

                // Check if this item is disabled because its group is selected
                const isDisabled = !isGroup && isItemDisabledByGroup(option, exclusions);

                // Count items in group if it's a group
                let itemCount = 0;
                if (isGroup && serviceGroup) {
                  itemCount = serviceGroup.members.length;
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
                  label="Foods to exclude"
                  placeholder={exclusions.length === 0 ? "Search for foods to exclude..." : ""}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.875rem',
                      fontFamily: 'Inter',
                      padding: '4px',
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
                      fontSize: '0.875rem',
                      fontFamily: 'Inter',
                      color: '#657A7E',
                      '&.Mui-focused': {
                        color: '#385459',
                      },
                    },
                    '& .MuiInputLabel-shrink': {
                      fontSize: '14px',
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

          {/* Helper Text */}
          {exclusions.length === 0 && (
            <p className="text-sm text-[#96A5A8] text-center">
              Start typing to search for foods or select from common categories
            </p>
          )}

          {exclusions.length > 0 && (
            <div className="text-sm text-[#385459]">
              <span className="font-semibold">
                {(() => {
                  // Calculate total number of individual ingredients removed
                  const ingredientSet = new Set<string>();

                  exclusions.forEach(exclusion => {
                    const group = foodExclusionService.getGroupByName(exclusion);
                    if (group) {
                      // Add all members of the group
                      group.members.forEach(member => ingredientSet.add(member));
                    } else {
                      // Add individual ingredient
                      ingredientSet.add(exclusion);
                    }
                  });

                  return ingredientSet.size;
                })()}
              </span> {(() => {
                const ingredientSet = new Set<string>();
                exclusions.forEach(exclusion => {
                  const group = foodExclusionService.getGroupByName(exclusion);
                  if (group) {
                    group.members.forEach(member => ingredientSet.add(member));
                  } else {
                    ingredientSet.add(exclusion);
                  }
                });
                return ingredientSet.size === 1 ? 'ingredient' : 'ingredients';
              })()} removed
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <WizardNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        onCancel={handleCancel}
        nextLabel="Next: Choose recipes"
        showPrevious={true}
        showCancel={true}
      />
    </div>
  );
};

export default Step4AllergiesExclusions;
