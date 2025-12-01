import React, { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
// Category Icons
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import GrainIcon from '@mui/icons-material/Grain';
import EggIcon from '@mui/icons-material/Egg';
import SetMealIcon from '@mui/icons-material/SetMeal';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AppleIcon from '@mui/icons-material/Apple';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import BlockIcon from '@mui/icons-material/Block';
import SpaIcon from '@mui/icons-material/Spa';

interface FoodItem {
  name: string;
  tags: string[];
  isGroup?: boolean;
}

interface GroupTag {
  name: string;
  icon: string;
}

interface SelectedItem {
  name: string;
  isGroup: boolean;
  tags: string[];
}

interface ExclusionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExclusions: SelectedItem[];
  onApply: (exclusions: SelectedItem[]) => void;
}

// Group/Tag definitions with icons
const GROUP_TAGS: Record<string, GroupTag> = {
  'Allergens': { name: 'Allergens', icon: 'allergens' },
  'Grains & Starches': { name: 'Grains & Starches', icon: 'grains' },
  'Rice': { name: 'Rice', icon: 'grains' },
  'Corn': { name: 'Corn', icon: 'grains' },
  'Wheat': { name: 'Wheat', icon: 'grains' },
  'Oats': { name: 'Oats', icon: 'grains' },
  'Potatoes': { name: 'Potatoes', icon: 'grains' },
  'Proteins': { name: 'Proteins', icon: 'proteins' },
  'Pork': { name: 'Pork', icon: 'proteins' },
  'Beef': { name: 'Beef', icon: 'proteins' },
  'Fish': { name: 'Fish', icon: 'proteins' },
  'Shellfish': { name: 'Shellfish', icon: 'proteins' },
  'Poultry': { name: 'Poultry', icon: 'proteins' },
  'Legumes': { name: 'Legumes', icon: 'legumes' },
  'Beans': { name: 'Beans', icon: 'legumes' },
  'Vegetables': { name: 'Vegetables', icon: 'vegetables' },
  'Onions': { name: 'Onions', icon: 'vegetables' },
  'Peppers': { name: 'Peppers', icon: 'vegetables' },
  'Mushrooms': { name: 'Mushrooms', icon: 'vegetables' },
  'Tomatoes': { name: 'Tomatoes', icon: 'vegetables' },
  'Fruits': { name: 'Fruits', icon: 'fruits' },
  'Citrus': { name: 'Citrus', icon: 'fruits' },
  'Berries': { name: 'Berries', icon: 'fruits' },
  'Tropical Fruits': { name: 'Tropical Fruits', icon: 'fruits' },
  'Melons': { name: 'Melons', icon: 'fruits' },
  'Dairy': { name: 'Dairy', icon: 'dairy' },
  'Eggs': { name: 'Eggs', icon: 'eggs' },
  'Tree Nuts': { name: 'Tree Nuts', icon: 'allergens' },
  'Seeds': { name: 'Seeds', icon: 'other' },
  'Dietary Restrictions': { name: 'Dietary Restrictions', icon: 'restrictions' },
  'Other': { name: 'Other', icon: 'other' },
};

// Icon mapping by icon identifier
const CATEGORY_ICONS: Record<string, React.ReactElement> = {
  'allergens': <LocalDiningIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'grains': <GrainIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'proteins': <RestaurantIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'legumes': <SpaIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'vegetables': <LocalFloristIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'fruits': <AppleIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'dairy': <SetMealIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'eggs': <EggIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'restrictions': <BlockIcon sx={{ fontSize: 28, color: '#244348' }} />,
  'other': <EmojiFoodBeverageIcon sx={{ fontSize: 28, color: '#244348' }} />,
};

