import { useNavigate } from 'react-router-dom';
import { NutritionPlan } from '../../types/nutrition';
import NutritionPlanCard from './NutritionPlanCard';

interface RecentPlansSectionProps {
  plans: NutritionPlan[];
}

const RecentPlansSection = ({ plans }: RecentPlansSectionProps) => {
  const navigate = useNavigate();

  if (plans.length === 0) return null;

  const handlePlanClick = (plan: NutritionPlan) => {
    navigate(`/plans/${plan.id}`);
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-[#01272E] mb-3">
        Recent
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {plans.map((plan) => (
          <NutritionPlanCard key={plan.id} plan={plan} onClick={handlePlanClick} />
        ))}
      </div>
    </div>
  );
};

export default RecentPlansSection;
