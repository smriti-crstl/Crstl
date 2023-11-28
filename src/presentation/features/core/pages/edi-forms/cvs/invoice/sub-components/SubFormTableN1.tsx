import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { N1_66_03_OPTIONS } from "../data/N1_66_03_options";
import { N1_98_01_OPTIONS } from "../data/N1_98_01_options";
import { N4_309_05_OPTIONS } from "../data/N4_309_05_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormTableN1(props: { name: string }) {
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
                        name={[field.name, "N1_98_01"]}
                        label={
                          <div className="form-label">
                            Entity Identifier Code
                            <FieldDescriptionPopover
                              shortCode="N1_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N1_98_01)</span>
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
                          options={N1_98_01_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N1_93_02"]}
                        label={
                          <div className="form-label">
                            Entity Identifier Code
                            <FieldDescriptionPopover
                              shortCode="N1_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N1_93_02)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N1_66_03"]}
                        label={
                          <div className="form-label">
                            Identification Code Qualifier
                            <FieldDescriptionPopover
                              shortCode="N1_03"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N1_66_03)</span>
                          </div>
                        }
                      >
                        <Select
                          options={N1_66_03_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N1_67_04"]}
                        label={
                          <div className="form-label">
                            Identification Code
                            <FieldDescriptionPopover
                              shortCode="N1_04"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N1_67_04)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <h4>Address Information (N3)</h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N3_166_01"]}
                        label={
                          <div className="form-label">
                            Address information
                            <FieldDescriptionPopover
                              shortCode="N3_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N3_166_01)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N3_166_02"]}
                        label={
                          <div className="form-label">
                            Address information
                            <FieldDescriptionPopover
                              shortCode="N3_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N3_166_02)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <h4>Geographic Location (N4)</h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N4_19_01"]}
                        label={
                          <div className="form-label">
                            City Name
                            <FieldDescriptionPopover
                              shortCode="N4_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N4_19_01)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N4_156_02"]}
                        label={
                          <div className="form-label">
                            State or Province Code
                            <FieldDescriptionPopover
                              shortCode="N4_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N4_156_02)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N4_116_03"]}
                        label={
                          <div className="form-label">
                            Postal Code
                            <FieldDescriptionPopover
                              shortCode="N4_03"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(N4_116_03)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N4_26_04"]}
                        label={
                          <div className="form-label">
                            Country Code
                            <span className="form-sub-label">(N4_26_04)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N4_309_05"]}
                        label={
                          <div className="form-label">
                            Location Qualifier{" "}
                            <span className="form-sub-label">(N4_309_05)</span>
                          </div>
                        }
                      >
                        <Select
                          options={N4_309_05_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N4_310_06"]}
                        label={
                          <div className="form-label">
                            Location Identifier
                            <span className="form-sub-label">(N4_310_06)</span>
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

export { SubFormTableN1 };
