import { FieldTemplateProps } from "@rjsf/utils";
import { Col } from "antd";
import { isArray, isObject } from "lodash";

function isComplexField({ formData, schema }: Partial<FieldTemplateProps>) {
  const hasComplexSchema =
    schema?.type === "array" || schema?.type === "object";

  const hasComplexData = isArray(formData) || isObject(formData);

  const result = hasComplexData || hasComplexSchema;

  return result;
}

function CustomFieldTemplate(props: FieldTemplateProps) {
  const { classNames, help, errors, children, formData, schema } = props;

  if (classNames?.includes("no-display")) {
    return null;
  }

  if (isComplexField({ formData, schema })) {
    return (
      <div className={classNames}>
        {children}
        {errors}
        {help}
      </div>
    );
  }

  return (
    <Col sm={24} lg={8} className={classNames}>
      {children}
      {errors}
      {help}
    </Col>
  );
}

export { CustomFieldTemplate };

