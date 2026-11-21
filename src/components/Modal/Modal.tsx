import { createPortal } from "react-dom"
import styles from "./Modal.module.css"
import { useEffect } from "react";

type ModalProps = {
    children?: React.ReactNode;
    active: boolean;
    setActive: (value: boolean) => void;
    onNext? : () => void;
    onPrev? : () => void;
}

const Modal = ({ children, active, setActive, onNext, onPrev}: ModalProps) => {

useEffect(() => {
    if (!active) return;

    const onKeyDown = (e: KeyboardEvent) => {
           if (e.key === "Escape") {
                setActive(false);
           }
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;   // запоминаем, что было
    document.body.style.overflow = "hidden";

    return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = prevOverflow;      // возвращаем
    };
}, [active, setActive]);


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
