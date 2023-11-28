import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  border-radius: 4px;
  padding: 20px 32px;
  margin: 22px 28px;
`;

