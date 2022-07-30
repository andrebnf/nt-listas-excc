import styled, { keyframes, DefaultTheme } from "styled-components"

type Size = 'small' | 'large';

interface StyledIconWrapProps {
  readonly size: Size;
}

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const StyledIconWrap = styled.span<StyledIconWrapProps>`
  top: 2px;
  position: relative;

  svg {
    animation: ${rotate} 0.5s linear infinite;
  }

  svg {
    width: ${({theme, size}) => theme.iconSize[size]};
    height: ${({theme, size}) => theme.iconSize[size]};
  }
`

export const StyledReactIcon = ({ children, isRotating = false, size = 'small' }: { 
  children: React.ReactNode,
  isRotating?: boolean,
  size?: Size
 }) => {
  return (
    <StyledIconWrap className={isRotating ? "rotating" : ""} size={size}>
      {children}  
    </StyledIconWrap>
  );
}
