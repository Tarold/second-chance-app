import React from 'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';

const Container = styled.div<{ animationstarted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  transition: background-color 1s ease-in-out;
  ${({ animationstarted }) =>
    animationstarted &&
    css`
      & > ${Circle} {
        opacity: 0.1;

        transform: scale(1);
        transition: 2s ease-in-out;
      }
    `}
`;

const Circle = styled.div<{ size: string; color: string; delay: string }>`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  z-index: -1;
  transform: scale(0);
  opacity: 0;

  ${({ size }) =>
    size &&
    css`
      width: ${size};
      height: ${size};
    `}
  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
    `}
  ${({ delay }) =>
    css`
      transition-delay: ${delay};
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
    const radius = `${(numItems - i) * 70}px`;
    const delay = `${i * 0.1}s`;

    list.push({
      color,
      radius,
      delay,
    });
  }
  return list;
};

const list = createList(30);

const AppContainer = ({
  animationStarted,
  children,
}: {
  animationStarted: boolean;
  children: React.ReactNode;
}) => (
  <Container animationstarted={animationStarted}>
    {list.map((item, index) => (
      <Circle
        key={index}
        size={item.radius}
        color={item.color}
        delay={item.delay}
      ></Circle>
    ))}
    {children}
  </Container>
);

export default AppContainer;
