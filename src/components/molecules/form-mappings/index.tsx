import { ReactElement } from "react";

import { SimpleCheckbox } from "components/atoms/checkbox";
import {
  EmailInput,
  NumberInput,
  PasswordInput,
  SimpleInput,
} from "components/atoms/inputs";
import {
  CommonSelect,
  MultiTagsSelect,
  SingleSelect,
} from "components/atoms/selects";

export type ComponentTypes =
  | "simple-input"
  | "email"
  | "password"
  | "input-number"
  | "multi-tags-select"
  | "single-select"
  | "common-select"
  | "checkbox";

export type FormMappingsProps = {
  componentType: ComponentTypes;
};

export const FromMappings = ({
  componentType,
  ...rest
}: FormMappingsProps): ReactElement => {
  switch (componentType) {
    case "simple-input":
      return <SimpleInput {...rest} />;
    case "input-number":
      return <NumberInput {...rest} />;
    case "email":
      return <EmailInput {...rest} />;
    case "password":
      return <PasswordInput {...rest} />;
    case "multi-tags-select":
      return <MultiTagsSelect {...rest} />;
    case "single-select":
      return <SingleSelect {...rest} />;
    case "common-select":
      return <CommonSelect {...rest} />;
    case "checkbox":
      return <SimpleCheckbox {...rest} />;
    default:
      return <div>Field not found</div>;
  }
};
