import { MealPlan } from '../../types/nutrition';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface MealPlanCardProps {
  mealPlan: MealPlan;
  variant?: 'horizontal' | 'grid'; // horizontal for scrolling layout, grid for grid layout
}

const MealPlanCard = ({ mealPlan, variant = 'horizontal' }: MealPlanCardProps) => {
  const imageCount = mealPlan.images.length;

  // Determine grid layout based on number of images
  const getGridLayout = () => {
    if (imageCount === 1) {
      return 'grid-cols-1 grid-rows-1'; // Single image fills entire area
    } else if (imageCount === 2) {
      return 'grid-cols-2 grid-rows-1'; // 2 column layout
    } else if (imageCount === 3) {
      return 'grid-cols-2 grid-rows-2'; // 2x2 grid, with last cell empty
    } else {
      return 'grid-cols-2 grid-rows-2'; // 2x2 grid for 4 or more
    }
  };

  const renderImages = () => {
    const images = mealPlan.images.slice(0, 4);

    if (imageCount === 3) {
      // Special layout: 2 on top, 1 on bottom (spanning 2 columns)
      return (
        <>
          {images.slice(0, 2).map((image, index) => (
            <div key={index} className="relative overflow-hidden">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="relative overflow-hidden col-span-2">
            <img src={images[2]} alt="" className="w-full h-full object-cover" />
          </div>
        </>
      );
    }

    // For 1, 2, or 4+ images, render normally
    return images.map((image, index) => (
      <div key={index} className="relative overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
    ));
  };

  const widthClass = variant === 'horizontal' ? 'w-60' : 'w-full';

  return (
    <div className={`bg-white border border-[#DFE3E4] rounded-lg overflow-hidden flex-shrink-0 ${widthClass}`}>
      {/* Image Grid */}
      <div className={`h-[120px] border-b border-[#DFE3E4] grid ${getGridLayout()}`}>
        {renderImages()}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-[#244348]">
          {mealPlan.name}
        </h3>
        <div className="flex flex-wrap gap-3 text-xs text-[#657A7E]">
          <div className="flex items-center gap-1">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <span className="font-medium">{mealPlan.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <RestaurantIcon sx={{ fontSize: 14 }} />
            <span className="font-medium">{mealPlan.recipesCount} recipes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
