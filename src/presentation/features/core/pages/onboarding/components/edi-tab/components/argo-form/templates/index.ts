import { ArrayFieldTemplate } from "./ArrayFieldTemplate";
import { CustomFieldTemplate } from "./CustomFieldTemplate";
import { ErrorListTemplate } from "./ErrorListTemplate";
import { ObjectFieldTemplate } from "./ObjectFieldTemplate";

export const customTemplates = {
  ArrayFieldTemplate,
  FieldTemplate: CustomFieldTemplate,
  ErrorList: ErrorListTemplate,
  DescriptionFieldTemplate: ErrorListTemplate,
  ObjectFieldTemplate,
};

