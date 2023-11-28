import { Row } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { GenericHeading } from "../../atoms/typography";

type Props = {
  children: ReactNode;
};

const Wrapper = styled(Row)`
  height: 50px;
  box-shadow: 0px 4px 11px 0px rgba(212, 217, 228, 0.25);
  padding-left: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.LARGE};
`;

export const HeaderBar = ({ children }: Props): ReactElement => {
  return (
    <Wrapper align="middle">
      <GenericHeading
        size="XS"
        weight="REGULAR"
        $removeMargin
        style={{ margin: "1rem" }}
      >
        {children}
      </GenericHeading>
    </Wrapper>
  );
};
