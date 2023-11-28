import { WidgetProps } from "@rjsf/utils";

import { removeUserInput } from "../../edi-edit/helpers";
import { getFallbackTextForCode } from "../../edi/edi.utils";
import { FieldDescriptionPopover } from "../components";

function SelectWidget(props: WidgetProps) {
  const { label, value: valueProp, schema } = props;

  const value = removeUserInput(valueProp);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { "x12-codes": codes } = schema as any;

  if (!value || typeof value === "number") {
    return null;
  }

  const shortValue = value.split("_").pop() ?? "";

  let valueToDisplay =
    codes[value]?.description ?? codes[shortValue]?.description ?? value;

  if (valueToDisplay.includes("_")) {
    valueToDisplay = getFallbackTextForCode(valueToDisplay);
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
      : <strong>{valueToDisplay}</strong>
    </div>
  );
}

export { SelectWidget };

