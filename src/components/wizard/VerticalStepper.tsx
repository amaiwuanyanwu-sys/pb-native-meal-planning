import { WizardStep } from '../../types/wizard';
import StepItem from './StepItem';

interface VerticalStepperProps {
  steps: WizardStep[];
  currentStepIndex: number;
  onStepClick: (stepIndex: number) => void;
}

const VerticalStepper = ({ steps, onStepClick }: VerticalStepperProps) => {
  return (
    <div className="flex flex-col w-full">
      {steps.map((step, index) => {
        // Determine if connector should be filled (when previous step is completed)
        const connectorFilled = index > 0 && steps[index - 1].status === 'completed';
        // Don't show connector for last step
        const showConnector = index < steps.length - 1;

        return (
          <StepItem
            key={step.id}
            step={step}
            onClick={() => onStepClick(index)}
            showConnector={showConnector}
            connectorFilled={connectorFilled}
          />
        );
      })}
    </div>
  );
};

export default VerticalStepper;
