// Button.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface StyledButtonProps {
  power: number; // Power of the northern lights glow (0 to 1)
  isAnimating: boolean; // Flag to determine if the button is animating
}

// Animation keyframes for the glow effect
const glowAnimation = keyframes`
  to {
    box-shadow: 0 0 20px 10px rgba(173, 216, 230, 0),
      0 0 20px 10px rgba(173, 216, 230, 0),
      0 0 20px 10px rgba(173, 216, 230, 0);
  }
`;

// Animation keyframes for the filling effect
const fillAnimation = keyframes`
  from {
    background-position: 50% 50%;
    background-size: 0% 0%;
    box-shadow: 0 0 20px 10px rgba(173, 216, 230, 0);
  }
  to {
    background-size: 200% 200%;
    box-shadow: 0 0 20px 10px rgba(173, 216, 230, 0.8),
      0 0 20px 10px rgba(173, 216, 230, 0.8),
      0 0 20px 10px rgba(173, 216, 230, 0.8);
  }
`;

// Styled button with animated Lampyridae-like glow and filling effect
const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: transparent;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, 'Segoe UI', Roboto,
    'Helvetica Neue', 'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell,
    'Droid Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Lucida Grande', Helvetica, Arial, sans-serif;
  font-size: 60px;
  min-height: 365px;
  min-width: 365px;
  padding: 20px;
  font-weight: 600;
  border-radius: 50%;
  overflow: hidden;
  background: radial-gradient(
    ellipse at center,
    rgba(173, 216, 230, 0.8),
    rgba(173, 216, 230, 0) 70%
  );
  background-size: ${({ isAnimating }) =>
    isAnimating ? '200% 200%' : '100% 100%'};
  box-shadow: ${({ isAnimating }) =>
    isAnimating
      ? '0 0 20px 10px rgba(173, 216, 230, 0.8), 0 0 20px 10px rgba(173, 216, 230, 0.8), 0 0 20px 10px rgba(173, 216, 230, 0.8)'
      : 'none'};
  transition: background-size 0.5s ease-in-out, box-shadow 0.5s ease-in-out;

  &.animation-active {
    animation: ${fillAnimation} 2s forwards, ${glowAnimation} 2s 2s forwards; // 2s for filling and 2s for glow
  }

  &.animation-inactive {
    box-shadow: none;
    background-size: 100% 100%;
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  power?: number; // Power of the northern lights glow (0 to 1)
}

const Button: React.FC<ButtonProps> = ({ onClick, children, power = 1 }) => {
  const [isAnimating, setAnimating] = React.useState(false);

  const handleMouseDown = () => {
    setAnimating(true);
    onClick();
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  return (
    <StyledButton
      onMouseDown={handleMouseDown}
      onAnimationEnd={handleAnimationEnd}
      isAnimating={isAnimating}
      className={isAnimating ? 'animation-active' : 'animation-inactive'}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
