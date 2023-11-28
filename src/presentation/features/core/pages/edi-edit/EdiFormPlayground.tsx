import { amplitude } from "presentation/utils";
import {
  ButtonsContainer,
  ContainerBordered,
  DebugContainer,
  DebugFormField,
  // DynamicFormContainer,
  FormContainer,
  FormHeader,
  FormHeaderContainer,
  HighlightedButton,
  PageWrapper,
  QuickLinkButton,
  QuickLinks,
  QuickLinksContainer,
} from "./EdiEditPage.styles";
import { Affix, Button } from "antd";
import clsx from "clsx";
import React from "react";
import { customTemplates } from "./templates";
import { customWidgets } from "./widgets";
// import enhancedSchema from "./856-schema-mclane.json";
// import formUiSchema from "./856-uischema.json";
// import jedi from "./856-jedi-mclane.json";
import { EdiForm } from "./EdiForm";
import { get } from "lodash";

function tryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch (ex) {
    return {};
  }
}

function EdiFormPlayground() {
  const form = React.useRef<HTMLFormElement>(null);
  const [schemaValue, setSchemaValue] = React.useState("");
  const [formDataInputValue, setFormData] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  const [isQuickEntry, setIsQuickEntry] = React.useState(true);

  function toggleQuickEntry() {
    return setIsQuickEntry((v) => !v);
  }

  function triggerSubmit() {
    if (form.current?.formElement) {
      form.current?.formElement.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  }

  function onSchemaValueChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setSchemaValue(value);
  }

  function onUiSchemaValueChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setFormData(value);
  }

  const parsedFormData = tryParse(formDataInputValue);
  const formData = get(
    parsedFormData,
    "file.json_edi.interchanges[0].groups[0].transaction_sets[0]",
    {}
  );

  const schemaData = tryParse(schemaValue);

  const { enhancedSchema, fullEntryUISchema, quickEntryUISchema } = schemaData;

  const formUiSchema = isQuickEntry ? quickEntryUISchema : fullEntryUISchema;

  return (
    <PageWrapper>
      <DebugContainer>
        <DebugFormField>
          <label>
            <div>Schema, and form ui schema</div>
            <textarea value={schemaValue} onChange={onSchemaValueChange} />
          </label>
        </DebugFormField>
        <DebugFormField>
          <label>
            <div>Form data</div>
            <textarea
              value={formDataInputValue}
              onChange={onUiSchemaValueChange}
            />
          </label>
        </DebugFormField>
      </DebugContainer>
      <ContainerBordered>
        <FormContainer>
          <QuickLinksContainer>
            {isQuickEntry ? (
              <QuickLinks>
                <HighlightedButton>Quick Entry Form</HighlightedButton>
                <QuickLinkButton
                  to="/"
                  replace
                  onClick={(e) => {
                    e.preventDefault();
                    toggleQuickEntry();
                    amplitude.logClickEvent(`EDI ASN Full Entry Form`);
                  }}
                >
                  Full Entry Form
                </QuickLinkButton>
              </QuickLinks>
            ) : (
              <QuickLinks>
                <QuickLinkButton
                  to="/"
                  replace
                  onClick={(e) => {
                    e.preventDefault();
                    toggleQuickEntry();
                    amplitude.logClickEvent(`EDI ASN Full Entry Form`);
                  }}
                >
                  Quick Entry Form
                </QuickLinkButton>
                <HighlightedButton>Full Entry Form</HighlightedButton>
              </QuickLinks>
            )}
          </QuickLinksContainer>
          <Affix
            offsetTop={0}
            onChange={(affixed) => {
              pinHeader(affixed ?? false);
            }}
            className={clsx({ "pinned-header": isHeaderPinned })}
          >
            <FormHeaderContainer>
              <FormHeader>
                <h2>
                  Form - {isQuickEntry ? "Quick Entry" : "Full Entry"} Form
                </h2>
                <ButtonsContainer>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      // submitForm(true);
                      triggerSubmit();
                    }}
                    loading={isSaving}
                  >
                    Save and Send
                  </Button>
                </ButtonsContainer>
              </FormHeader>
            </FormHeaderContainer>
          </Affix>
          <EdiForm
            schema={enhancedSchema ?? {}}
            uiSchema={formUiSchema?.properties ?? {}}
            formData={formData}
            ref={form}
            widgets={customWidgets}
            onSubmit={(e) => {
              console.log("on submit called: ", e);
            }}
            controlled
            {...customTemplates}
          />
        </FormContainer>
      </ContainerBordered>
    </PageWrapper>
  );
}

export { EdiFormPlayground as default };
