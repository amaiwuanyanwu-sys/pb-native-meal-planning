import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WizardStep, WizardFormData, StepStatus } from '../types/wizard';
import { validateStep } from '../utils/wizardValidation';
import { saveDraft, loadDraft, clearDraft } from '../utils/wizardPersistence';

interface WizardContextType {
  currentStepIndex: number;
  steps: WizardStep[];
  formData: WizardFormData;
  planId: string;
  goToStep: (stepIndex: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  canNavigateToStep: (stepIndex: number) => boolean;
  updateFormData: (data: Partial<WizardFormData>) => void;
  validateCurrentStep: () => boolean;
  completedSteps: number[];
  updateStepDescription: (stepIndex: number, description: string) => void;
}

export const WizardContext = createContext<WizardContextType | undefined>(undefined);

const INITIAL_STEPS: Omit<WizardStep, 'status'>[] = [
  {
    id: 'nutrition-goals',
    label: 'Nutrition goals',
    description: 'Set calorie targets and macro goals',
    icon: 'notes',
    order: 0,
  },
  {
    id: 'food-preferences',
    label: 'Food preferences',
    description: 'Choose preferred foods and cuisines',
    icon: 'food',
    order: 1,
  },
  {
    id: 'allergies-exclusions',
    label: 'Allergies & exclusions',
    description: 'Specify allergies and dietary restrictions',
    icon: 'no_food',
    order: 2,
  },
  {
    id: 'choose-recipes',
    label: 'Choose recipes',
    description: 'Select recipes for your meal plan',
    icon: 'recipes',
    order: 3,
  },
  {
    id: 'finalize-plan',
    label: 'Finalize plan',
    description: 'Review and finalize your nutrition plan',
    icon: 'compliance',
    order: 4,
  },
];

const INITIAL_FORM_DATA: WizardFormData = {
  planName: '',
  clientId: null,
  nutritionGoals: {},
  foodPreferences: {},
  allergiesExclusions: {
    allergies: [],
    dietaryRestrictions: [],
    dislikedFoods: [],
  },
  selectedRecipes: [],
};

interface WizardProviderProps {
  children: ReactNode;
  planId: string;
  initialPlanName: string;
  initialClientId: string | null;
}

export const WizardProvider = ({
  children,
  planId,
  initialPlanName,
  initialClientId,
}: WizardProviderProps) => {
  // Start at -1 to indicate the plan info confirmation page
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepDescriptions, setStepDescriptions] = useState<Record<number, string>>({});
  const [formData, setFormData] = useState<WizardFormData>({
    ...INITIAL_FORM_DATA,
    planName: initialPlanName,
    clientId: initialClientId,
  });

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft(planId);
    if (draft) {
      setCurrentStepIndex(draft.currentStepIndex);
      setCompletedSteps(draft.completedSteps);
      setFormData(draft.formData);
    }
  }, [planId]);

  // Auto-save draft whenever form data or step changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveDraft(planId, {
        currentStepIndex,
        formData,
        completedSteps,
      });
    }, 500); // Debounce 500ms

    return () => clearTimeout(timeoutId);
  }, [planId, currentStepIndex, formData, completedSteps]);

  // Calculate step statuses
  const steps: WizardStep[] = INITIAL_STEPS.map((step, index) => {
    let status: StepStatus;

    // On step -1 (plan info page), all steps are disabled
    if (currentStepIndex === -1) {
      status = 'disabled';
    } else if (index === currentStepIndex) {
      status = 'active';
    } else if (completedSteps.includes(index)) {
      status = 'completed';
    } else {
      status = 'disabled';
    }

    // Use custom description if available, otherwise use default
    const description = stepDescriptions[index] || step.description;

    return { ...step, status, description };
  });

  const canNavigateToStep = (stepIndex: number): boolean => {
    // Cannot navigate when on plan info page
    if (currentStepIndex === -1) return false;
    // Can always navigate to current step
    if (stepIndex === currentStepIndex) return true;
    // Can navigate to completed steps
    if (completedSteps.includes(stepIndex)) return true;
    // Can navigate to the next step if current is completed
    if (stepIndex === currentStepIndex + 1 && completedSteps.includes(currentStepIndex)) return true;
    // Otherwise cannot navigate
    return false;
  };

  const validateCurrentStep = (): boolean => {
    // Plan info page (step -1) validation
    if (currentStepIndex === -1) {
      return formData.planName.trim().length >= 3;
    }
    const result = validateStep(currentStepIndex, formData);
    return result.isValid;
  };

  const goToStep = (stepIndex: number) => {
    if (canNavigateToStep(stepIndex)) {
      setCurrentStepIndex(stepIndex);
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    // From plan info page, go to step 0
    if (currentStepIndex === -1) {
      setCurrentStepIndex(0);
      return;
    }

    // Mark current step as completed
    if (!completedSteps.includes(currentStepIndex)) {
      setCompletedSteps([...completedSteps, currentStepIndex]);
    }

    // Move to next step if available
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > -1) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const updateStepDescription = (stepIndex: number, description: string) => {
    setStepDescriptions((prev) => ({
      ...prev,
      [stepIndex]: description,
    }));
  };

  const value: WizardContextType = {
    currentStepIndex,
    steps,
    formData,
    planId,
    goToStep,
    nextStep,
    previousStep,
    canNavigateToStep,
    updateFormData,
    validateCurrentStep,
    completedSteps,
    updateStepDescription,
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

export { clearDraft };
