import "../Modals/Modal.css";
interface prop {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}
const Modal = ({ isOpen, onClose, children }: prop) => {
  if (!isOpen) return null;
  return (
    <div className="top-div">
      <div className="bottom-dev">
        <div onClick={onClose} className="close-icon">
          X
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
