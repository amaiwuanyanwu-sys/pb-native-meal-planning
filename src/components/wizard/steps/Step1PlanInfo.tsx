import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard, clearDraft } from '../../../contexts/WizardContext';
import { usePlans } from '../../../contexts/PlanContext';
import Input from '../../common/Input';
import Select from '../../common/Select';
import WizardNavigation from '../WizardNavigation';
import { SelectOption } from '../../../types/nutrition';
import { generatePlanName } from '../../../utils/nameUtils';

interface Step1PlanInfoProps {
  availableOwners: SelectOption[];
}

const Step1PlanInfo = ({ availableOwners }: Step1PlanInfoProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData, nextStep, validateCurrentStep, planId } = useWizard();
  const { updatePlan } = usePlans();

  const [planName, setPlanName] = useState(formData.planName);
  const [clientId, setClientId] = useState<string | null>(formData.clientId);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Update context when local state changes
  useEffect(() => {
    updateFormData({ planName, clientId });
  }, [planName, clientId]);

  // Auto-populate plan name when owner/template is selected
  useEffect(() => {
    if (clientId && availableOwners.length > 0 && !formData.planName) {
      const newPlanName = generatePlanName(clientId, availableOwners);
      setPlanName(newPlanName);

      // Focus input after auto-population
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [clientId, availableOwners, formData.planName]);

  const handleNext = () => {
    if (!validateCurrentStep()) {
      setError('Plan name must be at least 3 characters');
      return;
    }
    setError('');

    // Find the selected owner to get their avatar URL
    const selectedOwner = availableOwners.find(owner => owner.id === clientId);

    // Update the plan with the new name and owner
    updatePlan(planId, {
      title: planName,
      ownerName: clientId || undefined,
      avatarUrl: selectedOwner?.avatarUrl || null,
    });

    nextStep();
  };

  const handleCancel = () => {
    clearDraft(planId);
    navigate(`/plans/${planId}`);
  };

  // Check if Next button should be disabled
  const isNextDisabled = planName.trim().length < 3;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-[678px] flex flex-col gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#244348] leading-tight">
              Let's build your nutrition plan
            </h1>
            <p className="text-sm font-medium text-[#657A7E] mt-1">
              Choose who owns this plan and give it a name
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-[410px]">
              <Select
                label="Who owns this plan"
                value={clientId}
                onChange={setClientId}
                options={availableOwners}
                placeholder="Select owner or template"
                helpText="We won't share the plan with them until you're ready"
              />
            </div>

            {clientId && (
              <div className="w-full max-w-[410px]">
                <Input
                  ref={inputRef}
                  label="Plan name"
                  value={planName}
                  onChange={setPlanName}
                  placeholder="Plan name"
                  required
                  error={error}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation at bottom */}
      <WizardNavigation
        onNext={handleNext}
        onCancel={handleCancel}
        nextLabel="Next: Nutrition goals"
        showCancel={true}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
};

export default Step1PlanInfo;
