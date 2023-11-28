import { Input } from "antd";
import clsx from "clsx";

import { RJSFSchema, WidgetProps } from "@rjsf/utils";

import { FieldDescriptionPopover } from "../components";
import { removeUserInput } from "../helpers";
import { TimeWidget } from "./TimeWidget";

interface ExtendedSchema extends RJSFSchema {
  "x12-format"?: string;
}

interface TextWidgetProps extends WidgetProps {
  schema: ExtendedSchema;
}

// the comments alongside each element describes the EDI format required
// the values of each key is the format required by the antd TimePicker
export const timePatterns: Record<string, string> = {
  "^([01][0-9]|2[0-3]):([0-5][0-9])$": "HH:mm", // HH:MM
  "^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$": "HH:mm:ss", // HH:MM:SS
  "^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]{1})?$": "HH:mm:ss", // HH:MM:SS.d
  "^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]{2})?$": "HH:mm:ss", // HH:MM:SS.dd
  "^([01][0-9]|2[0-3]):([0-5][0-9])((:([0-5][0-9]))(\\.[0-9]{1,2})?)?$":
    "HH:mm:ss", // Any available format
};

function TextWidget(props: TextWidgetProps) {
  const {
    value: valueProp,
    id,
    label,
    schema,
    onChange: onChangeProp,
    required,
    rawErrors,
    disabled,
    readonly,
    formContext,
  } = props;

  let timeFormat;

  if (schema?.pattern) {
    timeFormat = timePatterns[schema?.pattern];
  }

  const x12Format = schema["x12-format"];
  const isTime = x12Format === "HHMM" || !!timeFormat;

  if (isTime) {
    return <TimeWidget {...props} timeFormat={timeFormat} />;
  }

  const value = removeUserInput(valueProp);

  function onChange(e: any) {
    onChangeProp(e.target.value);
  }

  const onFocus = () => {
    // * formContext?.setIsFormDirty?.(true); is used in the edi-setup tab
    // setting isFormDirty on focus because the text field is not registering a field change for the first character typed
    formContext?.setIsFormDirty?.(true);
  };

  return (
    <div className="ant-form ant-form-vertical">
      <div
        className={clsx(
          "ant-row ant-form-item",
          rawErrors?.length ? "ant-form-item-has-error" : null
        )}
      >
        <div className="ant-col ant-form-item-label">
          <label
            htmlFor={id}
            className={clsx("ant-form-label", {
              "ant-form-item-required": required,
            })}
          >
            <div className="form-label">
              {schema?.description ? (
                <FieldDescriptionPopover
                  title={label}
                  description={schema.description}
                />
              ) : (
                <span>{label}</span>
              )}
            </div>
          </label>
        </div>
        <div className="ant-col ant-form-item-control">
          <div className="ant-form-item-control-input">
            <Input
              id={id}
              name={id}
              value={value}
              onChange={onChange}
              disabled={disabled}
              readOnly={readonly}
              onFocus={onFocus}
            />
          </div>
          {rawErrors?.length ? (
            <div className="ant-form-item-explain ant-form-item-explain-error">
              {rawErrors.map((error) => (
                <div role="alert" key={error}>
                  {schema.title} {error}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { TextWidget };

