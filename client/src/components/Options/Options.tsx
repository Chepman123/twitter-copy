import { useEffect, useRef, useState, type CSSProperties } from "react";
import classes from './Options.module.css'
export default function Options({editFunc,deleteFunc}:{editFunc:()=>void,deleteFunc:()=>void}){
    const [opened, setWindow] = useState<boolean>(false);
     const windowRef = useRef<HTMLDivElement>(null);
     function openWindow() {
        setWindow(!opened);
    }
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (windowRef.current && !windowRef.current.contains(event.target as Node)) {
                setWindow(false);
            }
        }

        if (opened) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [opened]);
    return <div className={classes.div}>
    <button onClick={(e) => {
        e.preventDefault(); 
      e.stopPropagation();
      openWindow()
    }} type="button" className={classes.button}>︙</button>
        <div ref={windowRef} className={classes.buttons} style={(opened ? { display: 'block' } : { display: 'none' }) as CSSProperties}>
            <button onClick={(e)=>{  e.preventDefault(); 
      e.stopPropagation();editFunc()}} className={classes.OptionButton}>Edit</button>
            <button onClick={(e)=>{  e.preventDefault(); 
      e.stopPropagation(); deleteFunc()}} className={classes.OptionButton}>Remove</button>
        </div>
    </div>
}