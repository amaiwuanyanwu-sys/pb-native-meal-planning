import { WizardIcon } from '../../utils/wizardIcons';
import Avatar from '../common/Avatar';

interface WizardContextBarProps {
  planName: string;
  ownerName: string;
  ownerAvatarUrl: string | null;
}

const WizardContextBar = ({ planName, ownerName, ownerAvatarUrl }: WizardContextBarProps) => {
  return (
    <div className="sticky top-0 bg-[#F0F2F3] px-6 py-2 flex items-center justify-center gap-3 border-b border-[#DFE3E4] z-10">
      {/* Plan Assistant Icon */}
      <div className="flex items-center gap-2">
        <WizardIcon sx={{ fontSize: 20 }} className="text-[#657A7E]" />
        <span className="text-sm font-semibold text-[#244348]">Plan Assistant</span>
      </div>

      {/* Divider */}
      <div className="h-3 w-px bg-[#DFE3E4]" />

      {/* Plan Info */}
      <div className="flex items-center gap-2">
        <Avatar imageUrl={ownerAvatarUrl} name={ownerName} size="sm" />
        <span className="text-sm font-medium text-[#385459]">{planName}</span>
      </div>
    </div>
  );
};

export default WizardContextBar;
