// StartButton.tsx
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const StartButton = ({ onClick }: { onClick: () => void }) => (
  <Button onClick={onClick}>Count</Button>
);

export default StartButton;
