// Recipe placeholder images
// These are inline SVG data URLs that match the Figma designs

export const RECIPE_PLACEHOLDERS = [
  // Coral/Peach placeholder
  `data:image/svg+xml,%3Csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='200' fill='%23F5C5B3'/%3E%3Ccircle cx='90' cy='60' r='35' fill='%23F0B09A' opacity='0.6'/%3E%3Cellipse cx='70' cy='130' rx='25' ry='35' fill='%23F0B09A' opacity='0.7'/%3E%3Ccircle cx='200' cy='130' r='45' fill='%23F0B09A' opacity='0.5'/%3E%3Ccircle cx='215' cy='145' r='15' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='205' cy='155' rx='8' ry='15' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='225' cy='155' rx='8' ry='15' fill='%23FFFFFF' opacity='0.8'/%3E%3C/svg%3E`,

  // Mint green placeholder
  `data:image/svg+xml,%3Csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='200' fill='%23C8E6D7'/%3E%3Ccircle cx='90' cy='60' r='35' fill='%23A8D4BD' opacity='0.6'/%3E%3Cellipse cx='70' cy='130' rx='25' ry='35' fill='%23A8D4BD' opacity='0.7'/%3E%3Ccircle cx='200' cy='130' r='45' fill='%23A8D4BD' opacity='0.5'/%3E%3Ccircle cx='215' cy='145' r='15' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='205' cy='155' rx='8' ry='15' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='225' cy='155' rx='8' ry='15' fill='%23FFFFFF' opacity='0.8'/%3E%3C/svg%3E`,

  // Light blue placeholder
  `data:image/svg+xml,%3Csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='200' fill='%23C8DEE8'/%3E%3Ccircle cx='90' cy='60' r='35' fill='%23A8C8D9' opacity='0.6'/%3E%3Cellipse cx='70' cy='130' rx='25' ry='35' fill='%23A8C8D9' opacity='0.7'/%3E%3Ccircle cx='200' cy='130' r='45' fill='%23A8C8D9' opacity='0.5'/%3E%3Ccircle cx='215' cy='145' r='15' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='205' cy='155' rx='8' ry='15' fill='%23FFFFFF' opacity='0.8'/%3E%3Cellipse cx='225' cy='155' rx='8' ry='15' fill='%23FFFFFF' opacity='0.8'/%3E%3C/svg%3E`,
];

/**
 * Get a consistent placeholder image for a recipe based on its ID
 * This ensures the same recipe always gets the same placeholder
 */
export const getRecipePlaceholder = (recipeId: string): string => {
  // Use a simple hash of the recipe ID to consistently select a placeholder
  const hash = recipeId.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const index = Math.abs(hash) % RECIPE_PLACEHOLDERS.length;
  return RECIPE_PLACEHOLDERS[index];
};
