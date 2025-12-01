import { useState } from 'react';
import { NutritionPlan } from '../../types/nutrition';
import EditPlanForm from './EditPlanForm';
import ViewPlanDetails from './ViewPlanDetails';

interface PlanDetailSidebarProps {
  plan: NutritionPlan;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdatePlan?: (updates: Partial<NutritionPlan>) => void;
  editMode?: boolean;
  onEditModeChange?: (isEdit: boolean) => void;
  openOwnerDropdown?: boolean;
  focusFieldProp?: string;
}

const PlanDetailSidebar = ({
  plan,
  isExpanded,
  onToggle,
  onUpdatePlan,
  editMode: externalEditMode,
  onEditModeChange,
  openOwnerDropdown = false,
  focusFieldProp,
}: PlanDetailSidebarProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [focusField, setFocusField] = useState<string | undefined>(focusFieldProp);

  // Use external edit mode if provided, otherwise use internal state
  const effectiveEditMode = externalEditMode !== undefined ? externalEditMode : isEditMode;

  // Update focus field when prop changes
  if (focusFieldProp && focusFieldProp !== focusField) {
    setFocusField(focusFieldProp);
  }

  const handleEdit = (field?: string) => {
    setFocusField(field);
    if (onEditModeChange) {
      onEditModeChange(true);
    } else {
      setIsEditMode(true);
    }
  };

  const handleSave = (updates: Partial<NutritionPlan>) => {
    if (onUpdatePlan) {
      onUpdatePlan(updates);
    }
    setFocusField(undefined);
    if (onEditModeChange) {
      onEditModeChange(false);
    } else {
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    setFocusField(undefined);
    if (onEditModeChange) {
      onEditModeChange(false);
    } else {
      setIsEditMode(false);
    }
  };


  if (effectiveEditMode) {
    return (
      <EditPlanForm
        plan={plan}
        onSave={handleSave}
        onCancel={handleCancel}
        openOwnerDropdown={openOwnerDropdown}
        focusField={focusField}
      />
    );
  }

  return (
    <ViewPlanDetails
      plan={plan}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onEdit={handleEdit}
    />
  );
};

export default PlanDetailSidebar;
