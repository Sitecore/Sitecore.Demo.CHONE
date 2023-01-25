import { FC, PropsWithChildren, ReactNode } from 'react';
import Modal from '../Modal/Modal';

interface Props {
  children: PropsWithChildren<ReactNode>;
  isOpen: boolean;
  onClose: () => void;
}

const SliderModal: FC<Props> = ({ children, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default SliderModal;
