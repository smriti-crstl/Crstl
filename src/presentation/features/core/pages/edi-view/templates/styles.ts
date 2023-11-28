import styled from "styled-components";

export const SectionTitleLineContainer = styled.div`
  text-align: center;
  border-bottom: 1px dashed ${({ theme }) => theme.palette.colors.DUSTY_GRAY};
  line-height: 0.1em;
  margin: 24px 0;

  span {
    padding: 0 20px;
    font-weight: 500;
    font-size: 18px;
    background-color: ${({ theme }) => theme.palette.background.PRIMARY};
  }
`;

export const SectionTitleContainer = styled.div`
  padding: 0;
  font-weight: 500;
  font-size: 18px;
  background-color: ${({ theme }) => theme.palette.background.PRIMARY};
`;

