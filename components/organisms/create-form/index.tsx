import { Col, ColProps, Form, Row, RowProps } from "antd";
import { CSSProperties, ReactElement } from "react";

import {
  ComponentTypes,
  FromMappings,
} from "@crstl/components/molecules/form-mappings";

import { FormFields } from "./interface";

export type CreateFormProps<T = unknown> = T & {
  formFields: FormFields;
  componentType: ComponentTypes;
  style?: CSSProperties;
  placeholder?: string;
  colProps?: ColProps;
  disabled?: boolean;
};

export const CreateForm = ({
  data,
  rowProps,
}: {
  data: CreateFormProps[];
  rowProps?: RowProps;
}): ReactElement => {
  return (
    <Row {...rowProps}>
      {data.map(({ formFields, colProps, ...rest }) => {
        return (
          <Col key={formFields.field} {...colProps} span={colProps?.span || 24}>
            <Form.Item {...formFields}>
              <FromMappings {...rest} />
            </Form.Item>
          </Col>
        );
      })}
    </Row>
  );
};
