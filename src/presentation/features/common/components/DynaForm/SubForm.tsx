import { Button, Form, Input, Select } from "antd";
import { Rule } from "antd/lib/form";
import { compact } from "lodash";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { CloseButton, SubFormContainer, SubFormGrid } from "./index.styles";

export interface SubFormProps {
  id: string;
  label: string;
  name: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: any[];
  children?: SubFormPropsChild[];
  fieldKey: number;
  onChange?: any;
  addItemToJediState?: any;
  removeItemFromJediState?: any;
  addL3ItemToJediState?: any;
  path?: string;
}

export interface SubFormPropsChild {
  id: string;
  label: string;
  name: string;
  type: Type;
  dataType?: string;
  path: string;
  looping_key: string;
  placeholder: string;
  rules: SubFormRule[];
  options?: Option[];
  children?: SubFormPropsChild[];
}

export interface Option {
  code: string;
  description: string;
}

export enum Requirement {
  Conditional = "Conditional",
  Mandatory = "Mandatory",
  Optional = "Optional",
}

export enum Type {
  Dropdown = "dropdown",
  Input = "input",
  Subform = "subform",
}

export interface SubFormRule {
  requirement?: Requirement;
  message?: string;
  min?: number;
  max?: number;
  note?: string;
}

interface InlineSubFormProps {
  fieldKey: number;
  fieldName: string;
  childItems?: SubFormPropsChild[];
  onChange?: any;
  addL3ItemToJediState?: any;
  path?: string;
  parentIndex?: number;
}

const getRule = (rules: SubFormRule[]) => {
  const rulesList = rules?.map((rule) => {
    if (rule.requirement === "Mandatory") {
      return {
        required: true,
        message: rule.message,
      };
    }
    return rule;
  });

  return compact(rulesList);
};

