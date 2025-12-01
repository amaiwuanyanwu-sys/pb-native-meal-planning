import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard, clearDraft } from '../../../contexts/WizardContext';
import WizardNavigation from '../WizardNavigation';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ChefHatIcon, ClockIcon } from '../../../utils/wizardIcons';

const DIET_OPTIONS = [
  'Vegan',
  'Vegetarian',
  'Gluten-Free',
  'Dairy-free',
  'Paleo',
  'Keto',
  'Low carb',
  'High fiber',
  'High protein',
  'Low fodmap',
];

const CUISINE_OPTIONS = [
  'Mediterranean',
  'Chinese',
  'Thai',
  'Italian',
  'Mexican',
  'Middle Eastern',
  'Ethiopian',
  'Indian',
  'North American',
];

const SKILL_LEVEL_OPTIONS = [
  'No preference',
  'Simple',
  'Intermediate',
  'Advanced',
];

const PREP_TIME_OPTIONS = [
  'No preference',
  'Quick (under 30 min)',
  'Moderate (30-60min)',
  'Flexible',
];

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Chip = ({ label, selected, onClick }: ChipProps) => {
  const baseClasses = 'flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all';
  const selectedClasses = 'bg-[#244348] border border-[#01272e] text-white';
  const unselectedClasses = 'bg-white border border-[#96a5a8] text-[#244348] hover:border-[#657A7E] hover:bg-[#F0F2F3]';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${selected ? selectedClasses : unselectedClasses}`}
    >
      {selected && (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" className="shrink-0">
          <path
            d="M1 4.5L4.5 8L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {label}
    </button>
  );
};

interface SectionProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const Section = ({ icon, label, children }: SectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="text-[#385459] flex items-center">{icon}</div>
        <span className="text-sm font-semibold text-[#244348] leading-none">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

const Step3FoodPreferences = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, nextStep, previousStep, updateStepDescription, planId } = useWizard();

  const [selectedDiet, setSelectedDiet] = useState<string[]>(
    formData.foodPreferences.dietPreferences || []
  );
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>(
    formData.foodPreferences.cuisinePreferences || []
  );
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string | null>(
    formData.foodPreferences.skillLevel || null
  );
  const [selectedPrepTime, setSelectedPrepTime] = useState<string | null>(
    formData.foodPreferences.prepTime || null
  );

  useEffect(() => {
    updateFormData({
      foodPreferences: {
        ...formData.foodPreferences,
        dietPreferences: selectedDiet,
        cuisinePreferences: selectedCuisine,
        skillLevel: selectedSkillLevel,
        prepTime: selectedPrepTime,
      },
    });
  }, [selectedDiet, selectedCuisine, selectedSkillLevel, selectedPrepTime]);

  const toggleDiet = (diet: string) => {
    setSelectedDiet((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisine((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const selectSkillLevel = (level: string) => {
    setSelectedSkillLevel(level === selectedSkillLevel ? null : level);
  };

  const selectPrepTime = (time: string) => {
    setSelectedPrepTime(time === selectedPrepTime ? null : time);
  };

  const handleNext = () => {
    // Generate description from selected preferences
    const parts: string[] = [];

    if (selectedDiet.length > 0) {
      parts.push(...selectedDiet);
    }

    if (selectedCuisine.length > 0) {
      parts.push(...selectedCuisine);
    }

    if (selectedSkillLevel && selectedSkillLevel !== 'No preference') {
      parts.push(selectedSkillLevel);
    }

    if (selectedPrepTime && selectedPrepTime !== 'No preference') {
      parts.push(selectedPrepTime);
    }

    const description = parts.join(', ');

    // Update step description (step 1 = food preferences)
    if (description) {
      updateStepDescription(1, description);
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
              What are your client's food preferences?
            </h1>
            <p className="text-sm font-medium text-[#657A7E] mt-1">
              Select food preferences for your client. You can adjust these later.
            </p>
          </div>

          {/* Sections Container */}
          <div className="w-full flex flex-col gap-6">
            {/* Diet Section */}
            <Section icon={<RestaurantIcon sx={{ fontSize: 20 }} />} label="Dietary restrictions">
              {DIET_OPTIONS.map((diet) => (
                <Chip
                  key={diet}
                  label={diet}
                  selected={selectedDiet.includes(diet)}
                  onClick={() => toggleDiet(diet)}
                />
              ))}
            </Section>

            {/* Divider */}
            <div className="border-t border-[#C1C9CB]" />

            {/* Cuisine Section */}
            <Section icon={<MenuBookIcon sx={{ fontSize: 20 }} />} label="Cuisine">
              {CUISINE_OPTIONS.map((cuisine) => (
                <Chip
                  key={cuisine}
                  label={cuisine}
                  selected={selectedCuisine.includes(cuisine)}
                  onClick={() => toggleCuisine(cuisine)}
                />
              ))}
            </Section>

            {/* Divider */}
            <div className="border-t border-[#C1C9CB]" />

            {/* Skill Level Section */}
            <Section icon={<ChefHatIcon sx={{ fontSize: 20 }} />} label="Skill level">
              {SKILL_LEVEL_OPTIONS.map((level) => (
                <Chip
                  key={level}
                  label={level}
                  selected={selectedSkillLevel === level}
                  onClick={() => selectSkillLevel(level)}
                />
              ))}
            </Section>

            {/* Divider */}
            <div className="border-t border-[#C1C9CB]" />

            {/* Prep Time Section */}
            <Section icon={<ClockIcon sx={{ fontSize: 20 }} />} label="Prep time">
              {PREP_TIME_OPTIONS.map((time) => (
                <Chip
                  key={time}
                  label={time}
                  selected={selectedPrepTime === time}
                  onClick={() => selectPrepTime(time)}
                />
              ))}
            </Section>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <WizardNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        onCancel={handleCancel}
        nextLabel="Next: Allergies & exclusions"
        showPrevious={true}
        showCancel={true}
      />
    </div>
  );
};

export default Step3FoodPreferences;
