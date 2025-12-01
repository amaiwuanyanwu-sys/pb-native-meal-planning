import Avatar from '../common/Avatar';
import Button from '../common/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NutritionPlan } from '../../types/nutrition';

interface PlanDetailHeaderProps {
  plan: NutritionPlan;
  onBack: () => void;
  onAttachClient?: () => void;
}

const PlanDetailHeader = ({ plan, onBack, onAttachClient }: PlanDetailHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        icon={<ArrowBackIcon sx={{ fontSize: 20 }} />}
        onClick={onBack}
        className="self-start -ml-4"
        iconPosition='left'
      >
        Back to Nutrition Plans
      </Button>

      {/* Plan Header */}
      <div className="flex items-center gap-3">
        <Avatar
          imageUrl={plan.avatarUrl}
          name={plan.ownerName}
          size="md"
        />
        <h1 className="text-2xl font-semibold text-[#01272E] flex-1">
          {plan.title}
        </h1>
        {onAttachClient && (
          <button
            onClick={onAttachClient}
            className="p-2 hover:bg-gray-50 rounded transition-colors"
            title="Attach client"
          >
            <PersonAddIcon sx={{ fontSize: 24 }} className="text-slate-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanDetailHeader;
