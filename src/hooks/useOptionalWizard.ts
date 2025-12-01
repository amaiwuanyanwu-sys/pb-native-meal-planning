import { useContext } from 'react';
import { WizardContext } from '../contexts/WizardContext';
import { WizardFormData } from '../types/wizard';

interface OptionalWizardReturn {
  formData: WizardFormData | null;
  updateFormData: ((data: Partial<WizardFormData>) => void) | null;
}

/**
 * Hook to optionally use wizard context. Returns null for formData and updateFormData
 * when not inside a WizardProvider, allowing components to work independently.
 */
export const useOptionalWizard = (): OptionalWizardReturn => {
  // Use useContext directly - it returns undefined when there's no provider
  const context = useContext(WizardContext);

  if (context) {
    return {
      formData: context.formData,
      updateFormData: context.updateFormData,
    };
  }

  return {
    formData: null,
    updateFormData: null,
  };
};
