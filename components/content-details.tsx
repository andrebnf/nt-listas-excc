import styled from "styled-components";

const ContentDetailsContainer = styled.div`
  padding-top: ${({theme}) => theme.space[2]};
  padding-left: ${({theme}) => theme.space[4]};
  padding-right: ${({theme}) => theme.space[2]};
  
  overflow-y: auto;

  pre {
    border: 1px solid ${({ theme }) => theme.colors.contentCodeBorder};
    color: ${({ theme }) => theme.colors.textDarkGray};
    padding: ${({theme}) => theme.space[2]};
    overflow: auto;
  }
`

const ContentText = styled.div`
  font-size: ${({theme}) => theme.fontSize.large};
`

interface ContentDetailsProps {
  breadcrumb: string,
  content: string,
  title: string
}

export const ContentDetails = ({breadcrumb, content, title}: ContentDetailsProps) => (
  <ContentDetailsContainer>
    <h4>{breadcrumb}</h4>
    <h1>{title}</h1>

    <ContentText dangerouslySetInnerHTML={{ __html: content }} />
  </ContentDetailsContainer>  
)