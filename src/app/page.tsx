'use client'; // src/App.tsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const appearSeconds = 3;

// Styled components
const AppContainer = styled.div<{ animationStarted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: background-color 2s ease-in-out;
  ${({ animationStarted }) =>
    animationStarted &&
    css`
      background-color: #3498db;
      transition: background-color ${appearSeconds}s ease-in-out;
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

    // Your animation logic here
    document.body.classList.add('wave-animation');

    // Add the current date and time to local storage
    const currentDateTime = new Date().toLocaleString();
    const existingDateTimes = JSON.parse(
      localStorage.getItem('dateTimes') || '[]'
    );
    const updatedDateTimes = [...existingDateTimes, currentDateTime];
    localStorage.setItem('dateTimes', JSON.stringify(updatedDateTimes));

    // Set a timeout to remove the animation class after 2 seconds (adjust as needed)
    setTimeout(() => {
      setAnimationStarted(false);
      document.body.classList.remove('wave-animation');
    }, appearSeconds * 1000);
  };

  return (
    <>
      <AppContainer animationStarted={animationStarted}>
        {JSON.parse(localStorage.getItem('dateTimes') || '[]').map(() => '|')}
        <StartButton onClick={startAnimation}>Start Animation</StartButton>
      </AppContainer>
    </>
  );
};

export default App;
