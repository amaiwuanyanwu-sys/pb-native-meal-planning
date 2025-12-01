import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard, clearDraft } from '../../../contexts/WizardContext';
import WizardNavigation from '../WizardNavigation';

const HEALTH_GOALS = [
  'Lose weight',
  'Improve energy',
  'Build muscle',
  'Manage blood sugar',
  'Improve gut health',
  'Maintain healthy eating',
  'Reduce inflammation',
  'Other',
];

const Step2NutritionGoals = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, nextStep, previousStep, updateStepDescription, planId } = useWizard();

  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    formData.nutritionGoals.specificGoals || []
  );
  const [otherGoalText, setOtherGoalText] = useState<string>(
    formData.nutritionGoals.otherGoalText || ''
  );

  useEffect(() => {
    updateFormData({
      nutritionGoals: {
        ...formData.nutritionGoals,
        specificGoals: selectedGoals,
        otherGoalText,
      },
    });
  }, [selectedGoals, otherGoalText]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const handleNext = () => {
    // Generate description from selected goals
    let description = '';
    if (selectedGoals.length > 0) {
      // Filter out "Other" and add the custom text if "Other" is selected
      const goalsToShow = selectedGoals.filter(g => g !== 'Other');
      if (selectedGoals.includes('Other') && otherGoalText.trim()) {
        goalsToShow.push(otherGoalText.trim());
      }
      description = goalsToShow.join(', ');
    }

    // Update step description (step 0 = nutrition goals)
    if (description) {
      updateStepDescription(0, description);
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
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-[630px] flex flex-col gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#01272E] leading-tight">
              What are your client's nutrition goals?
            </h1>
            <p className="text-sm font-medium text-[#657A7E] mt-1">
              Select the primary areas you'd like to address. You can adjust these later.
            </p>
          </div>

          {/* Checkbox List */}
          <div className="w-full bg-white border border-[#C1C9CB] rounded-lg overflow-hidden">
            {HEALTH_GOALS.map((goal, index) => {
              const isChecked = selectedGoals.includes(goal);
              const isEven = index % 2 === 0;

              return (
                <div key={goal}>
                  <div
                    onClick={() => toggleGoal(goal)}
                    className={`
                      flex items-center gap-1 p-1 cursor-pointer
                      ${isEven ? 'bg-white' : 'bg-[#F8F9F9]'}
                      hover:bg-gray-100 transition-colors
                    `}
                  >
                    {/* Checkbox */}
                    <div className="flex items-center justify-center w-10 h-10 shrink-0">
                      <div className="w-5 h-5 border-2 rounded flex items-center justify-center"
                        style={{
                          borderColor: isChecked ? '#385459' : '#C1C9CB',
                          backgroundColor: isChecked ? '#385459' : 'transparent',
                        }}
                      >
                        {isChecked && (
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                            <path
                              d="M1 4.5L4.5 8L11 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    <div className="flex-1 py-2">
                      <p className="text-sm font-semibold text-[#244348]">
                        {goal}
                      </p>
                    </div>
                  </div>

                  {/* Text input for "Other" */}
                  {goal === 'Other' && isChecked && (
                    <div className={`px-4 pb-3 ${isEven ? 'bg-white' : 'bg-[#F8F9F9]'}`}>
                      <input
                        type="text"
                        value={otherGoalText}
                        onChange={(e) => setOtherGoalText(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Please specify your goal"
                        className="w-full px-3 py-2 border border-[#C1C9CB] rounded text-sm text-[#244348] placeholder-[#96A5A8] focus:outline-none focus:border-[#385459] focus:ring-1 focus:ring-[#385459]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <WizardNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        onCancel={handleCancel}
        nextLabel="Next: Dietary preferences"
        showPrevious={true}
        showCancel={true}
      />
    </div>
  );
};

export default Step2NutritionGoals;
