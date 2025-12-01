import Button from '../common/Button';
import AddIcon from '@mui/icons-material/Add';

interface NutritionPlansHeaderProps {
  onNewClick: () => void;
}

const NutritionPlansHeader = ({ onNewClick }: NutritionPlansHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-semibold text-[#01272E]">
        Nutrition Plans
      </h1>
      <Button iconPosition='left' onClick={onNewClick} icon={<AddIcon sx={{ fontSize: 20 }} />}>
        New nutrition plan
      </Button>
    </div>
  );
};

export default NutritionPlansHeader;
