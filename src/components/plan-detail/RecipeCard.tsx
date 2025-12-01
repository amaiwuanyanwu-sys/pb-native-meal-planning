import { Recipe } from '../../types/nutrition';
import { getRecipePlaceholder } from '../../utils/recipePlaceholders';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const imageUrl = recipe.imageUrl || getRecipePlaceholder(recipe.id);

  return (
    <div className="flex flex-col gap-1">
      <div className="border border-[#DFE3E4] rounded-xl overflow-hidden h-[76px]">
        <img
          src={imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-xs font-semibold text-[#385459] line-clamp-2">
        {recipe.name}
      </p>
    </div>
  );
};

export default RecipeCard;
