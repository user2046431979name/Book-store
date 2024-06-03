import React from "react";
import Backdrop from "./BackDrop";
import "bootstrap/dist/css/bootstrap.min.css";
import { Book } from "../../type";
interface Props extends React.PropsWithChildren {
  show: boolean;
  title: string | undefined;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({ show, title, children, onClose }) => {
  return (
    <>
      <Backdrop show={show} />
      <div
        className="modal show align-items-center"
        style={{ display: show ? "flex" : "none" }}
        onClick={onClose}
      >
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
