import { Button, Col, Form, Input, Row, Select, TimePicker } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { ELEMENT_623_OPTIONS } from "../data/Element_623_options";
import { ELEMENT_934_OPTIONS } from "../data/Element_934_options";
import { N9_128_01_OPTIONS } from "../data/N9_128_01_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormTableN9(props: { name: string }) {
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
                        name={[field.name, "N9_128_01"]}
                        label={
                          <div className="form-label">
                            Reference Identification Qualifier
                            <FieldDescriptionPopover
                              shortCode="N9_01"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(N9_128_01)</span>
                          </div>
                        }
                        required
                      >
                        <Select
                          options={N9_128_01_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N9_127_02"]}
                        label={
                          <div className="form-label">
                            Reference Identification
                            <FieldDescriptionPopover
                              shortCode="N9_02"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(N9_127_02)</span>
                          </div>
                        }
                        required
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N9_369_03"]}
                        label={
                          <div className="form-label">
                            Free-form Description
                            <FieldDescriptionPopover
                              shortCode="N9_03"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(N9_369_03)</span>
                          </div>
                        }
                        required
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N9_337_05"]}
                        label={
                          <div className="form-label">
                            Time
                            <FieldDescriptionPopover
                              shortCode="N9_05"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(N9_337_05)</span>
                          </div>
                        }
                        required
                      >
                        <TimePicker />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "N9_623_06"]}
                        label={
                          <div className="form-label">
                            Time Code
                            <FieldDescriptionPopover
                              shortCode="N9_06"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(N9_623_06)</span>
                          </div>
                        }
                        required
                      >
                        <Select
                          options={ELEMENT_623_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col> */}
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "MSG_933_01"]}
                        label={
                          <div className="form-label">
                            Free-Form Message Text
                            <FieldDescriptionPopover
                              shortCode="MSG_01"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(MSG_933_01)</span>
                          </div>
                        }
                        required
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "MSG_934_02"]}
                        label={
                          <div className="form-label">
                            Printer Carriage Control Code{" "}
                            <span className="form-sub-label">(MSG_934_02)</span>
                          </div>
                        }
                        required
                      >
                        <Select
                          options={ELEMENT_934_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "MSG_1470_03"]}
                        label={
                          <div className="form-label">
                            Number{" "}
                            <span className="form-sub-label">
                              (MSG_1470_03)
                            </span>
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

export { SubFormTableN9 };
