import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Select from '../common/Select';
import Button from '../common/Button';
import { SelectOption } from '../../types/nutrition';

interface AttachClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ownerId: string | null) => void;
  availableOwners: SelectOption[];
  currentOwnerId?: string | null;
}

const AttachClientModal = ({
  isOpen,
  onClose,
  onSubmit,
  availableOwners,
  currentOwnerId,
}: AttachClientModalProps) => {
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(
    currentOwnerId || null
  );

  // Update selected owner when modal opens with a different current owner
  useEffect(() => {
    if (isOpen) {
      setSelectedOwnerId(currentOwnerId || null);
    }
  }, [isOpen, currentOwnerId]);

  const handleSubmit = () => {
    onSubmit(selectedOwnerId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#244348]">
            Attach Client
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4 flex flex-col gap-6">
          <Select
            label="Select a client"
            value={selectedOwnerId}
            onChange={setSelectedOwnerId}
            options={availableOwners}
            placeholder="Select a client to attach to this plan"
            helpText="We won't share the plan with them until you're ready"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#C1C9CB] flex items-center justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Attach Client
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AttachClientModal;
