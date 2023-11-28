import { Link } from "react-router-dom";
import styled from "styled-components";

export const ResetPasswordWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.MEDIUM} ${theme.spacing.XL}`};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > form {
    width: 80%;
    max-width: 22.5rem;
  }
`;

export const DisclaimerText = styled.span`
  margin-left: 8px;
  font-size: 12px;
`;

export const LoginLink = styled(Link)`
  text-decoration: underline !important;
  color: ${({ theme }) => theme.palette.text.PRIMARY} !important;
`;

