import { Select } from "antd";
import clsx from "clsx";

import { WidgetProps } from "@rjsf/utils";

import { FieldDescriptionPopover } from "../components";
import { removeUserInput } from "../helpers";

function SelectWidget(props: WidgetProps) {
  const {
    id,
    label,
    value: valueProp,
    schema,
    onChange: onChangeProp,
    required,
    rawErrors,
    disabled,
    readonly,
    formContext,
  } = props;

  const value = removeUserInput(valueProp);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { "x12-codes": codes } = schema as any;

  function onChange(e: any) {
    onChangeProp(e);
  }

  const onFocus = () => {
    // * formContext?.setIsFormDirty?.(true); is used in the edi-setup tab
    // setting isFormDirty on focus because the text field is not registering a field change for the first character typed
    formContext?.setIsFormDirty?.(true);
  };

  const options = codes ? Object.values(codes) : [];

  if (options.length === 0) {
    console.log("NO OPTIONS");
    return null;
  }

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
            <Select
              id={id}
              defaultValue={value}
              onChange={onChange}
              disabled={disabled}
              aria-readonly={readonly}
              onFocus={onFocus}
            >
              {options?.map((option: any) => {
                return (
                  <Select.Option key={option.code} value={option.code}>
                    {option.description ?? option.code}
                  </Select.Option>
                );
              })}
            </Select>
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

export { SelectWidget };

