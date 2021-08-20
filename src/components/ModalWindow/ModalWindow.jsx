import React from 'react';
import "./ModalWindow.css"

const ModalWindow = ({children, visible, setVisible}) => {

    let rootClasses = "modalWindow"
    if(visible){
        rootClasses = "modalWindow active"
    }

    return (
        <div className={rootClasses} onClick={() => setVisible(false)}>
            <div className="modalWindowContent" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;
