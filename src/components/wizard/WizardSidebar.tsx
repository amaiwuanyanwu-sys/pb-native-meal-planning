import VerticalStepper from './VerticalStepper';
import { WizardStep } from '../../types/wizard';
import { WIZARD_STEP_ICONS } from '../../utils/wizardIcons';
import CollapsibleRailHeader from '../common/CollapsibleRailHeader';

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
        <div className="flex-1 p-3 overflow-y-auto overflow-x-hidden flex flex-col gap-3">
          {steps.map((step, index) => {
            const IconComponent = WIZARD_STEP_ICONS[step.icon];
            const connectorFilled = index > 0 && steps[index - 1].status === 'completed';
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

            return (
              <div key={step.id} className="relative flex flex-col items-center">
                {/* Progress Connector */}
                {showConnector && (
                  <div
                    className="absolute top-8 w-1 h-3"
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
                  <IconComponent sx={{ fontSize: 20 }} className={iconColorClasses[step.status]} />
                </div>
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
