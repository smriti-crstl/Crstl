import { Button, Form, Input, Select, Table } from "antd";
import { Rule } from "antd/lib/form";

import { MinusCircleOutlined } from "@ant-design/icons";

import { FIELD_TYPES } from "./config";
import { SubFormContainer } from "./index.styles";

const getRule = (item: any): Rule[] => {
  return [
    {
      required: item?.requirement === "Mandatory",
    },
  ];
};

function SubFormTable(props: any) {
  const { name, columns } = props;

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        if (fields.length === 0) {
          return (
            <Form.Item>
              <Button onClick={() => add()}>Add item</Button>
            </Form.Item>
          );
        }
        return (
          <SubFormContainer>
            <div className="ant-table">
              <div className="ant-table-container">
                <div className="ant-table-content">
                  <table>
                    <thead className="ant-table-thead">
                      <tr>
                        {columns.map((item: any) => (
                          <th key={item.dataIndex}>
                            {item.title} - {item.dataIndex}
                          </th>
                        ))}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {fields.map((field) => {
                        return (
                          <tr key={field.key}>
                            {columns.map((item: any) => {
                              return (
                                <td
                                  key={item.dataIndex}
                                  className="ant-table-cell"
                                >
                                  {item.editable ? (
                                    <Form.Item
                                      {...field}
                                      name={[field.name, item.dataIndex]}
                                      rules={getRule(item) as Rule[]}
                                    >
                                      {item.options?.length ? (
                                        <Select
                                          options={item.options.map(
                                            ({ code, description }: any) => ({
                                              value: code,
                                              label: description,
                                            })
                                          )}
                                          onChange={props.onChange}
                                        />
                                      ) : (
                                        <Input
                                          onChange={(e) =>
                                            props.onChange(
                                              item.dataIndex,
                                              e.target.value,
                                              item.path
                                            )
                                          }
                                        />
                                      )}
                                    </Form.Item>
                                  ) : (
                                    item.title
                                  )}
                                </td>
                              );
                            })}
                            <td>
                              <MinusCircleOutlined
                                onClick={() => remove(field.name)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Form.Item>
              <Button onClick={() => add()}>Add item</Button>
            </Form.Item>
          </SubFormContainer>
        );
      }}
    </Form.List>
  );
}

export { SubFormTable };
