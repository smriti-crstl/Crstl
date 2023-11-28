import { MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";
import { ELEMENT_235_OPTIONS } from "../data/Element_235_options";
import { ELEMENT_662_OPTIONS } from "../data/Element_662_options";
import { ISS_355_02_OPTIONS } from "../data/ISS_355_02_options";
import { FullWidthFormControl } from "../InvoiceEditPage.styles";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormIT1SLN(props: { name: Array<string | number> }) {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }) => {
        if (fields.length === 0) {
          return (
            <Form.Item>
              <Button onClick={() => add()}>
                Add Sub-line item detail (SLN)
              </Button>
            </Form.Item>
          );
        }
        return (
          <Container>
            {fields.map((field) => {
              return (
                <SubFormContainer key={field.key}>
                  <h4>SLN sub-form</h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_350_01"]}
                        label="Assigned Identification (SLN_350_01)"
                        rules={[
                          {
                            required: true,
                            message: "Assigned Identification is required",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_350_02"]}
                        label="Assigned Identification (SLN_350_02)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_662_03"]}
                        label="Relationship Code (SLN_662_03)"
                        rules={[
                          {
                            required: true,
                            message: "Relationship Code is required",
                          },
                        ]}
                      >
                        <Select
                          options={ELEMENT_662_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_380_04"]}
                        label="Quantity (SLN_380_04)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_C001_05"]}
                        label="Composite unit of measure (SLN_C001_05)"
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
                        name={[field.name, "SLN_212_06"]}
                        label="Unit Price (SLN_212_06)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_639_07"]}
                        label="Basis of Unit Price Code (SLN_639_07)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_662_08"]}
                        label="Relationship Code (SLN_662_08)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_09"]}
                        label="Product/Service ID Qualifier (SLN_235_09)"
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
                        name={[field.name, "SLN_234_10"]}
                        label="Product/Service ID (SLN_234_10)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_11"]}
                        label="Product/Service ID Qualifier (SLN_235_11)"
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
                        name={[field.name, "SLN_234_12"]}
                        label="Product/Service ID (SLN_234_12)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_13"]}
                        label="Product/Service ID Qualifier (SLN_235_13)"
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
                        name={[field.name, "SLN_234_14"]}
                        label="Product/Service ID (SLN_234_14)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_15"]}
                        label="Product/Service ID Qualifier (SLN_235_15)"
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
                        name={[field.name, "SLN_234_16"]}
                        label="Product/Service ID (SLN_234_16)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_17"]}
                        label="Product/Service ID Qualifier (SLN_235_17)"
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
                        name={[field.name, "SLN_234_18"]}
                        label="Product/Service ID (SLN_234_18)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_19"]}
                        label="Product/Service ID Qualifier (SLN_235_19)"
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
                        name={[field.name, "SLN_234_20"]}
                        label="Product/Service ID (SLN_234_20)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_21"]}
                        label="Product/Service ID Qualifier (SLN_235_21)"
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
                        name={[field.name, "SLN_234_22"]}
                        label="Product/Service ID (SLN_234_22)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_23"]}
                        label="Product/Service ID Qualifier (SLN_235_23)"
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
                        name={[field.name, "SLN_234_24"]}
                        label="Product/Service ID (SLN_234_24)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_25"]}
                        label="Product/Service ID Qualifier (SLN_235_25)"
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
                        name={[field.name, "SLN_234_26"]}
                        label="Product/Service ID (SLN_234_26)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "SLN_235_27"]}
                        label="Product/Service ID Qualifier (SLN_235_27)"
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
                        name={[field.name, "SLN_234_28"]}
                        label="Product/Service ID (SLN_234_28)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <h4>DTM sub-form</h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "DTM_374_01"]}
                        label="Date/Time Qualifier (DTM_374_01)"
                        rules={[
                          {
                            required: true,
                            message: "Date/Time Qualifier is required",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <FullWidthFormControl>
                        <Form.Item
                          {...field}
                          name={[field.name, "DTM_373_02"]}
                          label="Date (DTM_373_02)"
                        >
                          <DatePicker />
                        </Form.Item>
                      </FullWidthFormControl>
                    </Col>
                    <Col sm={24} lg={6}>
                      <FullWidthFormControl>
                        <Form.Item
                          {...field}
                          name={[field.name, "DTM_337_03"]}
                          label="Time (DTM_337_03)"
                        >
                          <TimePicker />
                        </Form.Item>
                      </FullWidthFormControl>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "DTM_623_04"]}
                        label="Time Code (DTM_623_04)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "DTM_1250_05"]}
                        label="Date Time Period Format Qualifier (DTM_1250_05)"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "DTM_1251_06"]}
                        label="Date Time Period (DTM_1251_06)"
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
              <Button onClick={() => add()}>Add Sub-line item (SLN)</Button>
            </Form.Item>
          </Container>
        );
      }}
    </Form.List>
  );
}

export { SubFormIT1SLN };
