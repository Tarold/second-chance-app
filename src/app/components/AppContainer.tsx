import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import chroma from 'chroma-js';
import {
  animCirclesCount,
  animDelay,
  animDelayWhiteCircles,
  animTime,
} from '../constants';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  transition: background-color 1s ease-out;
`;

const Circle = styled.div<{
  animationstarted: boolean;
  size: number;
  color: string;
  delay: number;
  animtime?: number;
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
  ${({ delay, animationstarted, animtime }) =>
    animationstarted &&
    css`
      animation: ${fadeInOut} ${animtime ? animtime : animTime}s ease-out
        forwards;
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
    const radius = 250 - i * 6;
    const delay = i * animDelay;

    list.push({
      color,
      radius,
      delay,
    });
  }
  list.push({
    color: 'inherit',
    radius: 252,
    animtime: (animTime / 3) * 2,
    delay: animDelayWhiteCircles,
  });
  return list;
};

const ChildrenContainer = styled.div`
  z-index: 5;
`;

const AppContainer = ({
  animationStarted,
  children,
}: {
  animationStarted: boolean;
  children: React.ReactNode;
}) => (
  <Container>
    {createList(animCirclesCount).map((item, index) => (
      <Circle
        animationstarted={animationStarted}
        key={index}
        size={item.radius}
        color={item.color}
        delay={item.delay}
        animtime={item.animtime}
      ></Circle>
    ))}
    <ChildrenContainer>{children}</ChildrenContainer>
  </Container>
);

export default AppContainer;
