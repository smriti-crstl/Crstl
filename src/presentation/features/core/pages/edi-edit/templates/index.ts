import { ArrayFieldTemplate } from "./ArrayFieldTemplate";
import { CustomFieldTemplate } from "./CustomFieldTemplate";
import { ErrorListTemplate } from "./ErrorListTemplate";
import { ObjectFieldTemplateFullEntry } from "./ObjectFieldTemplateFullEntry";

const customTemplates = {
  ArrayFieldTemplate,
  FieldTemplate: CustomFieldTemplate,
  ErrorList: ErrorListTemplate,
  DescriptionFieldTemplate: ErrorListTemplate,
  ObjectFieldTemplate: ObjectFieldTemplateFullEntry,
};

export { customTemplates };
export * from "./getTemplates";

