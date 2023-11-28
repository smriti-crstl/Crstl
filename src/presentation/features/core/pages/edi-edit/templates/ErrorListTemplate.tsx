/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ErrorListProps, RJSFSchema, RJSFValidationError } from "@rjsf/utils";
import { Alert, Tooltip } from "antd";
import { dropRight, get } from "lodash";
import styled from "styled-components";
import { DownCircleOutlined } from "@ant-design/icons";
import { convertPropertyToId } from "../helpers";
import _ from "lodash";

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
  const getTitle = (str?: string): string => {
    if (!str) return "";
    const arr = str.split("_");
    const word = arr.slice(0, arr.length - 1).join(" ");
    return _.capitalize(word);
  };

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

    // some fields don't have title and fieldSchema is Boolean value, in those cases we default to the missingProperty
    const title =
      fieldSchema?.title || getTitle(error?.params?.missingProperty);

    return {
      error,
      fieldSchema: { title },
    };
  });

  return items;
}

function ErrorListTemplate(props: ErrorListProps) {
  const errorsWithFieldSchema = getErrorsWithFieldSchema(props);

  const scrollToError = (id: string) => {
    if (id) {
      const element = document?.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // TODO: add 110 to a variable
        window.scrollBy({
          top: rect.top - 110,
          behavior: "smooth",
        });
      }
    }
  };

  const errorLines = errorsWithFieldSchema?.map((errorWithFieldSchema) => {
    const { error, fieldSchema } = errorWithFieldSchema;
    const id = convertPropertyToId(error?.property);
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onClick={() => scrollToError(id)}
        key={error.stack}
      >
        <p>
          {fieldSchema.title} {error.message}
        </p>
        <Tooltip title={"Scroll to this error and fix"}>
          <DownCircleOutlined />
        </Tooltip>
      </div>
    );
  });

  const messageComponent = (
    <MessageContainer>
      <p>
        <strong>Fix the following errors</strong>
      </p>
      {errorLines}
    </MessageContainer>
  );

  return <Alert showIcon message={messageComponent} type="error" closable />;
}

export { ErrorListTemplate };

