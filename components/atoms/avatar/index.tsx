import { Avatar } from "antd";
import styled from "styled-components";

export const AvatarWithBackground = styled(Avatar)`
  margin-right: ${({ theme }) => theme.spacing.SMALL};
  background-color: ${({ theme }) => theme.palette.colors.MISCHKA};
`;
