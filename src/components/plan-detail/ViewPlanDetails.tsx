import RestaurantIcon from '@mui/icons-material/Restaurant';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ExclusionIcon from '@mui/icons-material/NoFoodOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '../common/Avatar';
import IconButton from '../common/IconButton';
import CollapsibleRailHeader from '../common/CollapsibleRailHeader';
import { NutritionPlan } from '../../types/nutrition';

interface ViewPlanDetailsProps {
  plan: NutritionPlan;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (field?: string) => void;
}

const ViewPlanDetails = ({ plan, isExpanded, onToggle, onEdit }: ViewPlanDetailsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!isExpanded) {
    return (
      <div className="h-full w-[52px] shrink-0 bg-white border-l border-[#DFE3E4] shadow-lg flex flex-col overflow-visible transition-all duration-300">
        <CollapsibleRailHeader
          isExpanded={isExpanded}
          onToggle={onToggle}
          side="right"
        />

        {/* Plan Details Icon */}
        <div className="flex-1 flex flex-col items-center gap-3 pt-4 overflow-y-auto overflow-x-visible">
          <IconButton
            icon={<SettingsIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />}
            tooltip="Plan details"
            onClick={onToggle}
            size="sm"
            variant="ghost"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-80 shrink-0 bg-white border-l border-[#DFE3E4] shadow-lg flex flex-col transition-all duration-300">
      {/* Header with Collapse Button */}
      <CollapsibleRailHeader
        isExpanded={isExpanded}
        onToggle={onToggle}
        side="right"
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Plan Details with Edit Button */}
        <div className="p-4 flex flex-col gap-1 border-b border-[#DFE3E4]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#244348]">
                {plan.title}
              </h2>
              <p className="text-sm text-[#657A7E]">
                Created {formatDate(plan.createdAt)}
              </p>
            </div>
            <div className="relative group">
              <button
                onClick={() => onEdit()}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded transition-colors"
                aria-label="Edit plan details"
              >
                <EditIcon sx={{ fontSize: 20 }} className="text-[#385459]" />
              </button>
              {/* Tooltip */}
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#01272E] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                Edit
              </div>
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="px-4 py-3 flex items-start gap-3 group/item hover:bg-[#F8F9F9] transition-colors">
          <Avatar
            imageUrl={plan.avatarUrl}
            name={plan.ownerName}
            size="sm"
            className="shrink-0 mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#244348]">Client</h3>
            <p className={`text-sm mt-0.5 ${plan.ownerName ? 'text-[#657A7E]' : 'text-[#96A5A8]'}`}>
              {plan.ownerName || 'No client'}
            </p>
          </div>
          <IconButton
            icon={<EditIcon sx={{ fontSize: 16 }} />}
            tooltip="Edit client"
            onClick={() => onEdit('owner')}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover/item:opacity-100 transition-opacity"
          />
        </div>

        {/* Dietary Preferences */}
        <div className="px-4 py-3 flex items-start gap-3 group/item hover:bg-[#F8F9F9] transition-colors">
          <RestaurantIcon sx={{ fontSize: 24 }} className="text-[#657A7E] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#244348]">Dietary preferences</h3>
            <p className={`text-sm mt-0.5 ${plan.dietaryPreferences ? 'text-[#657A7E]' : 'text-[#96A5A8]'}`}>
              {plan.dietaryPreferences || 'No dietary preferences'}
            </p>
          </div>
          <IconButton
            icon={<EditIcon sx={{ fontSize: 16 }} />}
            tooltip="Edit dietary preferences"
            onClick={() => onEdit('dietaryPreferences')}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover/item:opacity-100 transition-opacity"
          />
        </div>

        {/* Goals */}
        <div className="px-4 py-3 flex items-start gap-3 group/item hover:bg-[#F8F9F9] transition-colors">
          <TrackChangesIcon sx={{ fontSize: 24 }} className="text-[#657A7E] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#244348]">Goals</h3>
            <p className={`text-sm mt-0.5 ${plan.goals ? 'text-[#657A7E]' : 'text-[#96A5A8]'}`}>
              {plan.goals || 'No goals'}
            </p>
          </div>
          <IconButton
            icon={<EditIcon sx={{ fontSize: 16 }} />}
            tooltip="Edit goals"
            onClick={() => onEdit('goals')}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover/item:opacity-100 transition-opacity"
          />
        </div>

        {/* Exclusions */}
        <div className="px-4 py-3 flex items-start gap-3 group/item hover:bg-[#F8F9F9] transition-colors">
          <ExclusionIcon sx={{ fontSize: 24 }} className="text-[#657A7E] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#244348]">Exclusions</h3>
            <p className={`text-sm mt-0.5 ${plan.exclusions ? 'text-[#657A7E]' : 'text-[#96A5A8]'}`}>
              {plan.exclusions || 'No exclusions'}
            </p>
          </div>
          <IconButton
            icon={<EditIcon sx={{ fontSize: 16 }} />}
            tooltip="Edit exclusions"
            onClick={() => onEdit('exclusions')}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover/item:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPlanDetails;
