'use client'; // src/App.tsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

// Styled components
const AppContainer = styled.div<{ animationStarted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  ${({ animationStarted }) =>
    animationStarted &&
    css`
      background-color: #3498db;
      transition: background-color 2s ease-in-out;
    `}
`;

const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const App: React.FC = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const startAnimation = () => {
    setAnimationStarted(true);

    document.body.classList.add('wave-animation');

    const currentDateTime = new Date().toLocaleString();
    const existingDateTimes = JSON.parse(
      localStorage.getItem('dateTimes') || '[]'
    );
    const updatedDateTimes = [...existingDateTimes, currentDateTime];
    localStorage.setItem('dateTimes', JSON.stringify(updatedDateTimes));
  };

  return (
    <>
      <AppContainer animationStarted={animationStarted}>
        <StartButton onClick={startAnimation}>Start Animation</StartButton>
      </AppContainer>
    </>
  );
};

export default App;
