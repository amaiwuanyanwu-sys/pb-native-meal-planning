import { useState, useEffect } from 'react';
import { NewNutritionPlanModalProps } from '../../types/nutrition';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const NewNutritionPlanModal = ({
  isOpen,
  onClose,
  onSubmit,
  availableOwners,
}: NewNutritionPlanModalProps) => {
  const [planName, setPlanName] = useState('');
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ planName?: string }>({});

  const isFormValid = planName.trim().length > 0;

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPlanName('');
      setSelectedOwnerId(null);
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = () => {
    // Validate
    const newErrors: { planName?: string } = {};

    if (!planName.trim()) {
      newErrors.planName = 'Plan name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    onSubmit({
      title: planName.trim(),
      ownerId: selectedOwnerId,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isFormValid) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col" onKeyDown={handleKeyDown}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#244348]">
            New Nutrition Plan
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4 flex flex-col gap-6">
          <Input
            label="Give your plan a name"
            value={planName}
            onChange={setPlanName}
            placeholder="Give your plan a name"
            required
            error={errors.planName}
            autoFocus
          />

          <Select
            label="Who owns this plan"
            value={selectedOwnerId}
            onChange={setSelectedOwnerId}
            options={availableOwners}
            placeholder="Who owns this plan (optional)"
            helpText="We won't share the plan with them until you're ready"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#C1C9CB] flex items-center justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Continue to Plan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewNutritionPlanModal;
