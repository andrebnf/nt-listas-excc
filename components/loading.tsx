import styled, { DefaultTheme, keyframes } from "styled-components";
import { SpinnerIos as Spinner } from "@styled-icons/fluentui-system-filled/SpinnerIos";

type Size = 'small' | 'large' | 'xlarge' | 'xxlarge';

interface StyledIconWrapProps {
  readonly size: Size;
  readonly theme: DefaultTheme;
}

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const StyledIcon = styled(Spinner)<StyledIconWrapProps>`
  animation: ${rotate} 1s linear infinite;
  width: ${({theme, size}) => theme.iconSize[size]};
  height: ${({theme, size}) => theme.iconSize[size]};
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`;

const LoadingText = styled.p`
  font-size: ${({theme}) => theme.fontSize.xlarge};
  font-weight: bold;
  margin-top: ${({theme}) => theme.space[2]};
`

export const Loading = ({size = 'small'}: { size: Size }) => { 

  return (
    <LoadingWrapper>
      <StyledIcon size={size}/>
      <LoadingText>
        Carregando
      </LoadingText>
    </LoadingWrapper>
  )
}