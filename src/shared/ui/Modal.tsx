import { createPortal } from "react-dom";
import { useClickOutsideToClose } from "../hook/useClickOutsideToClose";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <Backdrop onClose={onClose}>
      <ModalContent onClose={onClose}>{children}</ModalContent>
    </Backdrop>,
    document.body,
  );
};

const Backdrop = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const { onMouseDown, onMouseUp } = useClickOutsideToClose(onClose);

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      tabIndex={-1}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

const ModalContent: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => (
  <div
    className="relative rounded-lg bg-white p-6"
    onClick={(e) => e.stopPropagation()}
    role="dialog"
    aria-modal="true"
    tabIndex={-1}
  >
    <CloseButton onClose={onClose} />
    {children}
  </div>
);

const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute top-2 right-2 cursor-pointer text-xl"
    aria-label="Close modal"
  >
    X
  </button>
);

export default Modal;
