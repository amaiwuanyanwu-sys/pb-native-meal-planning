import VerticalStepper from './VerticalStepper';
import { WizardStep } from '../../types/wizard';
import { WIZARD_STEP_ICONS } from '../../utils/wizardIcons';
import CollapsibleRailHeader from '../common/CollapsibleRailHeader';
import Tooltip from '@mui/material/Tooltip';

interface WizardSidebarProps {
  steps: WizardStep[];
  currentStepIndex: number;
  onStepClick: (stepIndex: number) => void;
  planId: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const WizardSidebar = ({
  steps,
  currentStepIndex,
  onStepClick,
  planId: _planId,
  isCollapsed,
  onToggleCollapse,
}: WizardSidebarProps) => {
  if (isCollapsed) {
    return (
      <div className="w-[52px] h-full bg-white border-r border-[#DFE3E4] flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
        <CollapsibleRailHeader
          isExpanded={!isCollapsed}
          onToggle={onToggleCollapse}
          side="left"
        />

        {/* Collapsed Stepper - Just Icons */}
        <div className="flex-1 p-3 overflow-y-auto overflow-x-hidden flex flex-col">
          {steps.map((step, index) => {
            const IconComponent = WIZARD_STEP_ICONS[step.icon];
            const connectorFilled = step.status === 'active' || step.status === 'completed';
            const showConnector = index < steps.length - 1;

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

            const isClickable = step.status === 'completed' || step.status === 'active';

            return (
              <div key={step.id} className="relative flex flex-col items-center pb-3 min-h-[68px]">
                {/* Progress Connector */}
                {showConnector && (
                  <div
                    className="absolute top-8 w-1 bottom-0"
                    style={{
                      backgroundColor: connectorFilled ? '#385459' : '#DFE3E4',
                    }}
                  />
                )}

                {/* Indicator Circle with Tooltip */}
                <Tooltip
                  title={step.label}
                  placement="right"
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: '#244348',
                        fontSize: '0.75rem',
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        padding: '6px 12px',
                        '& .MuiTooltip-arrow': {
                          color: '#244348',
                        },
                      },
                    },
                  }}
                >
                  <button
                    onClick={() => isClickable && onStepClick(index)}
                    disabled={!isClickable}
                    className={`
                      relative flex items-center justify-center
                      w-8 h-8 rounded-full shrink-0
                      ${indicatorClasses[step.status]}
                      ${isClickable ? 'cursor-pointer hover:shadow-md transition-shadow' : 'cursor-not-allowed'}
                    `}
                  >
                    <IconComponent sx={{ fontSize: 20 }} className={iconColorClasses[step.status]} />
                  </button>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 h-full bg-white border-r border-[#DFE3E4] flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
      <CollapsibleRailHeader
        isExpanded={!isCollapsed}
        onToggle={onToggleCollapse}
        side="left"
      />

      {/* Stepper */}
      <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden shadow-sm">
        <VerticalStepper
          steps={steps}
          currentStepIndex={currentStepIndex}
          onStepClick={onStepClick}
        />
      </div>
    </div>
  );
};

export default WizardSidebar;
