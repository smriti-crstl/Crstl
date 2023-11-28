import { ArrayFieldAccordionTemplate } from "./ArrayFieldAccordionTemplate";
import { ArrayFieldTemplate } from "./ArrayFieldTemplate";
import { CustomFieldTemplate } from "./CustomFieldTemplate";
import { ErrorListTemplate } from "./ErrorListTemplate";
import { ObjectFieldTemplateFullEntry } from "./ObjectFieldTemplateFullEntry";
import { ObjectFieldTemplateQuickEntry } from "./ObjectFieldTemplateQuickEntry";

function getTemplates({
  quickEntryForm = true,
}: { quickEntryForm?: boolean } = {}) {
  const templates = {
    ArrayFieldTemplate: quickEntryForm
      ? ArrayFieldTemplate
      : ArrayFieldAccordionTemplate,
    FieldTemplate: CustomFieldTemplate,
    ErrorList: ErrorListTemplate,
    DescriptionFieldTemplate: ErrorListTemplate,
    ObjectFieldTemplate: quickEntryForm
      ? ObjectFieldTemplateQuickEntry
      : ObjectFieldTemplateFullEntry,
  };

  return templates;
}

export { getTemplates };

