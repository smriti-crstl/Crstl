import { Row } from "antd";
import { isArray, isObject } from "lodash";
import React from "react";

import { ObjectFieldTemplateProps } from "@rjsf/utils";

function checkFormData(formData: unknown) {
  if (isObject(formData)) {
    const values = Object.values(formData);
    const hasComplexValues = values.some(
      (value) => isArray(value) || isObject(value)
    );
    const result = hasComplexValues ? false : true;
    return result;
  }

  return false;
}

export function ObjectFieldTemplateQuickEntry(props: ObjectFieldTemplateProps) {
  const { formData } = props;

  const isFieldsContainer = checkFormData(formData);

  const children = props.properties.map((element) => (
    <React.Fragment key={element.name}>{element.content}</React.Fragment>
  ));

  return (
    <>{isFieldsContainer ? <Row gutter={16}>{children}</Row> : children}</>
  );
}

