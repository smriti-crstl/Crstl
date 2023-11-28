import { toNumber } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { RJSFSchema, WidgetProps } from "@rjsf/utils";

import { removeUserInput } from "../../edi-edit/helpers";
import { timePatterns } from "../../edi-edit/widgets/TextWidget";
import { getFallbackTextForCode } from "../../edi/edi.utils";
import { FieldDescriptionPopover } from "../components";
import { TimeWidget } from "./TimeWidget";

interface ExtendedSchema extends RJSFSchema {
  "x12-format"?: string;
}

interface TextWidgetProps extends WidgetProps {
  schema: ExtendedSchema;
}

function TextWidget(props: TextWidgetProps) {
  const { value: valueProp, label, schema } = props;

  let timeFormat;
  if (schema?.pattern) {
    timeFormat = timePatterns[schema?.pattern];
  }

  const x12Format = schema["x12-format"];
  const isTime = x12Format === "HHMM" || !!timeFormat;

  if (isTime) {
    return <TimeWidget {...props} />;
  }

  let value = removeUserInput(valueProp);

  if (!value) {
    return null;
  }

  // to show currency values
  if (
    (label.toLowerCase().includes("amount") ||
      label.toLowerCase().includes("price") ||
      label.toLowerCase().includes("cost")) &&
    !isNaN(toNumber(value))
  ) {
    value = currencyUSDFormatter(toNumber(value));
  }

  if (value.includes("_")) {
    value = getFallbackTextForCode(value);
  }

  return (
    <div className="form-label">
      {schema?.description ? (
        <FieldDescriptionPopover
          title={label}
          description={schema.description}
        />
      ) : (
        <span>{label}</span>
      )}
      : <strong>{value}</strong>
    </div>
  );
}

export { TextWidget };

