import {
  FreightTable,
  ItemTable,
  ScrollableTableContainer,
} from "../PurchaseOrderChangePage.styles";

interface Props {
  data: unknown;
}

function TargetFreight(props: Props) {
  return (
    <>
      <FreightTable>
        <tr>
          <td colSpan={6}>
            <p>
              <strong>Freight terms:</strong>
            </p>
            <p></p>
          </td>
          <td colSpan={2}>
            <p>Preferred Carrier:</p>
            <p></p>
          </td>
        </tr>
      </FreightTable>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Term type:</td>
              <td>Term Basis:</td>
              <td>Term Disc %:</td>
              <td>Disc. Due date:</td>
              <td>Disc. days:</td>
              <td>Net due date:</td>
              <td>Net days:</td>
              <td>Description:</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
}

export { TargetFreight };
