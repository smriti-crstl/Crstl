/* eslint-disable no-loop-func */
import { Button, DatePicker, Form, Input } from "antd";
import { Rule } from "antd/lib/form";
import _, { compact } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

import { usePostSourceJson, usePostTranslate } from "./api";
import { FIELD_TYPES } from "./config";
import { DyDropdown } from "./DyDropdown";
import { Container, GridContainer, OutputContainer } from "./index.styles";
import { jediData, prefillData } from "./prefillData";
import { sampleResponse } from "./sampleResponse";
import { SubForm } from "./SubForm";
import { SubFormTable } from "./SubFormTable";

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

async function runAsync(promiseFn: () => Promise<any>) {
  try {
    const result = await promiseFn();
    return [result, null];
  } catch (ex) {
    return [null, ex];
  }
}

export const DynamicForm = (invData: any): ReactElement => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formData, setFormData] = React.useState<string>("");
  const [jediState, setJediState] = useState(jediData);
  const [numberOfBaselineItems, setNumberOfBaselineItems] = useState(0);

  const {
    mutateAsync: postSourceJson,
    data: postSourceJsonResponse,
  } = usePostSourceJson();

  const {
    mutate: postTranslate,
    data: postTranslateResponse,
  } = usePostTranslate();

  const submitForm = async () => {
    const [formData, error] = await runAsync(() => form.validateFields());
    console.log({ formData, error });

    if (error) {
      return;
    }

    const json = JSON.stringify(formData, null, 2);
    setFormData(json);

    postSourceJson(formData).then((response) => {
      const requestData = {
        input_format: "jedi@2.0",
        output_format: "edi",
        input: response?.data?.output,
        validation_options: {
          validation_type: "base",
        },
      };
      postTranslate(requestData);
    });
  };
  const onChange = (
    key: string,
    value: any,
    path: string,
    looping_key?: string,
    index = -1
  ) => {
    if (path?.indexOf("INDEX") > 0 && index >= 0) {
      path = path?.replace("INDEX", index.toString());
    }
    const state = jediState;
    _.set(state, path, value);
    setJediState(JSON.parse(JSON.stringify(state)));
  };

  console.log("jediState: ", jediState);

  const createField = (type: string, props: any): any => {
    switch (type) {
      case FIELD_TYPES.INPUT as string:
        return (
          <Input
            {...props}
            onChange={(e) => onChange(props.name, e.target.value, props.path)}
          />
        );
      case FIELD_TYPES.TEXTAREA:
        return (
          <TextArea
            showCount
            {...props}
            onChange={(e) => onChange(props.name, e.target.value, props.path)}
          />
        );
      // case FIELD_TYPES.DATEPICKER: {
      //   return <DatePicker bordered {...props} />;
      // }
      case FIELD_TYPES.TABLE:
        return <SubFormTable {...props} onChange={onChange} />;
      case FIELD_TYPES.DROPDOWN:
        return (
          <DyDropdown
            {...props}
            onChange={(e: any) => onChange(props.name, e, props.path)}
          />
        );
    }
  };

  const getRule = (rules: any[], type: string): Rule[] => {
    const rulesList = rules.map((rule) => {
      const _rule = rule;
      if (rule.requirement === "Mandatory") {
        delete _rule.requirement;
        _rule.required = true;
        return _rule;
      }
      if (type === FIELD_TYPES.DATEPICKER) {
        return null;
      }
      return _rule;
    });

    return compact(rulesList);
  };

  const targetJson = postSourceJsonResponse?.data ?? "";
  const targetJsonValue = JSON.stringify(targetJson, null, 2);

  const translateJson = postTranslateResponse?.data ?? "";
  const translateJsonValue = JSON.stringify(translateJson, null, 2);

  const [autofill, setAutofill] = useState({});

  const getLoopingContextArray = (
    name: string,
    looping_key: string,
    path: string,
    index2?: string
  ) => {
    const start = 0;
    const end = path?.indexOf(looping_key) + looping_key?.length;
    const arrayPath = path?.substring(start, end);
    const array = _.get(jediData, arrayPath);

    const _array: any = [];
    if (name === "235_IT1_06" && array.length) {
      setNumberOfBaselineItems(array?.length);
    }
    if (array?.length) {
      array.forEach((item: any, index: number) => {
        const arrayObj: { [key: string]: any } = {};
        const newPath = path?.replace("INDEX", index.toString());
        arrayObj[name] = _.get(jediData, newPath);
        _array.push(arrayObj);
      });
    }
    return _array;
  };

  const getFinalArray = (levelArray: any) => {
    const resultantArray = [];
    const numObjects = levelArray[0]?.length;
    let i = 0;
    while (i < numObjects) {
      const _obj = {};
      // eslint-disable-next-line no-loop-func
      levelArray.forEach((keyArray: never) => Object.assign(_obj, keyArray[i]));
      resultantArray.push(_obj);
      i++;
    }
    levelArray = [];
    return resultantArray;
  };

  const getFinall3Array = (levelArray: any) => {
    const numObjects = levelArray[0]?.length;
    let i = 0;
    const resultantArray = [];
    let newshit: any = [];
    const _inner: any = [];
    while (i < numObjects - 1) {
      levelArray?.forEach((e: any, index: number) => {
        e.forEach((e1: any, idx: number) => {
          e1.forEach((e1: any, i: number) => {
            if (index === 0) {
              let j = 0;
              let holdObject: any = { ...e1 };
              while (j < levelArray?.length) {
                const tmp = levelArray[j + 1];
                if (tmp) {
                  const e2 = tmp[idx][i];
                  holdObject = { ...holdObject, ...e2 };
                }
                j++;
              }
              newshit.push(holdObject);
            }
          });
          if (newshit.length) {
            _inner.push(newshit);
          }
          newshit = [];
        });
      });
      resultantArray.push(_inner);
      i++;
    }
    return _inner;
  };

  const recursiveReset = (obj: any) => {
    Object.keys(obj).forEach((key) => {
      // Test if it's an Object
      if (obj[key] === Object(obj[key])) {
        recursiveReset(obj[key]);
        return;
      }
      if (obj[key] instanceof Array) obj[key] = [];
      else obj[key] = undefined;
    });
  };

  const addItemToJediState = (path: string) => {
    const detail_It: [] = _.cloneDeep(_.get(jediData, path));
    const detail_It_object = _.cloneDeep(detail_It[detail_It.length - 1]);
    recursiveReset(detail_It_object);
    detail_It.push(detail_It_object);
    const newState = jediData;
    _.set(newState, path, _.cloneDeep(detail_It));

    const form_detail_It = form.getFieldValue("detail_IT1");
    const form_detail_It_object = JSON.parse(JSON.stringify(form_detail_It[0]));
    recursiveReset(form_detail_It_object);
    form_detail_It[form_detail_It.length - 1] = form_detail_It_object;
    setJediState(JSON.parse(JSON.stringify(newState)));
  };

  const addL3ItemToJediState = (
    path: string,
    parentIndex: number,
    childIndex: number
  ) => {
    console.log("path", path, parentIndex);
    const newPath = path.replace("INDEX", parentIndex.toString());
    const loopArray: [] = _.cloneDeep(_.get(jediData, newPath));
    const newObject = _.cloneDeep(loopArray[loopArray.length - 1]);
    recursiveReset(newObject);
    loopArray.push(newObject);
    const newState = jediData;
    _.set(newState, newPath, _.cloneDeep(loopArray));
    setJediState(JSON.parse(JSON.stringify(newState)));
    const form_loopArray = form.getFieldValue("detail_IT1");
    const form_loopl3Array = JSON.parse(
      JSON.stringify(form_loopArray[parentIndex])
    );
    const form_loopObject = _.cloneDeep(
      form_loopl3Array["detail_PID_subform"][0]
    );
    recursiveReset(form_loopObject);
    form_loopl3Array["detail_PID_subform"].push(form_loopObject);
    form_loopArray[parentIndex] = _.cloneDeep(form_loopl3Array);
  };

  const removeItemFromJediState = (path: string, index: number) => {
    console.log("path: ", path, "-- index: ", index);
    const _form = form.getFieldsValue();
    _form.detail_IT1 = _form.detail_IT1.filter(
      (_: any, idx: number) => index !== idx
    );
    form.setFieldsValue(_form);
    const jediLoop = _.get(jediState, path);
    console.log("jediLoop => ", jediLoop);
    const jediLoopFiltered = jediLoop.filter(
      (_: any, jediIndex: number) => index !== jediIndex
    );
    console.log("jediLoopFiltered => ", jediLoopFiltered);
    const _jediState = jediState;
    _.set(_jediState, path, JSON.parse(JSON.stringify(jediLoopFiltered)));
    setJediState(JSON.parse(JSON.stringify(_jediState)));
  };

  useEffect(() => {
    const obj: { [key: string]: any } = {};
    const l2Container: any = [];
    sampleResponse.data.forEach((l1: any, l1_index: number) => {
      if (l1.type === "subForm") {
        const innerObj: { [key: string]: any } = {};
        const l2Array: any = [];
        const baseLineCollector: any = [];
        const l3Array: any = [];
        l1.children.forEach((l2: any, l2_index: number) => {
          if (l2.type === "subform") {
            const _innerObj: { [key: string]: any } = {};
            l2.children.forEach((l3: any, l3_index: number) => {
              if (l3.looping_key) {
                const end =
                  l3.path?.indexOf(l3?.looping_key) + l3?.looping_key?.length;
                const arrayPath = l3.path?.substring(0, end);
                /**
                 * Start
                 */
                let i = 0;
                const innerBaselineCollecter: any = [];
                while (i < 2) {
                  const _array: any = [];
                  if (arrayPath.includes("INDEX")) {
                    const newPath = arrayPath.replace("INDEX", i.toString());
                    const l3_loop_array = _.get(jediData, newPath);
                    l3_loop_array.forEach((l3_object: any, index: number) => {
                      const arrayObj: { [key: string]: any } = {};
                      const keyPath = l3.path
                        .replace("INDEX", i.toString())
                        .replace("INDEX2", index.toString());
                      const value = _.get(jediData, keyPath);
                      arrayObj[l3.name] = value;
                      _array.push(arrayObj);
                    });
                  }
                  innerBaselineCollecter.push(_array);
                  i++;
                }
                baseLineCollector.push(innerBaselineCollecter);
                const x = getFinall3Array(baseLineCollector);
                /**
                 * End
                 */

                // if (baseLineCollector) {
                //   const _finBaselineCollector = getFinall3Array(baseLineCollector);
                //   console.log("++++ ^^^: ", l2.name, _finBaselineCollector);
                //   return (innerObj[l2.name] = _finBaselineCollector);
                // }
              }
              return (_innerObj[l3.name] = _.get(jediData, l3.path));
            });
            if (l3Array) {
              console.log(
                "A )))))) ",
                innerObj,
                l2.name,
                getFinall3Array(baseLineCollector)
              );
              return (innerObj[l2.name] = getFinall3Array(baseLineCollector));
            }
            console.log("B )))))) ");
            return (innerObj[l2.name] = [_innerObj]);
          }
          if (l2.looping_key) {
            l2Array.push(
              getLoopingContextArray(l2.name, l2.looping_key, l2.path)
            );
          }
          return (innerObj[l2.name] = _.get(jediData, l2.path));
        });
        if (l2Array) {
          const _finArray = getFinalArray(l2Array);
          const holder: any = [];
          _finArray.forEach((l2object: any, index: number) => {
            const holderObj: any = {};
            Object.keys(l2object).forEach(
              (l2_key) => (holderObj[l2_key] = l2object[l2_key])
            );
            holderObj["detail_PID_subform"] = getFinall3Array(
              baseLineCollector
            )[index];
            holder.push(holderObj);
          });
          return (obj[l1.name] = holder);
        }
        return (obj[l1.name] = [innerObj]);
      }
      return (obj[l1.name] = _.get(jediData, l1.path));
    });
    setAutofill(obj);
  }, []);

  if (!Object.keys(autofill).length) return <></>;
  return (
    <div>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={() => console.log("finish")}
        autoComplete="off"
        layout="vertical"
        initialValues={autofill}
      >
        <GridContainer>
          {sampleResponse.data.map((field: any, index) => {
            if (field?.type === FIELD_TYPES.TABLE) {
              return (
                <div key={index} className="span-4">
                  <div>
                    {field.label} - {field?.name}
                  </div>
                  <SubFormTable onChange={onChange} key={index} {...field} />
                </div>
              );
            }

            if (field?.type === FIELD_TYPES.SUB_FORM) {
              return (
                <div key={index} className="span-4">
                  <SubForm
                    {...field}
                    onChange={onChange}
                    addItemToJediState={addItemToJediState}
                    removeItemFromJediState={removeItemFromJediState}
                    addL3ItemToJediState={addL3ItemToJediState}
                  />
                </div>
              );
            }

            const rules = getRule(field.rules, field.type) as Rule[];
            return (
              <Form.Item
                key={index}
                label={
                  <div className="label-container">
                    {field.label}{" "}
                    <span className="label-small">{field.name}</span>
                  </div>
                }
                name={field.name}
                rules={rules}
              >
                {createField(field.type, {
                  ...field,
                })}
              </Form.Item>
            );
          })}
        </GridContainer>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={submitForm}>
            Save
          </Button>
        </Form.Item>
      </Form>
      <Container>
        <OutputContainer>
          <h2>Source json</h2>
          <TextArea value={formData} />
        </OutputContainer>
        <OutputContainer>
          <h2>Target json</h2>
          <TextArea value={targetJsonValue} />
        </OutputContainer>
        <OutputContainer>
          <h2>Document</h2>
          <TextArea value={translateJsonValue} />
        </OutputContainer>
      </Container>
    </div>
  );
};
