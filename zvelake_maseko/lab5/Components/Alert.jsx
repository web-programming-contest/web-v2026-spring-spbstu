import React,{ useState, useEffect } from "react"

export default function Alert({message, type, setShowAlert}){
    const duration = 5000;
    const [show, setShow] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setShow(true);
            setTimeout(()=>{
                setShow(false);
            }, duration);
        }, 1000);
    },[]);
    return (<div className={`alert modal ${type} ${show ? ' show' : ''}`}>
        <div className="alert-message">
            <i className={'icon fa-solid ' + type === 'success' ? 'fa-check' : 'fa-x'}></i>
            <span>{message}</span>
        </div>
    </div>)
}
