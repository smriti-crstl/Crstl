import {
  BootStrapButtonStyles,
  BootStrapFormStyles,
} from "globals/themes/BootStrapStyles";
import { RjsfErrorBoundary } from "presentation/features/common/components/ErrorBoundary/RjsfErrorBoundary";
import React, { forwardRef, useEffect, useState } from "react";

import { FormProps } from "@rjsf/core";
import { RJSFValidationError } from "@rjsf/utils";

import { DynamicFormContainer } from "./styles";

declare global {
  interface Window {
    JSONSchemaForm: {
      default: any;
    };
  }
}

const Form = window?.JSONSchemaForm?.default;

interface EdiFormProps extends Omit<FormProps, "validator"> {
  controlled?: boolean;
}

// https://github.com/ajv-validator/ajv/tree/6a671057ea6aae690b5967ee26a0ddf8452c6297#error-parameters
function transformErrors(errors: RJSFValidationError[]): RJSFValidationError[] {
  return errors.map((error) => {
    if (error.name === "required") {
      error.message = "is a required field";
    }
    return error;
  });
}

function EdiForm(props: EdiFormProps, ref: React.Ref<any>) {
  const {
    schema,
    uiSchema,
    formData: formDataProp,
    controlled,
    widgets,
    ...rest
  } = props;

  const [formData, setFormData] = useState(() => formDataProp);

  useEffect(() => {
    if (controlled) {
      setFormData(formDataProp);
    }
  }, [controlled, formDataProp]);

  return (
    <DynamicFormContainer>
      <BootStrapFormStyles>
        <BootStrapButtonStyles>
          <RjsfErrorBoundary isError={!Form}>
            <Form
              schema={schema}
              columns={3}
              uiSchema={uiSchema}
              formData={formData}
              ref={ref}
              widgets={widgets}
              onChange={(newState: any) => {
                setFormData(newState.formData);
              }}
              transformErrors={transformErrors}
              {...rest}
            />
          </RjsfErrorBoundary>
        </BootStrapButtonStyles>
      </BootStrapFormStyles>
    </DynamicFormContainer>
  );
}

const EdiFormWithRef = forwardRef(EdiForm);

export { EdiFormWithRef as EdiForm };

