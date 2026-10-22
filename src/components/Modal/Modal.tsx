import { createPortal } from "react-dom"
import styles from "./Modal.module.css"

type ModalProps = {
    children?: React.ReactNode;
    active: boolean;
    setActive: (value: boolean) => void;
    onNext? : () => void;
    onPrev? : () => void;
}

const Modal = ({ children, active, setActive, onNext, onPrev}: ModalProps) => {
  return createPortal(
    <div className={`${styles.modal} ${active ? styles.activeModal : ""}`} onClick={() => setActive(false)}>
        <div className={`${styles.modalContent} ${active ? styles.activeModal : ""}`} onClick={(event) => event.stopPropagation()}>
            
                {onPrev && (
                    <button onClick={onPrev}>←</button>
                )}

                {children}

                {onNext && (
                    <button onClick={onNext}>→</button>
                )}
        </div>
    </div>,
    document.body
  )
}

  export default Modal
