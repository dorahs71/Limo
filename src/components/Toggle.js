import { Toggle } from 'react-toggle-component';

import styled from 'styled-components';

const Label = styled.label`
  font-weight: bold;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  white-space: nowrap;
  align-items: center;
  cursor: pointer;
`;

export default function ToggleBtn() {
  return (
    <Label htmlFor="toggle-3">
      <Toggle
        height="30px"
        width="60px"
        knobWidth="23px"
        knobHeight="23px"
        leftBackgroundColor="tomato"
        rightBackgroundColor="#00cca3"
        borderColor="#444"
        knobColor="white"
        name="toggle-3"
        onToggle={(e) => console.log('onToggle', e.target.checked)}
      />
    </Label>
  );
}
