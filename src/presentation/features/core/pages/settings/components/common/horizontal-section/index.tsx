import { Col, Row } from "antd";
import { ReactElement, ReactNode } from "react";

import { GenericHeading } from "components/atoms/typography";

type Props = {
  children: ReactNode;
  title: string;
  isTopSpaced?: boolean;
};

export const HorizontalSection = ({
  children,
  title,
  isTopSpaced,
}: Props): ReactElement => {
  return (
    <Row justify="center" align="top">
      <Col span={10} style={isTopSpaced ? { paddingTop: "8.5rem" } : {}}>
        <GenericHeading
          $alignCenter
          size="MD"
          weight="MEDIUM"
          style={{ margin: 0 }}
        >
          {title}
        </GenericHeading>
      </Col>
      <Col span={14}>{children}</Col>
    </Row>
  );
};
