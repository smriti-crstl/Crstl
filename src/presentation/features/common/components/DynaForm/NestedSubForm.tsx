import { Form, Input } from "antd";

function NestedSubForm(props: any) {
  console.log("props: ", props);
  return (
    <div>
      <Form.List name={[props.name, "TEST"]}>
        {(fields, { add, remove }) => {
          return (
            <div>
              <div>INNER FORM</div>
              {fields.map((field, index) => {
                return (
                  <div key={field.key}>
                    <Form.Item
                      {...field}
                      name={[field.name, "nameValue"]}
                      fieldKey={[field.fieldKey, "test1"]}
                      label="item 1"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "nameValue2"]}
                      fieldKey={[field.fieldKey, "test2"]}
                      label="item 2"
                    >
                      <Input />
                    </Form.Item>
                    <button onClick={() => remove(field.name)}>Remove</button>
                  </div>
                );
              })}
              <div>
                <button onClick={() => add()}>Add</button>
              </div>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
}

export { NestedSubForm };
