import styled from "styled-components";

interface IErrorContainer {
  height?: number;
}

export const ErrorContainer = styled.div<IErrorContainer>`
  height: ${(props) => `${props.height}px`};
`;

export const RjsfErrorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const RjsfErrorTitle = styled.p`
  margin-top: 20px;
  color: ${({ theme }) => theme.palette.colors.BLACK};
  opacity: 45%;
`;
