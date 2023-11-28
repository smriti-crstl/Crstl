import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { ISS_355_02_OPTIONS } from "../data/ISS_355_02_options";
import { ISS_355_4_OPTIONS } from "../data/ISS_355_04_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormTableISS(props: { name: string }) {
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
                        name={[field.name, "ISS_382_01"]}
                        label={
                          <div className="form-label">
                            Number of Units Shipped
                            <FieldDescriptionPopover
                              shortCode="ISS_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(ISS_382_01)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "ISS_355_02"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="ISS_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(ISS_355_02)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Select
                          options={ISS_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "ISS_81_03"]}
                        label={
                          <div className="form-label">
                            Weight
                            <FieldDescriptionPopover
                              shortCode="ISS_03"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(ISS_81_03)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "ISS_355_04"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="ISS_04"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(ISS_355_04)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ISS_355_4_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "ISS_183_05"]}
                        label={
                          <div className="form-label">
                            Volume{" "}
                            <span className="form-sub-label">(ISS_183_05)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "ISS_355_06"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code{" "}
                            <span className="form-sub-label">(ISS_355_06)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ISS_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
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

export { SubFormTableISS };
