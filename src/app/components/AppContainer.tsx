import React from 'react';
import styled, { css } from 'styled-components';

const AppearSeconds = 2;

const Container = styled.div<{ animationStarted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  transition: background-color 1.3s ease-in-out;
  ${({ animationStarted }) =>
    animationStarted &&
    css`
      background-color: #3498db;
      transition: background-color ${AppearSeconds}s ease-in-out;
    `}
`;

const AppContainer = ({
  animationStarted,
  children,
}: {
  animationStarted: boolean;
  children: React.ReactNode;
}) => <Container animationStarted={animationStarted}>{children}</Container>;

export default AppContainer;
