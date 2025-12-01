import { Recipe } from '../../types/nutrition';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IngredientIcon from '../icons/IngredientIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#DFE3E4] rounded-lg overflow-hidden transition-shadow hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Recipe Image */}
      <div className="relative w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 border-b border-[#DFE3E4]">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <RestaurantIcon sx={{ fontSize: 48, color: '#C1C9CB' }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#244348] leading-[1.4] line-clamp-2">
            {recipe.name}
          </h3>
          {/* Metadata */}
          <div className="flex flex-wrap gap-2 items-center">
            {recipe.prepTime && (
              <div className="flex items-center gap-0.5">
                <AccessTimeIcon sx={{ fontSize: 16, color: '#657A7E' }} />
                <span className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                  {recipe.prepTime} mins
                </span>
              </div>
            )}
            {recipe.ingredients && (
              <div className="flex items-center gap-0.5">
                <IngredientIcon sx={{ fontSize: 16, color: '#657A7E' }} />
                <span className="text-xs font-medium text-[#657A7E] leading-[1.5]">
                  {recipe.ingredients} ingredients
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
