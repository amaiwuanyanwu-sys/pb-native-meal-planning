import { useNavigate } from 'react-router-dom';
import { NutritionPlan, PlanStatus } from '../../types/nutrition';
import Tabs from '../common/Tabs';
import NutritionPlanListItem from './NutritionPlanListItem';

interface AllPlansSectionProps {
  plans: NutritionPlan[];
  activeTab: PlanStatus;
  onTabChange: (tab: PlanStatus) => void;
}

const AllPlansSection = ({ plans, activeTab, onTabChange }: AllPlansSectionProps) => {
  const navigate = useNavigate();

  const tabs = [
    { id: 'all' as PlanStatus, label: 'All' },
    { id: 'active' as PlanStatus, label: 'Active' },
    { id: 'inactive' as PlanStatus, label: 'Inactive' },
  ];

  const handlePlanClick = (plan: NutritionPlan) => {
    navigate(`/plans/${plan.id}`);
  };

  // Sort plans alphabetically by title
  const sortedPlans = [...plans].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="w-full">
      <div className="mb-3">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {sortedPlans.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            No plans found
          </div>
        ) : (
          sortedPlans.map((plan) => (
            <NutritionPlanListItem key={plan.id} plan={plan} onClick={handlePlanClick} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllPlansSection;
