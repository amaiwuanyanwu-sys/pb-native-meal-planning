import { NutritionPlanListItemProps } from '../../types/nutrition';
import Avatar from '../common/Avatar';
import StatusTag from '../common/StatusTag';
import PlanIcon from '@mui/icons-material/CalendarViewMonth';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '../common/IconButton';

const NutritionPlanListItem = ({ plan, onClick, onDelete }: NutritionPlanListItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(plan);
    }
    console.log('Plan list item clicked:', plan.title);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(plan);
    }
  };

  // Format date as "MMM DD, YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border-b border-gray-200 px-4 py-3 flex gap-3 items-center cursor-pointer hover:bg-gray-50 transition-colors duration-150 group"
    >
      <Avatar
        imageUrl={plan.avatarUrl}
        name={plan.ownerName}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-[#01272E]">
            {plan.title}
          </h3>
          {plan.visibility && <StatusTag type={plan.visibility} />}
        </div>
        <div className="flex gap-3 text-xs text-neutrals-600">
          <div className="flex items-center gap-1">
            <PlanIcon sx={{ fontSize: 17 }} className="text-slate-500" />
            <span>{plan.plansCount} {plan.plansCount === 1 ? 'plan' : 'plans'}</span>
          </div>
          <div className="flex items-center gap-1">
            <RestaurantIcon sx={{ fontSize: 17 }} className="text-slate-500" />
            <span>{plan.recipesCount} recipes</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          icon={<DeleteOutlineIcon sx={{ fontSize: 20 }} />}
          tooltip="Delete nutrition plan"
          variant="ghost"
          size="md"
          onClick={() => handleDelete}
        />
      </div>
    </div>
  );
};

export default NutritionPlanListItem;
