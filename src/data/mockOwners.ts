import { Owner } from '../types/nutrition';
import { generatePhotoAvatar } from '../utils/avatarUtils';

// Full list of potential clients (not just those with existing plans)
export const mockOwners: Owner[] = [
  {
    id: 'owner-1',
    name: 'Sarah Klein',
    avatarUrl: generatePhotoAvatar('female', '5'),
  },
  {
    id: 'owner-2',
    name: 'Emily Harper',
    avatarUrl: generatePhotoAvatar('female', '9'),
  },
  {
    id: 'owner-3',
    name: 'Layla Brown',
    avatarUrl: generatePhotoAvatar('female', '8'),
  },
  {
    id: 'owner-4',
    name: 'Amelia Thompson',
    avatarUrl: generatePhotoAvatar('female', '1'),
  },
  {
    id: 'owner-5',
    name: 'Maria Benson',
    avatarUrl: generatePhotoAvatar('female', '3'),
  },
  {
    id: 'owner-6',
    name: 'Mike Johnson',
    avatarUrl: generatePhotoAvatar('male', '12'),
  },
  {
    id: 'owner-7',
    name: 'David Chen',
    avatarUrl: generatePhotoAvatar('male', '15'),
  },
  {
    id: 'owner-8',
    name: 'Jessica Martinez',
    avatarUrl: generatePhotoAvatar('female', '10'),
  },
  {
    id: 'owner-9',
    name: 'Robert Wilson',
    avatarUrl: generatePhotoAvatar('male', '18'),
  },
  {
    id: 'owner-10',
    name: 'Lisa Anderson',
    avatarUrl: generatePhotoAvatar('female', '15'),
  },
].sort((a, b) => a.name.localeCompare(b.name));
