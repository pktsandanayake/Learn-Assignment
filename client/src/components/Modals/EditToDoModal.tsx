import React from "react";
interface prop {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}
const EditToDoModal = ({ isOpen, onClose, children }: prop) => {
  if (!isOpen) return null;
  return (
    <div
      // onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          height: 350,
          width: 700,
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
      >
        <div onClick={onClose} className="close-icon">
          X
        </div>
        {children}
      </div>
    </div>
  );
};

export default EditToDoModal;
