import moment from "moment";

import { WidgetProps } from "@rjsf/utils";

import { removeUserInput } from "../../edi-edit/helpers";
import { FieldDescriptionPopover } from "../components";

function DateWidget(props: WidgetProps) {
  const { value: valueProp, label, schema } = props;

  const safeValueProp = removeUserInput(valueProp);

  const date = moment(safeValueProp);
  const isValidDate = valueProp ? date.isValid() : false;
  const value = isValidDate ? date : null;

  if (!value) {
    return null;
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
      : <strong>{value?.format("YYYY-MM-DD")}</strong>
    </div>
  );
}

export { DateWidget };

