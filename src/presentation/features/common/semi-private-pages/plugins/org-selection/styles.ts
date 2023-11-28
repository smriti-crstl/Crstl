import { Link } from "react-router-dom";
import styled from "styled-components";

export const ForgotPasswordSpan = styled.span`
  margin-left: 8px;
  font-size: 12px;
`;

export const ResetPasswordLink = styled(Link)`
  text-decoration: underline !important;
  color: ${({ theme }) => theme.palette.text.PRIMARY} !important;
`;

