import { Owner } from '../types/nutrition';
import { mockNutritionPlans } from './mockNutritionPlans';

// Extract unique owners from existing nutrition plans to maintain consistency
const extractUniqueOwners = (): Owner[] => {
  const ownerMap = new Map<string, Owner>();

  mockNutritionPlans.forEach((plan, index) => {
    if (!ownerMap.has(plan.ownerName)) {
      ownerMap.set(plan.ownerName, {
        id: `owner-${index + 1}`,
        name: plan.ownerName,
        avatarUrl: plan.avatarUrl,
      });
    }
  });

  return Array.from(ownerMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

export const mockOwners: Owner[] = extractUniqueOwners();
