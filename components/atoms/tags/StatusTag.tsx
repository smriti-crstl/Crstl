import { ReactElement } from "react";
import styled from "styled-components";

import { SimpleTag } from "./SimpleTag";

const TagWrapper = styled(SimpleTag)`
  padding: 6px 20px;
  font-size: 12px;
  border-radius: 7px;
  color: ${({ theme }) => theme.palette.colors.PASTEL_SKY};
  border: 1px solid ${({ theme }) => theme.palette.colors.AQUA_BLUE};
  background: ${({ theme }) => theme.palette.colors.FROST_WHITE};
  display: none; // TODO: remove this when we have the real data
`;

const Status = styled.span`
  font-weight: 500;
`;

export const StatusTag = ({
  tagKey,
  status,
}: {
  tagKey: string;
  status: string;
}): ReactElement => {
  return (
    <TagWrapper>
      <span>{tagKey}: </span>
      <Status>{status}</Status>
    </TagWrapper>
  );
};
