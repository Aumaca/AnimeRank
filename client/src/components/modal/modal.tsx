import { FC, ReactNode } from 'react';
import './modal.css';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  backgroundColor: string;
}

const Modal: FC<ModalProps> = ({ isOpen, children, backgroundColor }) => {
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-content" style={{backgroundColor: backgroundColor}}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
