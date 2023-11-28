import { ReactElement } from "react";
import styled from "styled-components";

import { SimpleTag } from "./SimpleTag";

const TagWrapper = styled(SimpleTag)`
  padding: 2px 20px;
  color: ${({ theme }) => theme.palette.colors.XANADU};
  font-size: 12px;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.palette.colors.ALTO};
  background: ${({ theme }) => theme.palette.colors.CONCRETE};
`;

export const ShrinkTag = ({ children }: { children: string }): ReactElement => {
  return <TagWrapper>{children}</TagWrapper>;
};
