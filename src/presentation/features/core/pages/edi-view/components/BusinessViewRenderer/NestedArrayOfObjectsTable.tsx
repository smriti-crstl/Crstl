import { Table } from "antd";
import { ListDocumentSchema } from "domain/entity/edi/models";
import { get, union } from "lodash";
import styled from "styled-components";

import { EdiForm } from "../../../edi-edit/EdiForm";
import { getFallbackTextForCode } from "../../../edi/edi.utils";
import { customTemplates } from "../../templates";
import { customWidgets } from "../../widgets";

interface Props {
  data: any[];
  listDocumentSchema?: ListDocumentSchema;
  schemaEntryPath: string;
  invoiceData?: any;
}

const TableContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  th.ant-table-cell {
    background-color: ${({ theme }) => theme.palette.colors.POLAR};
  }
`;

export const NestedArrayOfObjectsTable: React.FC<Props> = ({
  data,
  listDocumentSchema,
  schemaEntryPath,
  invoiceData,
}) => {
  const { enhancedSchema } = listDocumentSchema ?? {};

  const getColumns = (items: any) => {
    const keys = union<string>(...items.map((item: any) => Object.keys(item)));

    return keys.map((key) => {
      const label = key.replace("_loop", "");

      return {
        title: getFallbackTextForCode(label), // takes the label and makes it the column title
        dataIndex: key,
        render: function renderVal(value?: any) {
          return (
            <EdiForm
              schema={get(enhancedSchema, `${schemaEntryPath}.${key}`, {})}
              formData={value}
              widgets={customWidgets}
              {...customTemplates}
              formContext={{
                schemaPath: `${schemaEntryPath}.${key}`,
                invoiceData,
              }}
            />
          );
        },
      };
    });
  };

  const columns = getColumns(data);

  if (!data?.length) {
    return null;
  }

  return (
    <TableContainer>
      <Table dataSource={data} columns={columns} pagination={false} bordered />
    </TableContainer>
  );
};

