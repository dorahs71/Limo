import styled from 'styled-components';
import { fabric } from 'fabric';
import { useState } from 'react';
import { DeleteOutlined, TextFields, FormatBold } from '@material-ui/icons';

export default function EditCardText({ trigger, canvas }) {
  const [color, setColor] = useState('#000');

  function addText() {
    console.log(canvas);
    const editText = new fabric.IText('點我編輯', {
      top: 100,
      left: 100,
      fontSize: 25,
    });
    canvas.add(editText);
  }

  function toggleBoldText() {
    const obj = canvas.getActiveObject();
    if (trigger && obj !== null) {
      canvas.getActiveObject().set('fontWeight', 'bold');
      canvas.renderAll();
    }
  }

  const handleTextColor = (e) => {
    if (trigger && e.target !== null) {
      let newColor = e.target.value;
      setColor(newColor);
      canvas.getActiveObject()?.set('fill', newColor);
      canvas.renderAll();
    }
  };

  const deleteText = () => {
    const obj = canvas.getActiveObject();
    if (trigger && obj !== null) {
      canvas.remove(obj);
    }
  };

  return (
    <TextFunction>
      <AddText onClick={addText} />
      <ColorInput
        type="color"
        value={color}
        onChange={(e) => {
          handleTextColor(e);
        }}
        id="text-color"
        size="10"
      />
      <BoldText onClick={toggleBoldText} />
      <DeleteText onClick={deleteText} />
    </TextFunction>
  );
}

const TextFunction = styled.div`
  width: 10vmin;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 5vw;
`;

const AddText = styled(TextFields)`
  transform: scale(1.5);
  color: #c5cdc0;
  cursor: pointer;
  margin-bottom: 3vmin;
  &:hover {
    color: #75e799;
  }
`;

const ColorInput = styled.input`
  margin-bottom: 3vmin;
  cursor: pointer;
`;

const BoldText = styled(FormatBold)`
  transform: scale(1.5);
  color: #c5cdc0;
  cursor: pointer;
  margin-bottom: 3vmin;
  &:hover {
    color: #75e799;
  }
`;

const DeleteText = styled(DeleteOutlined)`
  transform: scale(1.5);
  color: #c5cdc0;
  cursor: pointer;
  margin-bottom: 3vmin;
  &:hover {
    color: #75e799;
  }
`;
