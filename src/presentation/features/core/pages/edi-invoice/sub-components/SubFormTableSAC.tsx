import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { SAC_1300_02_OPTIONS } from "../data/SAC_1300_02_options";
import { SAC_248_01_OPTIONS } from "../data/SAC_248_01_options";
import { SAC_331_12_OPTIONS } from "../data/SAC_331_12_options";
import { SAC_378_06_OPTIONS } from "../data/SAC_378_06_options";
import { SAC_559_03_OPTIONS } from "../data/SAC_559_03_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormTableSAC(props: { name: string }) {
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
                        name={[field.name, "SAC_248_01"]}
                        label={
                          <div className="form-label">
                            Allowance or Charge Indicator
                            <FieldDescriptionPopover
                              shortCode="SAC_01"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_248_01)</span>
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
                          options={SAC_248_01_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_1300_02"]}
                        label={
                          <div className="form-label">
                            Service, Promotion, Allowance, or Charge Code
                            <FieldDescriptionPopover
                              shortCode="SAC_02"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">
                              (SAC_1300_02)
                            </span>
                          </div>
                        }
                      >
                        <Select
                          options={SAC_1300_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_559_03"]}
                        label={
                          <div className="form-label">
                            Agency Qualifier Code
                            <FieldDescriptionPopover
                              shortCode="SAC_03"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_559_03)</span>
                          </div>
                        }
                      >
                        <Select
                          options={SAC_559_03_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_1301_04"]}
                        label={
                          <div className="form-label">
                            Agency Service, Promotion, Allowance, or Charge Code
                            <FieldDescriptionPopover
                              shortCode="SAC_04"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">
                              (SAC_1301_04)
                            </span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_610_05"]}
                        label={
                          <div className="form-label">
                            Amount
                            <FieldDescriptionPopover
                              shortCode="SAC_05"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_610_05)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_378_06"]}
                        label={
                          <div className="form-label">
                            Allowance/Charge Percent Qualifier
                            <FieldDescriptionPopover
                              shortCode="SAC_06"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_378_06)</span>
                          </div>
                        }
                      >
                        <Select
                          options={SAC_378_06_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_332_07"]}
                        label={
                          <div className="form-label">
                            Percent
                            <FieldDescriptionPopover
                              shortCode="SAC_07"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_332_07)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_118_08"]}
                        label={
                          <div className="form-label">
                            Rate
                            <FieldDescriptionPopover
                              shortCode="SAC_08"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_118_08)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_355_09"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="SAC_09"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_355_09)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_380_10"]}
                        label={
                          <div className="form-label">
                            Quantity
                            <FieldDescriptionPopover
                              shortCode="SAC_10"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_380_10)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_380_11"]}
                        label={
                          <div className="form-label">
                            Quantity
                            <FieldDescriptionPopover
                              shortCode="SAC_11"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_380_11)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_331_12"]}
                        label={
                          <div className="form-label">
                            Allowance or Charge Method of Handling Code
                            <FieldDescriptionPopover
                              shortCode="SAC_12"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_331_12)</span>
                          </div>
                        }
                      >
                        <Select
                          options={SAC_331_12_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_127_13"]}
                        label={
                          <div className="form-label">
                            Reference Identification
                            <FieldDescriptionPopover
                              shortCode="SAC_13"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_127_13)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_352_15"]}
                        label={
                          <div className="form-label">
                            Description
                            <FieldDescriptionPopover
                              shortCode="SAC_15"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(SAC_352_15)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
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

export { SubFormTableSAC };
