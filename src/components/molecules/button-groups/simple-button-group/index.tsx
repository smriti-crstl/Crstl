import { Col, Row } from "antd";
import { ReactElement } from "react";

import {
  ColoredButton,
  ColoredButtonProps,
} from "components/atoms/buttons";

interface IButtonProps extends ColoredButtonProps {
  text: string;
}

export type SimpleButtonGroupProps = {
  firstButtonProps: IButtonProps;
  secondButtonProps: IButtonProps;
};

export const SimpleButtonGroup = ({
  firstButtonProps,
  secondButtonProps,
}: SimpleButtonGroupProps): ReactElement => {
  return (
    <Row gutter={8}>
      <Col>
        <ColoredButton type="default" {...firstButtonProps}>
          {firstButtonProps.text}
        </ColoredButton>
      </Col>
      <Col>
        <ColoredButton {...secondButtonProps}>
          {secondButtonProps.text}
        </ColoredButton>
      </Col>
    </Row>
  );
};
