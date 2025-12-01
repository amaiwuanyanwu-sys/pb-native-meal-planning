import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard, clearDraft } from '../../../contexts/WizardContext';
import { usePlans } from '../../../contexts/PlanContext';
import Input from '../../common/Input';
import Select from '../../common/Select';
import WizardNavigation from '../WizardNavigation';
import { SelectOption } from '../../../types/nutrition';

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

  // Update context when local state changes
  useEffect(() => {
    updateFormData({ planName, clientId });
  }, [planName, clientId]);

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
              Give your plan a name and assign it to a client
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-[410px]">
              <Input
                label="Plan name"
                value={planName}
                onChange={setPlanName}
                required
                error={error}
              />
            </div>

            <div className="w-full max-w-[410px]">
              <Select
                label="Which client is this for"
                value={clientId}
                onChange={setClientId}
                options={availableOwners}
                helpText="We won't share the plan with them until you're ready"
              />
            </div>
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
