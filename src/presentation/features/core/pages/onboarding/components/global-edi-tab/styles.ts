import styled from "styled-components";

export const SectionWrapper = styled.div`
  padding: 20px 35px;
  border: 1px solid ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  border-radius: 10px;
  width: 64%;
  margin: auto;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

