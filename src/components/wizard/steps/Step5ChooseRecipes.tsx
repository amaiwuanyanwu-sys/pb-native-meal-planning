import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard, clearDraft } from '../../../contexts/WizardContext';
import WizardNavigation from '../WizardNavigation';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Recipe } from '../../../types/nutrition';
import { RECIPES } from '../../../data/recipes';
import { getRecipePlaceholder } from '../../../utils/recipePlaceholders';

const Step5ChooseRecipes = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, nextStep, previousStep, updateStepDescription, planId } =
    useWizard();

  // State
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>(() => {
    // Load from formData
    const saved = formData.selectedRecipes || [];
    return saved
      .map((saved) => RECIPES.find((r) => r.id === saved.id))
      .filter((r): r is Recipe => r !== undefined);
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'explore' | 'recipe-box'>('explore');
  const allRecipes = RECIPES;

  // Filter recipes based on view mode and search query
  const filteredRecipes = allRecipes.filter((recipe) => {
    // First filter by view mode
    if (viewMode === 'recipe-box') {
      const isInBox = selectedRecipes.some((r) => r.id === recipe.id);
      if (!isInBox) return false;
    }

    // Then filter by search query
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.cuisine?.toLowerCase().includes(query) ||
      recipe.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // Simulate loading when search query or view mode changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms simulated loading delay
    return () => clearTimeout(timer);
  }, [searchQuery, viewMode]);

  const showLoading = isLoading;

  // Sync with WizardContext
  useEffect(() => {
    updateFormData({
      selectedRecipes: selectedRecipes.map((recipe) => ({
        id: recipe.id,
        name: recipe.name,
        mealType: recipe.mealType || 'snack',
        imageUrl: recipe.imageUrl,
      })),
    });
  }, [selectedRecipes]);

  const isRecipeSelected = (recipeId: string): boolean => {
    return selectedRecipes.some((r) => r.id === recipeId);
  };

  const toggleRecipe = (recipe: Recipe) => {
    if (isRecipeSelected(recipe.id)) {
      setSelectedRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
    } else {
      setSelectedRecipes((prev) => [...prev, recipe]);
    }
  };

  const handleNext = () => {
    let description = '';

    if (selectedRecipes.length > 0) {
      description = `${selectedRecipes.length} recipe${selectedRecipes.length > 1 ? 's' : ''} selected`;
    }

    if (description) {
      updateStepDescription(3, description);
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

  return (
    <>
      <div className="flex-1 flex flex-col items-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-[900px] flex flex-col gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#01272E] leading-tight">
              Choose recipes for your meal plan
            </h1>
            <p className="text-sm font-medium text-[#657A7E] mt-1">
              Select recipes that match your nutrition goals and preferences
            </p>
          </div>

          {/* Search Bar with Segmented Control */}
          <div className="sticky top-[-40px] z-10 bg-[#F8F9F9]/95 pt-4 -mt-4 w-full flex items-center gap-3">
            {/* Segmented Control */}
            <div className="flex items-center bg-[#F8F9F9] border border-[#DFE3E4] rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => setViewMode('explore')}
                className={`px-4 py-2 rounded text-sm font-semibold transition-all whitespace-nowrap ${viewMode === 'explore'
                    ? 'bg-white text-[#244348] shadow-sm'
                    : 'text-[#657A7E] hover:text-[#244348]'
                  }`}
              >
                Explore
              </button>
              <button
                onClick={() => setViewMode('recipe-box')}
                className={`px-4 py-2 rounded text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${viewMode === 'recipe-box'
                    ? 'bg-white text-[#244348] shadow-sm'
                    : 'text-[#657A7E] hover:text-[#244348]'
                  }`}
              >
                Recipe box
                {selectedRecipes.length > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#244348] text-white text-xs font-bold rounded-full">
                    {selectedRecipes.length}
                  </span>
                )}
              </button>
            </div>
            <TextField
              fullWidth
              placeholder="Search recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#657A7E', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setSearchQuery('')}
                      size="small"
                      sx={{
                        padding: '4px',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <CloseIcon sx={{ color: '#657A7E', fontSize: 18 }} />
                    </IconButton>
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

          {/* Recipe Grid */}
          <div className="w-full">
            {showLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#DFE3E4] rounded-lg overflow-hidden"
                  >
                    {/* Image skeleton with shimmer */}
                    <div className="relative w-full h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                    {/* Content skeleton */}
                    <div className="p-4 space-y-3">
                      <div className="space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/2"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-20"></div>
                        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-28"></div>
                      </div>
                      <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecipes.map((recipe) => {
                  const isSelected = isRecipeSelected(recipe.id);
                  return (
                    <button
                      key={recipe.id}
                      onClick={() => toggleRecipe(recipe)}
                      className={`bg-white rounded-lg overflow-hidden transition-all hover:shadow-md flex flex-col text-left ${
                        isSelected
                          ? 'border-2 border-[#244348]'
                          : 'border border-[#DFE3E4]'
                      }`}
                    >
                      {/* Recipe Image */}
                      <div className="relative w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 border-b border-[#DFE3E4]">
                        <img
                          src={recipe.imageUrl || getRecipePlaceholder(recipe.id)}
                          alt={recipe.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-2 p-4">
                        {/* Content area */}
                        <div className="flex flex-1 flex-col gap-1">
                          <h3 className="text-sm font-semibold text-[#244348] leading-[1.4] line-clamp-2">
                            {recipe.name}
                          </h3>
                          {/* Metadata */}
                          <div className="flex flex-wrap gap-2 items-center">
                            <div className="flex items-center gap-0.5">
                              <AccessTimeIcon sx={{ fontSize: 16, color: '#657A7E' }} />
                              <span className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                                {recipe.prepTime} mins
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <LocalGroceryStoreIcon sx={{ fontSize: 16, color: '#657A7E' }} />
                              <span className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                                {recipe.ingredients} ingredients
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action indicator */}
                        <div className="flex items-center">
                          <div
                            className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded border transition-colors pointer-events-none ${
                              isSelected
                                ? 'bg-[#244348] border-[#244348] text-white'
                                : 'bg-white border-[#96A5A8] text-[#385459]'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <CheckIcon sx={{ fontSize: 20 }} />
                                <span className="text-sm font-semibold leading-[1.4]">Added</span>
                              </>
                            ) : (
                              <>
                                <AddIcon sx={{ fontSize: 20 }} />
                                <span className="text-sm font-semibold leading-[1.4]">Add</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-[#96A5A8]">
                  No recipes found. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <WizardNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        onCancel={handleCancel}
        nextLabel="Next: Finalize plan"
        showPrevious={true}
        showCancel={true}
        isNextDisabled={selectedRecipes.length === 0}
      />
    </>
  );
};

export default Step5ChooseRecipes;
