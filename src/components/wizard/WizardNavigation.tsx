import Button from '../common/Button';
import { KeyboardArrowRightIcon } from '../../utils/wizardIcons';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from '../common/IconButton';

interface WizardNavigationProps {
  onNext: () => void;
  onPrevious?: () => void;
  onCancel?: () => void;
  nextLabel: string;
  showPrevious?: boolean;
  showCancel?: boolean;
  isNextDisabled?: boolean;
}

const WizardNavigation = ({
  onNext,
  onPrevious,
  onCancel,
  nextLabel,
  showPrevious = false,
  showCancel = false,
  isNextDisabled = false,
}: WizardNavigationProps) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#F8F9F9] border-t border-[#C1C9CB] py-4 px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side - Cancel */}
        <div>
          {showCancel && onCancel && (
            <Button
              onClick={onCancel}
              variant="ghost"
              size="lg"
              className="text-[#385459] hover:bg-[#F0F2F3]"
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Right Side - Previous + Next */}
        <div className="flex items-center gap-3">
          {showPrevious && onPrevious && (
            <IconButton
              onClick={onPrevious}
              variant='secondary'
              tooltip='Previous'
              size='lg'
              icon={<KeyboardArrowLeftIcon sx={{ fontSize: 24 }} />}
            />
          )}

          <Button
            onClick={onNext}
            variant="primary"
            size="lg"
            disabled={isNextDisabled}
            icon={<KeyboardArrowRightIcon sx={{ fontSize: 24 }} />}
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WizardNavigation;
