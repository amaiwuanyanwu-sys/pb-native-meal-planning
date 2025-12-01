import { SelectOption } from '../types/nutrition';

/**
 * Extract first name from full name
 * @param fullName - Full name (e.g., "Sarah Klein")
 * @returns First name (e.g., "Sarah")
 */
export const getFirstName = (fullName: string): string => {
  const parts = fullName.trim().split(' ');
  return parts[0];
};

/**
 * Generate auto-populated plan name based on owner selection
 * @param ownerId - Selected owner ID or 'template'
 * @param owners - Array of available owners
 * @returns Auto-populated plan name
 */
export const generatePlanName = (
  ownerId: string | null,
  owners: SelectOption[]
): string => {
  if (ownerId === 'template') {
    return 'New template';
  }

  if (!ownerId) {
    return '';
  }

  const owner = owners.find(o => o.id === ownerId);
  if (!owner || !owner.name.trim()) {
    return '';
  }

  const firstName = getFirstName(owner.name);
  return `${firstName}'s nutrition plan`;
};
