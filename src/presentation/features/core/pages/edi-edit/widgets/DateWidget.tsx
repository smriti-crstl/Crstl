import { DatePicker } from "antd";
import clsx from "clsx";
import moment from "moment";
import styled from "styled-components";

import { WidgetProps } from "@rjsf/utils";

import { FieldDescriptionPopover } from "../components";
import { removeUserInput } from "../helpers";

const FullWidthDatePicker = styled.div`
  width: 100%;
  .ant-picker {
    width: 100%;
  }
`;

function DateWidget(props: WidgetProps) {
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

  function onChange(date: moment.Moment | null) {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      onChangeProp(formattedDate);
    } else {
      onChangeProp("");
    }
  }

  const onFocus = () => {
    // * formContext?.setIsFormDirty?.(true); is used in the edi-setup tab
    // setting isFormDirty on focus because the text field is not registering a field change for the first character typed
    formContext?.setIsFormDirty?.(true);
  };

  const safeValueProp = removeUserInput(valueProp);

  const date = moment(safeValueProp);
  const isValidDate = valueProp ? date.isValid() : false;
  const value = isValidDate ? date : null;

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
            <FullWidthDatePicker>
              <DatePicker
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                inputReadOnly={readonly}
                onFocus={onFocus}
              />
            </FullWidthDatePicker>
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

export { DateWidget };

