import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import chroma from 'chroma-js';
import { animTime } from '../constants';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div<{ animationStarted: boolean }>`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  transition: background-color 1s ease-in-out;
`;

const Circle = styled.div<{
  animationstarted: boolean;
  size: number;
  color: string;
  delay: number;
}>`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  z-index: 2;
  opacity: 0;
  animation-fill-mode: both;

  ${({ size }) =>
    size &&
    css`
      width: ${size}px;
      height: ${size}px;
    `}
  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
    `}
  
  ${({ delay, animationstarted }) =>
    animationstarted &&
    css`
      animation: ${fadeInOut} ${animTime}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `}
`;

const createList = (
  numItems: number,
  colorScheme?: chroma.Scale<chroma.Color>
) => {
  const list = [];
  const gradient = colorScheme
    ? colorScheme
    : chroma.scale([chroma.random(), chroma.random()]).mode('lab');

  for (let i = 0; i < numItems; i++) {
    const color = gradient(i / (numItems - 1)).hex();
    const radius = 18 + (numItems - i) * 10;
    const delay = i * 0.1;

    list.push({
      color,
      radius,
      delay,
    });
  }
  return list;
};

const AppContainer = ({
  animationStarted,
  children,
}: {
  animationStarted: boolean;
  children: React.ReactNode;
}) => (
  <Container animationStarted={animationStarted}>
    {createList(30).map((item, index) => (
      <Circle
        animationstarted={animationStarted}
        key={index}
        size={item.radius}
        color={item.color}
        delay={item.delay}
      ></Circle>
    ))}
    <Circle
      animationstarted={animationStarted}
      key={'index'}
      size={createList(30)[0].radius}
      color={'white'}
      delay={animTime / 6}
    ></Circle>
    <div style={{ zIndex: 3 }}>{children}</div>
  </Container>
);

export default AppContainer;
