import { Form, FormProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

type Props = FormProps & {
  $shrinkFormItemsGap?: boolean;
};

const FormWrapper = styled(Form)<Props>`
  .ant-form-item-explain-error {
    white-space: pre-wrap;
  }
  .ant-form-item {
    margin-bottom: ${({ $shrinkFormItemsGap }) =>
      $shrinkFormItemsGap && "1rem"};
  }
`;

export const BaseForm = (props: Props): ReactElement => {
  return <FormWrapper {...props} />;
};
