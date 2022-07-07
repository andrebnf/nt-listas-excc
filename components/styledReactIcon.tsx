import styled from "styled-components"

const StyledIconWrap = styled.span`
  top: 2px;
  position: relative;
`

export const StyledReactIcon = ({ children }: { children: React.ReactNode }) => (
  <StyledIconWrap>
    {children}  
  </StyledIconWrap>
)
