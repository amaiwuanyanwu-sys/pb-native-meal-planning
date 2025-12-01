import { NutritionPlanCardProps } from '../../types/nutrition';
import Avatar from '../common/Avatar';
import DescriptionIcon from '@mui/icons-material/Description';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const NutritionPlanCard = ({ plan, onClick }: NutritionPlanCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(plan);
    }
    console.log('Plan card clicked:', plan.title);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      {/* Image placeholder */}
      <div className="w-full h-24 bg-gray-300" />

      {/* Content */}
      <div className="p-4 flex gap-3 items-end">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#01272E] truncate mb-1">
            {plan.title}
          </h3>
          <div className="flex gap-2 text-xs">
            <div className="flex items-center gap-1 text-slate-700">
              <DescriptionIcon sx={{ fontSize: 17 }} className="text-slate-500" />
              <span>{plan.plansCount} plans</span>
            </div>
            <div className="flex items-center gap-1 text-slate-700">
              <RestaurantIcon sx={{ fontSize: 17 }} className="text-slate-500" />
              <span>{plan.recipesCount} recipes</span>
            </div>
          </div>
        </div>
        <Avatar
          imageUrl={plan.avatarUrl}
          name={plan.ownerName}
          size="sm"
        />
      </div>
    </div>
  );
};

export default NutritionPlanCard;
