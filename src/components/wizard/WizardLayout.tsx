import { ReactNode } from 'react';
import WizardSidebar from './WizardSidebar';
import WizardContextBar from './WizardContextBar';
import { WizardStep } from '../../types/wizard';

interface WizardLayoutProps {
  children: ReactNode;
  steps: WizardStep[];
  currentStepIndex: number;
  onStepClick: (stepIndex: number) => void;
  planId: string;
  planName: string;
  ownerName: string;
  ownerAvatarUrl: string | null;
  rightSidebar?: ReactNode;
  isLeftSidebarCollapsed: boolean;
  onToggleLeftSidebar: () => void;
}

const WizardLayout = ({
  children,
  steps,
  currentStepIndex,
  onStepClick,
  planId,
  planName,
  ownerName,
  ownerAvatarUrl,
  rightSidebar,
  isLeftSidebarCollapsed,
  onToggleLeftSidebar,
}: WizardLayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-[#F8F9F9]">
      {/* Context Bar - Full Width */}
      <WizardContextBar
        planName={planName}
        ownerName={ownerName}
        ownerAvatarUrl={ownerAvatarUrl}
      />

      {/* Main Content Area with Sidebars */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <WizardSidebar
          steps={steps}
          currentStepIndex={currentStepIndex}
          onStepClick={onStepClick}
          planId={planId}
          isCollapsed={isLeftSidebarCollapsed}
          onToggleCollapse={onToggleLeftSidebar}
        />

        {/* Step Content - Contains both scrollable content and navigation */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>

        {/* Right Sidebar */}
        {rightSidebar}
      </div>
    </div>
  );
};

export default WizardLayout;
