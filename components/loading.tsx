import styled, { DefaultTheme, keyframes, useTheme } from "styled-components";
import { SpinnerIos as Spinner } from "@styled-icons/fluentui-system-filled/SpinnerIos";

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const StyledIcon = styled(Spinner)`
  animation: ${rotate} 1s linear infinite;
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

type Size = 'small' | 'large' | 'xlarge' | 'xxlarge';

export const Loading = ({size}: { size: Size }) => { 
  const theme = useTheme();
  const svgSize = theme.iconSize[size]

  return (
    <LoadingWrapper>
      <StyledIcon height={svgSize} width={svgSize}/>
      <LoadingText>
        Carregando
      </LoadingText>
    </LoadingWrapper>
  )
}