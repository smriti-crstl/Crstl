import { ErrorListProps, RJSFSchema, RJSFValidationError } from "@rjsf/utils";
import { Alert } from "antd";
import { dropRight, get } from "lodash";
import styled from "styled-components";

const MessageContainer = styled.div`
  p {
    margin: 0;
  }
`;

interface FieldSchema {
  title: string;
}

function getErrorsWithFieldSchema({
  errors,
  schema,
}: {
  errors: RJSFValidationError[];
  schema: RJSFSchema;
}): Array<{ error: RJSFValidationError; fieldSchema: FieldSchema }> {
  const items = errors.map((error) => {
    const { schemaPath: rawSchemaPath, params } = error;
    const rawSchemaPathWithoutLeadingSlash = rawSchemaPath?.replace("#/", "");
    const schemaParts = rawSchemaPathWithoutLeadingSlash?.split("/");
    const schemaPath = dropRight(schemaParts).join(".");
    const schemaData = get(schema, schemaPath);

    const defaultTitle = schemaData?.title;

    const fieldSchema: FieldSchema = get(
      schemaData?.properties,
      params.missingProperty,
      {
        title: defaultTitle,
      }
    );

    return {
      error,
      fieldSchema,
    };
  });

  return items;
}

function ErrorListTemplate(props: ErrorListProps) {
  const errorsWithFieldSchema = getErrorsWithFieldSchema(props);

  const errorLines = errorsWithFieldSchema?.map((errorWithFieldSchema) => {
    const { error, fieldSchema } = errorWithFieldSchema;
    return (
      <p key={error.stack}>
        {fieldSchema.title} {error.message}
      </p>
    );
  });

  const messageComponent = (
    <MessageContainer>
      <p>
        <strong>Something went wrong</strong>
      </p>
      {errorLines}
    </MessageContainer>
  );

  return <Alert showIcon message={messageComponent} type="error" closable />;
}

export { ErrorListTemplate };
