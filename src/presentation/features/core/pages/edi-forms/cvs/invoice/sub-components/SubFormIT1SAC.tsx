import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { ELEMENT_248_OPTIONS } from "../data/Element_248_options";
import { ELEMENT_559_OPTIONS } from "../data/Element_559_options";
import { ISS_355_02_OPTIONS } from "../data/ISS_355_02_options";
import { SAC_1300_02_OPTIONS } from "../data/SAC_1300_02_options";
import { SAC_331_12_OPTIONS } from "../data/SAC_331_12_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormIT1SAC(props: { name: Array<string | number> }) {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }) => {
        if (fields.length === 0) {
          return (
            <Form.Item>
              <Button onClick={() => add()}>Add SAC information</Button>
            </Form.Item>
          );
        }
        return (
          <Container>
            {fields.map((field) => {
              return (
                <SubFormContainer key={field.key}>
                  <h4>
                    SAC
                    <FieldDescriptionPopover
                      shortCode="SAC"
                      segment={true}
                      glossaryKey={
                        EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                      }
                    />
                  </h4>
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(SAC_248_01)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message:
                              "Allowance or Charge Indicator is required",
                          },
                        ]}
                      >
                        <Select
                          options={ELEMENT_248_OPTIONS}
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
                            Service, Allowance, or Charge Code
                            <FieldDescriptionPopover
                              shortCode="SAC_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(SAC_559_03)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_559_OPTIONS}
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                  </Row>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_610_05"]}
                        label={
                          <div className="form-label">
                            Amount
                            <FieldDescriptionPopover
                              shortCode="SAC_05"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(SAC_378_06)</span>
                          </div>
                        }
                      >
                        <Select>
                          <Select.Option value="1">
                            Item List Cost
                          </Select.Option>
                          <Select.Option value="2">Item Net Cost</Select.Option>
                          <Select.Option value="3">
                            Discount/Gross
                          </Select.Option>
                          <Select.Option value="4">Discount/Net</Select.Option>
                          <Select.Option value="5">
                            Base Price per Unit
                          </Select.Option>
                          <Select.Option value="6">
                            Base Price Amount
                          </Select.Option>
                          <Select.Option value="7">
                            Base Price Amount Less Previous Discount
                          </Select.Option>
                          <Select.Option value="8">
                            Net Monthly On All Invoices Past Due
                          </Select.Option>
                          <Select.Option value="9">
                            Late Payment Charge Base Amount
                          </Select.Option>
                          <Select.Option value="A">Fuel Rate</Select.Option>
                          <Select.Option value="Z">
                            Manually Defined
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SAC_332_07"]}
                        label={
                          <div className="form-label">
                            Percent Qualifier
                            <FieldDescriptionPopover
                              shortCode="SAC_07"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(SAC_355_09)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ISS_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
                        name={[field.name, "SAC_770_14"]}
                        label={
                          <div className="form-label">
                            Option Number
                            <FieldDescriptionPopover
                              shortCode="SAC_14"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(SAC_770_14)</span>
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
                            Quantity
                            <FieldDescriptionPopover
                              shortCode="SAC_15"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
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
              <Button onClick={() => add()}>Add SAC information</Button>
            </Form.Item>
          </Container>
        );
      }}
    </Form.List>
  );
}

export { SubFormIT1SAC };
