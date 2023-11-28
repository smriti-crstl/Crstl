import styled from "styled-components";

export const HeaderShadowContainerWithoutTabs = styled.div`
  height: 20px;
  box-shadow: ${({ theme }) => theme.shadows.HEADER};
  background: ${({ theme }) => theme.palette.background.PRIMARY};
  padding-left: 4rem;
  padding-right: 1rem;
`;
