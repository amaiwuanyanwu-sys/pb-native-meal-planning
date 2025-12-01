import { WizardFormData } from '../types/wizard';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateStep = (
  stepIndex: number,
  formData: WizardFormData
): ValidationResult => {
  const errors: Record<string, string> = {};

  switch (stepIndex) {
    case 0: // Nutrition Goals (currentStepIndex 0)
      // Optional validation - at least one field should be filled
      const hasAnyGoal =
        formData.nutritionGoals.calorieTarget ||
        formData.nutritionGoals.proteinGrams ||
        formData.nutritionGoals.carbsGrams ||
        formData.nutritionGoals.fatsGrams ||
        formData.nutritionGoals.dietaryApproach ||
        (formData.nutritionGoals.specificGoals && formData.nutritionGoals.specificGoals.length > 0);

      if (!hasAnyGoal) {
        errors.nutritionGoals = 'Please provide at least one nutrition goal';
      }
      break;

    case 1: // Food Preferences (currentStepIndex 1)
      // No validation needed - all optional
      break;

    case 2: // Allergies & Exclusions (currentStepIndex 2)
      // No validation needed - can be empty
      break;

    case 3: // Choose Recipes (currentStepIndex 3)
      if (!formData.selectedRecipes || formData.selectedRecipes.length === 0) {
        errors.recipes = 'Please select at least one recipe';
      }
      break;

    case 4: // Finalize (currentStepIndex 4)
      if (!formData.planDuration || formData.planDuration <= 0) {
        errors.planDuration = 'Plan duration must be greater than 0';
      }
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
