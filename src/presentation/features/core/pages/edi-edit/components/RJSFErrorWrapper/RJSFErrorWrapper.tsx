import { FieldErrors } from "@rjsf/utils";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  fieldErrors?: FieldErrors;
};

export const RJSFErrorWrapper = ({ children, fieldErrors }: Props) => {
  return (
    <div className="ant-form ant-form-vertical">
      <div
        className={clsx(
          "ant-row ant-form-item",
          fieldErrors?.__errors?.length ? "ant-form-item-has-error" : null
        )}
      >
        <div className="ant-col ant-form-item-control">
          <div className="ant-form-item-control-input">{children}</div>
          {fieldErrors?.__errors?.length ? (
            <div className="ant-form-item-explain ant-form-item-explain-error">
              {fieldErrors?.__errors?.map((error) => (
                <div role="alert" key={error}>
                  {error}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
