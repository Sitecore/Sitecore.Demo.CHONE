import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  children: PropsWithChildren<ReactNode>;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
