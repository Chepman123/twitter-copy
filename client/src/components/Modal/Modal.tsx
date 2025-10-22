import { useRef, type ReactNode,useEffect } from "react";
import { createPortal } from "react-dom";
import classes from './Modal.module.css'

export default function Modal({children,open,onClick}:{children?:ReactNode,open:boolean,onClick:()=>void}){
   const modal = useRef<HTMLDialogElement>(null);
 
    useEffect(()=>{
        if(open) modal.current?.showModal();
        else modal.current?.close();
    },[open]);   

    return createPortal(
        <dialog ref={modal} className={classes.dialog}>{children}
        <div className={classes.buttonDiv}>
            <button className={classes.button} onClick={onClick}>X</button>
        </div>
        </dialog>,
        document.getElementById("rootModal")!
    )
}