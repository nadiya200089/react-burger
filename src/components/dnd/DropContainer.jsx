import React from "react";
import { useDrop } from "react-dnd";

const DropContainer = ({
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
