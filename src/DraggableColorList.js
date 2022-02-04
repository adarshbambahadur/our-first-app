import React from 'react';
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({colors, removeColor}) => {
  return (
    <div>
        {colors.map((color, i) => (
            <DraggableColorBox index={i} key={color.name} color={color.color} name={color.name} handleClick={() => removeColor(color.name)} axis='xy'/>
          ))}
    </div>
  )
})

export default DraggableColorList;