import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { REF_128_01_OPTIONS } from "../data/REF_128_01_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormTableREF(props: { name: string }) {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }) => {
        if (fields.length === 0) {
          return (
            <Form.Item>
              <Button onClick={() => add()}>Add item</Button>
            </Form.Item>
          );
        }
        return (
          <Container>
            {fields.map((field) => {
              return (
                <SubFormContainer key={field.key}>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "REF_128_01"]}
                        label={
                          <div className="form-label">
                            Reference Identification Qualifier
                            <FieldDescriptionPopover
                              shortCode="REF_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(REF_128_01)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message:
                              "Reference Identification Qualifier is required",
                          },
                        ]}
                      >
                        <Select
                          options={REF_128_01_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "REF_127_02"]}
                        label={
                          <div className="form-label">
                            Reference Identification
                            <FieldDescriptionPopover
                              shortCode="REF_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(REF_127_02)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please enter Reference Identification",
                          },
                          {
                            min: 1,
                            message: "Must have at least 1 character",
                          },
                          {
                            max: 30,
                            message: "Can have at most 30 characters",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "REF_352_03"]}
                        label={
                          <div className="form-label">
                            Description
                            <FieldDescriptionPopover
                              shortCode="REF_03"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(REF_352_03)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <MinusCircleOutlined
                    className="remove-btn"
                    onClick={() => remove(field.name)}
                  />
                </SubFormContainer>
              );
            })}
            <Form.Item>
              <Button onClick={() => add()}>Add item</Button>
            </Form.Item>
          </Container>
        );
      }}
    </Form.List>
  );
}

export { SubFormTableREF };
