import "../Modals/Modal.css";
interface prop {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}
const MessagModal = ({ isOpen, onClose, children }: prop) => {
  if (!isOpen) return null;
  return (
    <div className="top-div">
      <div className="bottom-dev">
        <div onClick={onClose} className="close-icon">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MessagModal;