const FOOD_EXCLUSIONS: FoodItem[] = [
  // Groups (can be selected as a whole)
  { name: 'Tree Nuts', tags: ['Allergens', 'Tree Nuts'], isGroup: true },
  { name: 'Dairy', tags: ['Allergens', 'Dairy'], isGroup: true },
  { name: 'Eggs', tags: ['Allergens', 'Eggs'], isGroup: true },
  { name: 'Wheat', tags: ['Allergens', 'Grains & Starches', 'Wheat'], isGroup: true },
  { name: 'Soy', tags: ['Allergens', 'Legumes'], isGroup: true },
  { name: 'Fish', tags: ['Allergens', 'Proteins', 'Fish'], isGroup: true },
  { name: 'Shellfish', tags: ['Allergens', 'Proteins', 'Shellfish'], isGroup: true },
  { name: 'Pork', tags: ['Proteins', 'Pork'], isGroup: true },
  { name: 'Beef', tags: ['Proteins', 'Beef'], isGroup: true },
  { name: 'Poultry', tags: ['Proteins', 'Poultry'], isGroup: true },

  // Individual items
  { name: 'Peanuts', tags: ['Allergens'] },
  { name: 'Gluten', tags: ['Allergens'] },
  { name: 'Almonds', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Cashews', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Walnuts', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Milk', tags: ['Allergens', 'Dairy'] },
  { name: 'Cheese', tags: ['Allergens', 'Dairy'] },
  { name: 'Butter', tags: ['Allergens', 'Dairy'] },
  { name: 'Yogurt', tags: ['Allergens', 'Dairy'] },
  { name: 'Chicken eggs', tags: ['Allergens', 'Eggs'] },
  { name: 'Salmon', tags: ['Proteins', 'Fish'] },
  { name: 'Tuna', tags: ['Proteins', 'Fish'] },
  { name: 'Shrimp', tags: ['Proteins', 'Shellfish'] },
  { name: 'Crab', tags: ['Proteins', 'Shellfish'] },
  { name: 'Bacon', tags: ['Proteins', 'Pork'] },
  { name: 'Ham', tags: ['Proteins', 'Pork'] },
  { name: 'Ground beef', tags: ['Proteins', 'Beef'] },
  { name: 'Steak', tags: ['Proteins', 'Beef'] },
  { name: 'Chicken', tags: ['Proteins', 'Poultry'] },
  { name: 'Turkey', tags: ['Proteins', 'Poultry'] },
];

// Common groups to show by default
const COMMON_GROUPS = [
  'Tree Nuts',
  'Dairy',
  'Eggs',
  'Wheat',
  'Shellfish',
  'Fish',
  'Soy',
  'Pork'
];

interface RemovableChipProps {
  label: string;
  onRemove: () => void;
}

const RemovableChip = ({ label, onRemove }: RemovableChipProps) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold bg-[#244348] border border-[#01272e] text-white">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-[#385459] transition-colors"
        aria-label={`Remove ${label}`}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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
};

interface GroupChipProps {
  label: string;
  onRemove: () => void;
}

const GroupChip = ({ label, onRemove }: GroupChipProps) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold bg-[#244348] border border-[#01272e] text-white">
      <span>All {label}</span>
      <button
        onClick={onRemove}
        className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-[#385459] transition-colors"
        aria-label={`Remove all ${label}`}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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
};

const ExclusionsModal = ({ isOpen, onClose, selectedExclusions, onApply }: ExclusionsModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelectedExclusions, setTempSelectedExclusions] = useState<SelectedItem[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<FoodItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize temp selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelectedExclusions([...selectedExclusions]);
      setSearchQuery('');
    }
  }, [isOpen, selectedExclusions]);

  // Helper to check if item is selected
  const isItemSelected = (itemName: string): boolean => {
    return tempSelectedExclusions.some(sel => sel.name === itemName);
  };

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = FOOD_EXCLUSIONS.filter(food =>
        food.name.toLowerCase().includes(query) && !isItemSelected(food.name)
      );
      setFilteredSuggestions(filtered);
    } else {
      const groups = FOOD_EXCLUSIONS.filter(food => food.isGroup && !isItemSelected(food.name));
      setFilteredSuggestions(groups);
    }
  }, [searchQuery, tempSelectedExclusions]);

  const addToTempExclusions = (foodItem: FoodItem | string) => {
    let itemName: string;
    let isGroup = false;
    let tags: string[] = [];

    if (typeof foodItem === 'string') {
      itemName = foodItem.trim();
      if (!itemName || itemName.length < 2) return;
      tags = [];
    } else {
      itemName = foodItem.name;
      isGroup = !!foodItem.isGroup;
      tags = foodItem.tags;
    }

    const isDuplicate = tempSelectedExclusions.some(
      (existing) => existing.name.toLowerCase() === itemName.toLowerCase()
    );

    if (!isDuplicate) {
      setTempSelectedExclusions((prev) => [...prev, { name: itemName, isGroup, tags }]);
      setSearchQuery('');
    }
  };

  const removeFromTempExclusions = (itemName: string) => {
    setTempSelectedExclusions((prev) => prev.filter((i) => i.name !== itemName));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim().length >= 2) {
        addToTempExclusions(searchQuery.trim());
      }
    }
  };

  const handleApply = () => {
    onApply(tempSelectedExclusions);
    onClose();
  };

  // Helper to get matching groups based on search query
  const getMatchingGroups = (query: string): string[] => {
    const matchedGroups = new Set<string>();

    if (query.trim().length === 0) {
      COMMON_GROUPS.forEach(name => {
        if (!isItemSelected(name)) {
          matchedGroups.add(name);
        }
      });
    } else {
      const queryLower = query.toLowerCase();
      const matchingItems = FOOD_EXCLUSIONS.filter(food =>
        food.name.toLowerCase().includes(queryLower)
      );

      matchingItems.forEach(matchingItem => {
        FOOD_EXCLUSIONS.forEach(food => {
          if (food.isGroup && matchedGroups.size < 8 && !isItemSelected(food.name)) {
            const nameMatches = food.name.toLowerCase().includes(queryLower);
            const hasSharedTags = matchingItem.tags.some(tag =>
              food.tags.includes(tag)
            );

            if (nameMatches || hasSharedTags) {
              matchedGroups.add(food.name);
            }
          }
        });
      });
    }

    return Array.from(matchedGroups).slice(0, 8);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full max-h-[80vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h2 className="text-lg font-bold text-[#01272E]">Select foods to exclude</h2>
          <button
            onClick={onClose}
            className="text-[#96A5A8] hover:text-[#657A7E] transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#96A5A8]">
                <SearchIcon sx={{ fontSize: 20 }} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for foods to exclude..."
                className="w-full pl-12 pr-12 py-3 border border-[#C1C9CB] rounded-lg text-sm text-[#244348] placeholder-[#96A5A8] focus:outline-none focus:border-[#385459] focus:ring-1 focus:ring-[#385459]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#96A5A8] hover:text-[#657A7E] transition-colors"
                  aria-label="Clear search"
                >
                  <CloseIcon sx={{ fontSize: 18 }} />
                </button>
              )}
            </div>

            {/* Group Cards Section */}
            <div>
              <div className="grid grid-cols-4 gap-2">
                {getMatchingGroups(searchQuery).map((groupName) => {
                  const groupItem = FOOD_EXCLUSIONS.find(
                    f => f.name === groupName && f.isGroup
                  );
                  if (!groupItem) return null;

                  const tagInfo = GROUP_TAGS[groupName] || GROUP_TAGS[groupItem.tags[0]];
                  if (!tagInfo) return null;

                  const iconKey = tagInfo.icon;
                  const icon = CATEGORY_ICONS[iconKey];
                  if (!icon) return null;

                  const selected = isItemSelected(groupItem.name);

                  return (
                    <button
                      key={groupName}
                      onClick={() => {
                        if (selected) {
                          removeFromTempExclusions(groupItem.name);
                        } else {
                          addToTempExclusions(groupItem);
                        }
                      }}
                      className={`flex flex-col items-center gap-1.5 p-2 border rounded-lg transition-colors ${
                        selected
                          ? 'bg-[#244348] border-[#244348] text-white'
                          : 'border-[#C1C9CB] hover:bg-[#F8F9F9] hover:border-[#385459]'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {React.cloneElement(icon, {
                          sx: { fontSize: 20, color: selected ? '#fff' : '#244348' }
                        })}
                      </div>
                      <span className={`text-[10px] font-medium text-center leading-tight ${
                        selected ? 'text-white' : 'text-[#244348]'
                      }`}>
                        All {groupName}
                      </span>
                    </button>
                  );
                })}
              </div>
              {searchQuery.trim().length === 0 && (
                <div className="border-t border-[#E5E7EB] pt-3 mt-4">
                  <p className="text-xs text-[#96A5A8] text-center">
                    Or start typing to search specific items
                  </p>
                </div>
              )}
            </div>

            {/* Individual Items List - Only show when searching */}
            {searchQuery.trim().length > 0 && filteredSuggestions.length > 0 && (
              <div className="border-t border-[#E5E7EB] pt-4">
                <div className="flex flex-col gap-1">
                  {filteredSuggestions.map((suggestion, index) => {
                    if (suggestion.isGroup) return null;

                    const selected = isItemSelected(suggestion.name);

                    return (
                      <button
                        key={`${suggestion.name}-${index}`}
                        onClick={() => {
                          if (selected) {
                            removeFromTempExclusions(suggestion.name);
                          } else {
                            addToTempExclusions(suggestion);
                          }
                        }}
                        className={`w-full text-left transition-colors flex items-center gap-2 px-4 py-2 rounded ${
                          selected
                            ? 'bg-[#244348] text-white'
                            : 'hover:bg-[#F8F9F9] text-[#244348]'
                        }`}
                      >
                        <CircleIcon sx={{ fontSize: 8, color: selected ? '#fff' : '#96A5A8' }} />
                        <span className="flex-1 text-sm">
                          {suggestion.name}
                        </span>
                      </button>
                    );
                  })}
                  {searchQuery.trim().length >= 2 && (
                    <button
                      onClick={() => addToTempExclusions(searchQuery.trim())}
                      className="w-full text-left px-4 py-2 text-sm text-[#385459] hover:bg-[#F8F9F9] font-semibold transition-colors rounded"
                    >
                      Add custom: "{searchQuery.trim()}"
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Selected in Modal */}
            {tempSelectedExclusions.length > 0 && (
              <div className="border-t border-[#E5E7EB] pt-4">
                <h3 className="text-sm font-semibold text-[#244348] mb-2">
                  Selected ({tempSelectedExclusions.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tempSelectedExclusions.map((exclusion) => (
                    exclusion.isGroup ? (
                      <GroupChip
                        key={exclusion.name}
                        label={exclusion.name}
                        onRemove={() => removeFromTempExclusions(exclusion.name)}
                      />
                    ) : (
                      <RemovableChip
                        key={exclusion.name}
                        label={exclusion.name}
                        onRemove={() => removeFromTempExclusions(exclusion.name)}
                      />
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-[#385459] hover:bg-[#F8F9F9] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#244348] hover:bg-[#385459] rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExclusionsModal;
