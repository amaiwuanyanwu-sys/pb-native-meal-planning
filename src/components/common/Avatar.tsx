import { AvatarProps } from '../../types/nutrition';
import { getInitials, getAvatarColor } from '../../utils/avatarUtils';
import AddIcon from '@mui/icons-material/PersonAddOutlined';

const Avatar = ({ imageUrl, name, size = 'md', className = '' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);

  // Check if there's no client (empty name, null, or 'Unassigned')
  const hasNoClient = !name || name.trim() === '' || name === 'Unassigned';

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white overflow-hidden ${className}`}
      style={{ backgroundColor: imageUrl ? 'transparent' : hasNoClient ? '#DFE3E4' : backgroundColor }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : hasNoClient ? (
        <AddIcon sx={{ fontSize: iconSizes[size], color: '#385459' }} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
