import { useEffect, useRef } from 'react';
import { ModalProps } from '../../types/nutrition';

const Modal = ({ isOpen, onClose, children, className = '' }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-xl shadow-[0px_4px_18px_rgba(1,39,46,0.15)] w-[502px] max-w-full max-h-[90vh] overflow-hidden animate-fade-in ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
