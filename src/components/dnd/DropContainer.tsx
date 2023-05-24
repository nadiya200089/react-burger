import React, { ReactElement } from 'react';
import { useDrop } from "react-dnd";

interface IDropContainer {
  typeAccept?: string;
  onDropHandler: (arg0: any) => void;
  children?: ReactElement;
}


const DropContainer: React.FC<IDropContainer>  = ({
  children,
  onDropHandler,
  typeAccept = "ingredient",
}) => {
  const [{ isHover }, dropTarget] = useDrop({
    accept: typeAccept,
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <div className="drop-provider" ref={dropTarget}>
      {children}
    </div>
  );
};

export default DropContainer;
