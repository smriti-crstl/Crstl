import { WidgetProps } from "@rjsf/utils";

import { createTime } from "../../edi-edit/helpers";
import { FieldDescriptionPopover } from "../components";

function TimeWidget(props: WidgetProps) {
  const { value: valueProp, label, schema } = props;

  if (!valueProp) {
    return null;
  }

  const value = createTime(valueProp);

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
      : <strong>{value?.format("HH:mm:ss")}</strong>
    </div>
  );
}

export { TimeWidget };

