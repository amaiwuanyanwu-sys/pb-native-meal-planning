import { StepItemProps } from '../../types/wizard';
import { WIZARD_STEP_ICONS, EditIcon, LockIcon } from '../../utils/wizardIcons';

const StepItem = ({ step, onClick, showConnector = true, connectorFilled = false }: StepItemProps) => {
  const IconComponent = WIZARD_STEP_ICONS[step.icon];
  const isClickable = step.status === 'completed' || step.status === 'active';
  const showDescription = step.status === 'completed';

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  // Indicator styles based on status
  const indicatorClasses = {
    active: 'bg-white border-2 border-[#385459]',
    completed: 'bg-[#385459] border-2 border-[#385459]',
    disabled: 'bg-[#DFE3E4] border-2 border-[#DFE3E4]',
  };

  // Icon color based on status
  const iconColorClasses = {
    active: 'text-[#385459]',
    completed: 'text-white',
    disabled: 'text-[#96A5A8]',
  };

  // Step container styles based on status
  const stepClasses = {
    active: 'bg-white border border-[#657A7E]',
    completed: 'bg-white border border-[#DFE3E4]',
    disabled: 'bg-[#F0F2F3] border border-[#F0F2F3]',
  };

  // Text styles based on status
  const labelClasses = {
    active: 'text-[#01272E] font-semibold',
    completed: 'text-[#01272E] font-semibold',
    disabled: 'text-[#657A7E] font-semibold',
  };

  const descriptionClasses = {
    active: 'text-[#657A7E] font-medium',
    completed: 'text-[#657A7E] font-medium',
    disabled: 'text-[#96A5A8] font-medium',
  };

  return (
    <div className="relative flex gap-3 items-start pb-3 w-full">
      {/* Progress Connector */}
      {showConnector && (
        <div
          className="absolute left-[14px] top-8 w-1 bottom-0"
          style={{
            backgroundColor: connectorFilled ? '#385459' : '#DFE3E4',
          }}
        />
      )}

      {/* Indicator Circle */}
      <div
        className={`
          relative flex items-center justify-center
          w-8 h-8 rounded-full shrink-0
          ${indicatorClasses[step.status]}
        `}
      >
        <IconComponent
          sx={{ fontSize: 20 }}
          className={iconColorClasses[step.status]}
        />
      </div>

      {/* Step Content */}
      <div
        onClick={handleClick}
        className={`
          flex-1 flex items-center gap-3 p-3 rounded min-w-0
          ${stepClasses[step.status]}
          ${isClickable ? 'cursor-pointer hover:shadow-sm transition-shadow' : 'cursor-not-allowed'}
        `}
      >
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${labelClasses[step.status]} truncate`}>
            {step.label}
          </p>
          {showDescription && step.description && (
            <p className={`text-xs ${descriptionClasses[step.status]} truncate mt-0.5`}>
              {step.description}
            </p>
          )}
        </div>

        {/* Status Icon */}
        <div className="shrink-0">
          {step.status === 'disabled' ? (
            <LockIcon sx={{ fontSize: 20 }} className="text-[#96A5A8]" />
          ) : step.status === 'completed' ? (
            <EditIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StepItem;
