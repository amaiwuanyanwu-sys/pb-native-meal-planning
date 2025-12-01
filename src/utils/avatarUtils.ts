// Predefined color palette for avatars matching the design system
const AVATAR_COLORS = [
  '#168AA9', // lake
  '#C77700', // gold
  '#5C58A4', // lavender
  '#B24CCD', // plum
  '#385459', // neutrals-700
  '#657A7E', // neutrals-600
];

/**
 * Extract initials from a name (first and last name)
 * @param name - Full name (e.g., "John Doe")
 * @returns Initials (e.g., "JD")
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  const first = parts[0].charAt(0).toUpperCase();
  const last = parts[parts.length - 1].charAt(0).toUpperCase();

  return `${first}${last}`;
};

/**
 * Simple hash function to convert string to number
 * @param str - String to hash
 * @returns Hash number
 */
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

/**
 * Get a consistent color for an avatar based on the name
 * @param name - Person's name
 * @returns Hex color code
 */
export const getAvatarColor = (name: string): string => {
  const hash = hashString(name);
  const index = hash % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

/**
 * Generate a realistic photo avatar URL
 * Uses randomuser.me API for high-quality, realistic human photos
 * @param gender - Gender to determine avatar ('male' or 'female')
 * @param seed - Unique seed to ensure consistent avatar for the same person
 * @returns Avatar URL
 */
export const generatePhotoAvatar = (
  gender: 'male' | 'female' = 'female',
  seed: string
): string => {
  // Use randomuser.me API which provides realistic, high-quality photos
  // The seed parameter ensures the same person always gets the same photo
  return `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${seed}.jpg`;
};
