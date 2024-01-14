import React from 'react';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const Count = styled.div`
  width: 2px;
  position: relative;
  height: 20px;
  margin: 0 auto;

  @keyframes drawLine {
    to {
      height: 20px;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 100%;
    content: '';
    background-color: #000;
    animation: drawLine 2s forwards ease-out;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(2px, 1fr));
  gap: 8px;
  position: absolute;
  top: 10px;
  right: 10px;
  transform: scale(-100%, 100%);
  & > :first-child {
    transform: scale(-100%, 100%);
  }
`;

const Counter = ({ timesForToday }: { timesForToday: string[] }) => (
  <Container
    data-tooltip-id="my-tooltip"
    data-tooltip-content={String(timesForToday.length)}
  >
    <Tooltip id="my-tooltip" />
    {timesForToday.map((time, index) => (
      <Count key={index} />
    ))}
  </Container>
);

export default Counter;
