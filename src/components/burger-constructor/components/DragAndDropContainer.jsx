import React from 'react';
import { useDrop } from "react-dnd";

const DropTarget = ({children, onDropHandler, typeAccept = "ingredient" }) => {
    const [{isHover}, dropTarget] = useDrop({
        accept: typeAccept,
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const borderColor = isHover ? 'red' : 'pink';
    return (
            <div
                className='drop-provider'
                ref={dropTarget}
                style={{borderColor}}
            >
                {children}
            </div>
    );
};

export default DropTarget; 