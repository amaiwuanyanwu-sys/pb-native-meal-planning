import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard, clearDraft } from '../../../contexts/WizardContext';
import { usePlans } from '../../../contexts/PlanContext';
import WizardNavigation from '../WizardNavigation';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

type MealPlanDuration = 'none' | 'week' | 'month';

const Step6FinalizePlan = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, previousStep, planId } = useWizard();
  const { updatePlan, getPlanById } = usePlans();

  // State
  const [selectedDuration, setSelectedDuration] = useState<MealPlanDuration>('week');
  const [useJournalTargets, setUseJournalTargets] = useState(true);
  const [nutritionTargets, setNutritionTargets] = useState({
    calories: formData.nutritionGoals.calorieTarget || '',
    protein: formData.nutritionGoals.proteinGrams || '',
    carbs: formData.nutritionGoals.carbsGrams || '',
    fats: formData.nutritionGoals.fatsGrams || '',
  });

  // Get selected recipes for display
  const selectedRecipes = formData.selectedRecipes || [];

  // Sync with WizardContext
  useEffect(() => {
    updateFormData({
      planDuration: selectedDuration === 'none' ? 0 : selectedDuration === 'week' ? 7 : 28,
    });
  }, [selectedDuration]);

  const handleCreatePlan = () => {
    // Get current plan
    const currentPlan = getPlanById(planId);
    if (!currentPlan) return;

    // Prepare meal plans data
    const mealPlans = selectedDuration !== 'none' ? [
      {
        id: `mp-${Date.now()}`,
        name: selectedDuration === 'week' ? 'Week 1' : 'Month 1',
        duration: selectedDuration === 'week' ? '7 days' : '28 days',
        recipesCount: selectedRecipes.length,
        images: selectedRecipes.slice(0, 4).map(r => r.imageUrl).filter(Boolean) as string[],
      }
    ] : [];

    // Update the plan with wizard data
    updatePlan(planId, {
      title: formData.planName || currentPlan.title,
      ownerName: formData.clientId || currentPlan.ownerName,
      dietaryPreferences: formData.foodPreferences.dietPreferences?.join(', ') || '',
      goals: formData.nutritionGoals.specificGoals?.join(', ') || '',
      medicalConditions: '', // Medical conditions are handled in nutrition goals
      exclusions: formData.allergiesExclusions.allergies.join(', '),
      recipes: selectedRecipes.map(r => ({ ...r, imageUrl: r.imageUrl || '' })),
      mealPlans,
      recipesCount: selectedRecipes.length,
      plansCount: mealPlans.length,
    });

    // Navigate to the plan detail page
    navigate(`/plans/${planId}`);
  };

  const handlePrevious = () => {
    previousStep();
  };

  const handleCancel = () => {
    clearDraft(planId);
    navigate(`/plans/${planId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-[630px] flex flex-col gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#01272E] leading-[1.2]">
              Let's finalize your plan
            </h1>
            <p className="text-sm font-medium text-[#657A7E] mt-1 leading-[1.4]">
              Review your recipes and add a meal plan if you like. Make adjustments anytime.
            </p>
          </div>

          {/* Recipe Box Widget */}
          <div className="bg-white border border-[#DFE3E4] rounded-lg overflow-hidden">
            {/* Widget Header */}
            <div className="bg-[#F0F2F3] border-b border-[#DFE3E4] px-4 py-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#657A7E]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
              </svg>
              <span className="text-sm font-semibold text-[#244348] leading-[1.4]">
                Recipe box
              </span>
              <div className="bg-[#DFE3E4] px-2 py-0.5 rounded-full">
                <span className="text-xs font-medium text-[#244348] leading-[1.5]">
                  {selectedRecipes.length} recipes
                </span>
              </div>
            </div>

            {/* Widget Body */}
            <div className="bg-white p-4 flex gap-3 overflow-x-auto">
              {selectedRecipes.slice(0, 8).map((recipe) => (
                <div key={recipe.id} className="flex flex-col gap-1 shrink-0 w-[100px]">
                  <div className="w-full h-[76px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border border-[#DFE3E4] overflow-hidden">
                    {recipe.imageUrl ? (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                  <p className="text-xs font-semibold text-[#385459] leading-[1.5] line-clamp-2">
                    {recipe.name}
                  </p>
                </div>
              ))}
              {selectedRecipes.length > 8 && (
                <div className="flex items-center justify-center shrink-0 w-[140px] h-[96px] bg-[#F8F9F9] border border-[#DFE3E4] rounded-lg p-3">
                  <p className="text-[10px] font-semibold text-[#244348] text-center leading-[1.5]">
                    You can add more recipes to your plan. We'll also give you suggestions.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Add a Meal Plan Widget */}
          <div className="bg-white border border-[#DFE3E4] rounded-lg overflow-hidden">
            {/* Widget Header */}
            <div className="bg-[#F0F2F3] border-b border-[#DFE3E4] px-4 py-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#657A7E]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              <span className="text-sm font-semibold text-[#244348] leading-[1.4]">
                Add a meal plan
              </span>
            </div>

            {/* Widget Body */}
            <div className="bg-white p-4 flex gap-3">
              {/* No meal plan option */}
              <button
                onClick={() => setSelectedDuration('none')}
                className={`flex-1 flex flex-col gap-2 p-4 h-[124px] rounded border transition-colors ${
                  selectedDuration === 'none'
                    ? 'border-[#385459] bg-white'
                    : 'border-[#DFE3E4] bg-white hover:border-[#96A5A8]'
                }`}
              >
                {selectedDuration === 'none' ? (
                  <RadioButtonCheckedIcon sx={{ fontSize: 24, color: '#385459' }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ fontSize: 24, color: '#96A5A8' }} />
                )}
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-sm font-semibold text-[#01272E] leading-[1.4]">
                    No meal plan
                  </span>
                  <span className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                    Just your recipes. Create a meal plan anytime.
                  </span>
                </div>
              </button>

              {/* 1 week option */}
              <button
                onClick={() => setSelectedDuration('week')}
                className={`flex-1 flex flex-col gap-2 p-4 h-[124px] rounded border transition-colors ${
                  selectedDuration === 'week'
                    ? 'border-[#385459] bg-white'
                    : 'border-[#DFE3E4] bg-white hover:border-[#96A5A8]'
                }`}
              >
                {selectedDuration === 'week' ? (
                  <RadioButtonCheckedIcon sx={{ fontSize: 24, color: '#385459' }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ fontSize: 24, color: '#96A5A8' }} />
                )}
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-sm font-semibold text-[#01272E] leading-[1.4]">
                    1 week
                  </span>
                  <span className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                    A 7-day plan built from your recipes.
                  </span>
                </div>
              </button>

              {/* 1 month option */}
              <button
                onClick={() => setSelectedDuration('month')}
                className={`flex-1 flex flex-col gap-2 p-4 h-[124px] rounded border transition-colors ${
                  selectedDuration === 'month'
                    ? 'border-[#385459] bg-white'
                    : 'border-[#DFE3E4] bg-white hover:border-[#96A5A8]'
                }`}
              >
                {selectedDuration === 'month' ? (
                  <RadioButtonCheckedIcon sx={{ fontSize: 24, color: '#385459' }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ fontSize: 24, color: '#96A5A8' }} />
                )}
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-sm font-semibold text-[#01272E] leading-[1.4]">
                    1 month
                  </span>
                  <span className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                    28 days of meal plans with recipe variety built in
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Daily Nutrition Targets Widget */}
          <div className="bg-white border border-[#DFE3E4] rounded-lg overflow-hidden">
            {/* Widget Header */}
            <div className="bg-[#F0F2F3] border-b border-[#DFE3E4] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-[#657A7E]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h10v2H7z"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
                <span className="text-sm font-semibold text-[#244348] leading-[1.4]">
                  Daily nutrition targets
                </span>
              </div>
              <button
                onClick={() => setUseJournalTargets(!useJournalTargets)}
                className="flex items-center gap-3"
              >
                <CheckBoxIcon
                  sx={{
                    fontSize: 24,
                    color: useJournalTargets ? '#385459' : '#96A5A8',
                  }}
                />
                <span className="text-sm font-semibold text-[#244348] leading-[1.4]">
                  Use targets from journals
                </span>
              </button>
            </div>

            {/* Widget Body */}
            <div className="bg-white p-4 flex flex-col gap-3">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cal (kcal)"
                    value={nutritionTargets.calories}
                    onChange={(e) =>
                      setNutritionTargets({ ...nutritionTargets, calories: e.target.value })
                    }
                    disabled={useJournalTargets}
                    className="w-full h-10 px-3 border border-[#C1C9CB] rounded text-sm font-medium text-[#244348] leading-[1.4] placeholder-[#96A5A8] disabled:bg-[#F0F2F3] disabled:text-[#96A5A8] disabled:cursor-not-allowed focus:outline-none focus:border-[#385459] focus:ring-1 focus:ring-[#385459]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Protein (g)"
                    value={nutritionTargets.protein}
                    onChange={(e) =>
                      setNutritionTargets({ ...nutritionTargets, protein: e.target.value })
                    }
                    disabled={useJournalTargets}
                    className="w-full h-10 px-3 border border-[#C1C9CB] rounded text-sm font-medium text-[#244348] leading-[1.4] placeholder-[#96A5A8] disabled:bg-[#F0F2F3] disabled:text-[#96A5A8] disabled:cursor-not-allowed focus:outline-none focus:border-[#385459] focus:ring-1 focus:ring-[#385459]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Carb (g)"
                    value={nutritionTargets.carbs}
                    onChange={(e) =>
                      setNutritionTargets({ ...nutritionTargets, carbs: e.target.value })
                    }
                    disabled={useJournalTargets}
                    className="w-full h-10 px-3 border border-[#C1C9CB] rounded text-sm font-medium text-[#244348] leading-[1.4] placeholder-[#96A5A8] disabled:bg-[#F0F2F3] disabled:text-[#96A5A8] disabled:cursor-not-allowed focus:outline-none focus:border-[#385459] focus:ring-1 focus:ring-[#385459]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Fat (g)"
                    value={nutritionTargets.fats}
                    onChange={(e) =>
                      setNutritionTargets({ ...nutritionTargets, fats: e.target.value })
                    }
                    disabled={useJournalTargets}
                    className="w-full h-10 px-3 border border-[#C1C9CB] rounded text-sm font-medium text-[#244348] leading-[1.4] placeholder-[#96A5A8] disabled:bg-[#F0F2F3] disabled:text-[#96A5A8] disabled:cursor-not-allowed focus:outline-none focus:border-[#385459] focus:ring-1 focus:ring-[#385459]"
                  />
                </div>
              </div>
              <p className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                These are daily targets—adjust them based on your client's needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <WizardNavigation
        onNext={handleCreatePlan}
        onPrevious={handlePrevious}
        onCancel={handleCancel}
        nextLabel="Create plan"
        showPrevious={true}
        showCancel={true}
      />
    </div>
  );
};

export default Step6FinalizePlan;
