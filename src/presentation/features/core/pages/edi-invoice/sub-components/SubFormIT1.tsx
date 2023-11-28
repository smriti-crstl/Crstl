import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { ELEMENT_235_OPTIONS } from "../data/Element_235_options";
import { getTargetData } from "../data/getDataByPartner";
import { ISS_355_02_OPTIONS } from "../data/ISS_355_02_options";
import { SubFormIT1PID } from "./SubFormIT1PID";
import { SubFormIT1SAC } from "./SubFormIT1SAC";
import { SubFormPO4 } from "./SubFormPO4";
import { Container, SubFormContainer } from "./SubFormTable.styles";

const ELEMENT_235_OPTIONS_TARGET_06 = getTargetData(
  ELEMENT_235_OPTIONS,
  "detail.010_IT1.010_IT1.06"
);

const ELEMENT_235_OPTIONS_TARGET_08 = getTargetData(
  ELEMENT_235_OPTIONS,
  "detail.010_IT1.010_IT1.08"
);

const ELEMENT_235_OPTIONS_TARGET_10 = getTargetData(
  ELEMENT_235_OPTIONS,
  "detail.010_IT1.010_IT1.10"
);

const IT1_355_03_OPTIONS_TARGET = getTargetData(
  ISS_355_02_OPTIONS,
  "detail.010_IT1.010_IT1.03"
);

function SubFormIT1(props: { name: string }) {
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
            {fields.map((field, index) => {
              return (
                <SubFormContainer key={field.key}>
                  <h4>
                    IT1
                    <FieldDescriptionPopover
                      shortCode="IT1"
                      segment={true}
                      glossaryKey={
                        EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                      }
                    />
                  </h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_350_01"]}
                        label={
                          <div className="form-label">
                            Assigned Identification
                            <FieldDescriptionPopover
                              shortCode="IT1_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_350_01)</span>
                          </div>
                        }
                        initialValue={(index + 1).toString()}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_358_02"]}
                        label={
                          <div className="form-label">
                            Quantity invoiced
                            <FieldDescriptionPopover
                              shortCode="IT1_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_358_02)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_355_03"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="IT1_03"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_355_03)</span>
                          </div>
                        }
                      >
                        <Select
                          options={IT1_355_03_OPTIONS_TARGET}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_212_04"]}
                        label={
                          <div className="form-label">
                            Unit Price
                            <FieldDescriptionPopover
                              shortCode="IT1_04"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_212_04)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_639_05"]}
                        label={
                          <div className="form-label">
                            Basis of Unit Price Code
                            <FieldDescriptionPopover
                              shortCode="IT1_05"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_639_05)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_06"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <FieldDescriptionPopover
                              shortCode="IT1_06"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_235_06)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS_TARGET_06}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_07"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <FieldDescriptionPopover
                              shortCode="IT1_07"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_234_07)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_08"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <FieldDescriptionPopover
                              shortCode="IT1_08"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_235_08)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS_TARGET_08}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_09"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <FieldDescriptionPopover
                              shortCode="IT1_09"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_234_09)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_10"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <FieldDescriptionPopover
                              shortCode="IT1_10"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_235_10)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS_TARGET_10}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_11"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <FieldDescriptionPopover
                              shortCode="IT1_11"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(IT1_234_11)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_12"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <span className="form-sub-label">(IT1_235_12)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_13"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <span className="form-sub-label">(IT1_234_13)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_14"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <span className="form-sub-label">(IT1_235_14)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_15"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <span className="form-sub-label">(IT1_234_15)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_16"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <span className="form-sub-label">(IT1_235_16)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_17"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <span className="form-sub-label">(IT1_234_17)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_18"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <span className="form-sub-label">(IT1_235_18)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_19"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <span className="form-sub-label">(IT1_234_19)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_20"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <span className="form-sub-label">(IT1_235_20)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_21"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <span className="form-sub-label">(IT1_234_21)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_22"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <span className="form-sub-label">(IT1_235_22)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_23"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <span className="form-sub-label">(IT1_234_23)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_235_24"]}
                        label={
                          <div className="form-label">
                            Product/Service ID Qualifier
                            <span className="form-sub-label">(IT1_235_24)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_235_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT1_234_25"]}
                        label={
                          <div className="form-label">
                            Product/Service ID
                            <span className="form-sub-label">(IT1_234_25)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col> */}
                  </Row>
                  {/* <br />
                  <h4>IT3</h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT3_382_01"]}
                        label="Number of Units Shipped (IT3_382_01)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT3_355_02"]}
                        label="Unit or Basis for Measurement Code (IT3_355_02)"
                      >
                        <Select
                          options={IT3_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT3_368_03"]}
                        label="Shipment/Order Status Code (IT3_368_03)"
                      >
                        <Select
                          options={ELEMENT_368_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT3_383_04"]}
                        label="Quantity Difference (IT3_383_04)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "IT3_371_05"]}
                        label="Change Reason Code (IT3_371_05)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row> */}
                  <SubFormPO4 name={[field.name, "PO4_loop"]} />
                  <SubFormIT1PID name={[field.name, "PID_loop"]} />
                  <SubFormIT1SAC name={[field.name, "SAC_loop"]} />
                  {/* <SubFormIT1SLN name={[field.name, "SLN_loop"]} /> */}
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

export { SubFormIT1 };
