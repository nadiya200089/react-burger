import { useRef } from "react";
import { useDrag, useDrop,  } from "react-dnd";
import React, { ReactElement } from 'react';


interface IDragAndDrop {
  id: string;
  index: number;
  children: ReactElement;
  moveCard: (di: number , hi: number ) => void;
}


interface IItemDrag {
  id: string;
  index: number;
}

interface CollectedProps { 
  handlerId: string;
}
export const DragAndDropContainer: React.FC<IDragAndDrop> = ({ children, id, index, moveCard }) => {
  const ref = useRef<HTMLInputElement>(null);

  const [{ handlerId,  }, drop] = useDrop<IItemDrag, any, CollectedProps>({
    accept: "orderIngredients",
    collect: (monitor):CollectedProps => {
      return {
        handlerId: String(monitor.getHandlerId())
      };
    },
    hover(item: IItemDrag, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
     
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      //   if (!ref.current) return;

      //   const dragIndex = item.index;
      //   const hoverIndex =  index;
      //   if (dragIndex === hoverIndex) return;

      //   const hoverRect = ref.current?.getBoundingClientRect();
      //   const hoverDeltaY = (hoverRect.bottom - hoverRect.top)/2;

      //   const clientoffset = monitor.getClientOffset();

      //   moveCard(dragIndex, hoverIndex);
      //   item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "orderIngredients",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {children}
    </div>
  );
};
