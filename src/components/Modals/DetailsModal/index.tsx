import { FC } from 'react';
import Modal, { Props as ReactModalProps } from 'react-modal';

type Props = ReactModalProps & {
  activeId?: number;
  onClose?: () => void;
};

const DetailsModal: FC<Props> = ({ isOpen, activeId, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <button onClick={onClose}>Close</button>
      <div style={{ color: 'black' }}>{activeId}</div>
    </Modal>
  );
};

export default DetailsModal;
