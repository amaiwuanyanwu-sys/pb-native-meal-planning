import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePlans } from '../contexts/PlanContext';
import { WizardProvider, useWizard } from '../contexts/WizardContext';
import WizardLayout from '../components/wizard/WizardLayout';
import FilterPanel from '../components/wizard/FilterPanel';
import Step1PlanInfo from '../components/wizard/steps/Step1PlanInfo';
import Step2NutritionGoals from '../components/wizard/steps/Step2NutritionGoals';
import Step3FoodPreferences from '../components/wizard/steps/Step3FoodPreferences';
import Step4AllergiesExclusions from '../components/wizard/steps/Step4AllergiesExclusions';
import Step5ChooseRecipes from '../components/wizard/steps/Step5ChooseRecipes';
import Step6FinalizePlan from '../components/wizard/steps/Step6FinalizePlan';
import { mockOwners } from '../data/mockOwners';

// Wrapper component to use wizard context
const WizardContent = () => {
  const { steps, currentStepIndex, goToStep } = useWizard();
  const { id } = useParams<{ id: string }>();
  const { getPlanById } = usePlans();
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [_activeFilterCount, _setActiveFilterCount] = useState(0);

  const plan = getPlanById(id || '');

  // Handle filter changes from FilterPanel
  const handleFilterChange = (filters: Record<string, string[]>) => {
    const count = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
    _setActiveFilterCount(count);
  };

  // Collapse left sidebar when on choose recipes step (step 3)
  useEffect(() => {
    if (currentStepIndex === 3) {
      setIsLeftSidebarCollapsed(true);
    }
  }, [currentStepIndex]);

  if (!plan) return null;

  // Find owner info for context bar by name
  const owner = mockOwners.find(o => o.name === plan.ownerName) || {
    id: 'default',
    name: plan.ownerName,
    avatarUrl: plan.avatarUrl,
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStepIndex) {
      case -1:
        // Plan info confirmation page
        return <Step1PlanInfo availableOwners={mockOwners} />;
      case 0:
        return <Step2NutritionGoals />;
      case 1:
        return <Step3FoodPreferences />;
      case 2:
        return <Step4AllergiesExclusions />;
      case 3:
        return <Step5ChooseRecipes />;
      case 4:
        return <Step6FinalizePlan />;
      default:
        return null;
    }
  };

  // Render right sidebar for specific steps
  const renderRightSidebar = () => {
    // Show filter panel only on Choose Recipes step (step 3)
    if (currentStepIndex === 3) {
      return (
        <FilterPanel
          isCollapsed={isFilterCollapsed}
          onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
          onFilterChange={handleFilterChange}
        />
      );
    }
    return null;
  };

  return (
    <WizardLayout
      steps={steps}
      currentStepIndex={currentStepIndex}
      onStepClick={goToStep}
      planId={plan.id}
      planName={plan.title}
      ownerName={owner.name}
      ownerAvatarUrl={owner.avatarUrl}
      rightSidebar={renderRightSidebar()}
      isLeftSidebarCollapsed={isLeftSidebarCollapsed}
      onToggleLeftSidebar={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
    >
      {renderStepContent()}
    </WizardLayout>
  );
};

const WizardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlanById } = usePlans();

  const plan = getPlanById(id || '');

  useEffect(() => {
    if (!plan) {
      navigate('/');
    }
  }, [plan, navigate]);

  if (!plan) {
    return null;
  }

  // Find the client ID from the plan's owner name
  const clientId = plan.ownerName
    ? mockOwners.find(owner => owner.name === plan.ownerName)?.id || null
    : null;

  return (
    <WizardProvider
      planId={plan.id}
      initialPlanName={plan.title}
      initialClientId={clientId}
    >
      <WizardContent />
    </WizardProvider>
  );
};

export default WizardPage;
