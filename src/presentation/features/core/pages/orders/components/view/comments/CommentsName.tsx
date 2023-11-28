import { Row } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import {
  GenericHeading,
  GenericSubHeading,
} from "@crstl/components/atoms/typography";

const Wrapper = styled(Row)``;

type Props = {
  name: string;
  extraContent?: ReactNode;
};

export const CommentsName = ({ extraContent, name }: Props): ReactElement => {
  return (
    <Wrapper justify="space-between" align="middle">
      <GenericHeading $removeMargin size="XS" weight="MEDIUM">
        {name}
      </GenericHeading>
      <GenericSubHeading $removeMargin size="XXS" weight="REGULAR">
        {extraContent}
      </GenericSubHeading>
    </Wrapper>
  );
};