const InlineSubForm = (props: InlineSubFormProps) => {
  const { childItems, addL3ItemToJediState, path, parentIndex } = props;
  return (
    <>
      <Form.List name={[props.fieldKey, props.fieldName]}>
        {(fields, { add, remove }) => {
          return (
            <SubFormContainer>
              {fields.map((fieldItem, index2) => (
                <SubFormGrid key={fieldItem.key}>
                  {/* {console.log("++++++++++ ", props.fieldName, parentIndex, index2)} */}
                  {childItems?.map((childItem) => {
                    const rules = getRule(childItem.rules);

                    if (childItem.type === "input") {
                      return (
                        <Form.Item
                          {...fieldItem}
                          name={[fieldItem.name, childItem.name]}
                          fieldKey={[fieldItem.fieldKey, childItem.name]}
                          label={
                            <div className="label-container">
                              {childItem.label}{" "}
                              <span className="label-small">
                                {childItem.name}
                              </span>
                            </div>
                          }
                          key={`${fieldItem.key}-${childItem.id}`}
                          rules={rules}
                        >
                          <Input />
                        </Form.Item>
                      );
                    }

                    if (childItem.type === "dropdown") {
                      return (
                        <Form.Item
                          {...fieldItem}
                          name={[fieldItem.name, childItem.name]}
                          fieldKey={[fieldItem.fieldKey, childItem.name]}
                          label={
                            <div className="label-container">
                              {childItem.label}{" "}
                              <span className="label-small">
                                {childItem.name}
                              </span>
                            </div>
                          }
                          key={`${fieldItem.key}-${childItem.id}`}
                          rules={rules}
                        >
                          <Select
                            options={childItem.options?.map((option: any) => ({
                              value: option.code,
                              label: option.description,
                            }))}
                          ></Select>
                        </Form.Item>
                      );
                    }

                    return (
                      <div key={`${fieldItem.key}-${childItem.id}`}>
                        render field type: {childItem.type}
                      </div>
                    );
                  })}
                  <CloseButton>
                    <MinusCircleOutlined
                      style={{ fontSize: "20px" }}
                      onClick={() => {
                        remove(fieldItem.name);
                      }}
                    />
                  </CloseButton>
                </SubFormGrid>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    console.log(props);
                    addL3ItemToJediState(path, parentIndex, 0);
                  }}
                >
                  <PlusOutlined /> Add Item ({props.fieldName})
                </Button>
              </Form.Item>
            </SubFormContainer>
          );
        }}
      </Form.List>
    </>
  );
};

function SubForm(props: SubFormProps) {
  const {
    name,
    fieldKey,
    label,
    children,
    onChange,
    addItemToJediState,
    path,
    removeItemFromJediState,
    addL3ItemToJediState,
  } = props;

  const listName = fieldKey ? [fieldKey, name] : name;

  return (
    <div className="subform-grid-container">
      <div>
        {label} - {name}
      </div>
      <Form.List name={listName}>
        {(listFields, { add, remove }) => {
          return (
            <SubFormContainer>
              {listFields.map((listFieldItem, listFieldItemIndex) => {
                return (
                  <SubFormGrid key={listFieldItem.key}>
                    {children?.map((childItem, index) => {
                      const rules = getRule(childItem.rules);
                      if (childItem.type === "input") {
                        return (
                          <Form.Item
                            {...listFieldItem}
                            name={[listFieldItem.name, childItem.name]}
                            fieldKey={[listFieldItem.fieldKey, childItem.name]}
                            label={
                              <div className="label-container">
                                {childItem.label}{" "}
                                <span className="label-small">
                                  {childItem.name}
                                </span>
                              </div>
                            }
                            key={`${listFieldItem.key}-${childItem.id}`}
                            rules={rules}
                          >
                            <Input
                              onChange={(e) =>
                                onChange(
                                  childItem.name,
                                  e.target.value,
                                  childItem.path
                                )
                              }
                            />
                          </Form.Item>
                        );
                      }

                      if (childItem.type === "dropdown") {
                        return (
                          <Form.Item
                            {...listFieldItem}
                            name={[listFieldItem.name, childItem.name]}
                            fieldKey={[listFieldItem.fieldKey, childItem.name]}
                            label={
                              <div className="label-container">
                                {childItem.label}{" "}
                                <span className="label-small">
                                  {childItem.name}
                                </span>
                              </div>
                            }
                            key={`${listFieldItem.key}-${childItem.id}`}
                            rules={rules}
                          >
                            <Select
                              options={childItem.options?.map((option) => ({
                                value: option.code,
                                label: option.description,
                              }))}
                              onChange={(e) =>
                                onChange(
                                  childItem.name,
                                  e,
                                  childItem.path,
                                  childItem.looping_key,
                                  listFieldItemIndex
                                )
                              }
                            ></Select>
                          </Form.Item>
                        );
                      }

                      if (childItem.type === "subform") {
                        return (
                          <div className="subform-grid-container">
                            <Form.Item>
                              <InlineSubForm
                                fieldKey={listFieldItem.name}
                                fieldName={childItem.name}
                                childItems={childItem.children}
                                addL3ItemToJediState={addL3ItemToJediState}
                                path={childItem.path}
                                parentIndex={listFieldItemIndex}
                              />
                            </Form.Item>
                          </div>
                        );
                      }
                      return <div key={index}>{childItem.name}</div>;
                    })}
                    <CloseButton>
                      <MinusCircleOutlined
                        style={{ fontSize: "20px" }}
                        onClick={() => {
                          remove(listFieldItem.name);
                          removeItemFromJediState(path, listFieldItemIndex);
                        }}
                      />
                    </CloseButton>
                  </SubFormGrid>
                );
              })}
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  addItemToJediState(path);
                }}
                block
              >
                <PlusOutlined /> Add item
              </Button>
            </SubFormContainer>
          );
        }}
      </Form.List>
    </div>
  );
}

export { SubForm };
