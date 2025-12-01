export type StepStatus = 'active' | 'completed' | 'disabled';

export interface WizardStep {
  id: string;
  label: string;
  description: string;
  icon: 'notes' | 'food' | 'no_food' | 'recipes' | 'compliance';
  status: StepStatus;
  order: number;
}

export interface WizardFormData {
  // Step 1: Plan Information
  planName: string;
  clientId: string | null;

  // Step 2: Nutrition Goals
  nutritionGoals: {
    calorieTarget?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatsGrams?: number;
    dietaryApproach?: 'balanced' | 'low-carb' | 'high-protein' | 'keto' | 'custom';
    specificGoals?: string[];
    otherGoalText?: string;
  };

  // Step 3: Food Preferences
  foodPreferences: {
    dietPreferences?: string[];
    cuisinePreferences?: string[];
    skillLevel?: string | null;
    prepTime?: string | null;
    // Legacy fields for backward compatibility
    preferredProteins?: string[];
    preferredVegetables?: string[];
    preferredGrains?: string[];
    cuisineStyles?: string[];
    mealComplexity?: 'simple' | 'moderate' | 'complex';
  };

  // Step 4: Allergies & Exclusions
  allergiesExclusions: {
    allergies: string[];
    dietaryRestrictions: string[];
    dislikedFoods: string[];
  };

  // Step 5: Choose Recipes
  selectedRecipes: Array<{
    id: string;
    name: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    imageUrl?: string;
  }>;

  // Step 6: Finalize
  planDuration?: number;
  startDate?: string;
  notes?: string;
  shareWithClient?: boolean;
}

export interface WizardDraft {
  planId: string;
  currentStepIndex: number;
  formData: WizardFormData;
  completedSteps: number[];
  lastModified: string;
  version: string;
}

export interface StepItemProps {
  step: WizardStep;
  onClick?: () => void;
  showConnector?: boolean;
  connectorFilled?: boolean;
}

export interface ProgressConnectorProps {
  isFilled: boolean;
}

export interface WizardNavigationProps {
  onNext: () => void;
  onPrevious?: () => void;
  nextLabel: string;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
}
