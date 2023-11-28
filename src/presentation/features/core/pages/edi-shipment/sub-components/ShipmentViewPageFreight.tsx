import { FreightTable } from "../ShipmentPage.styles";

const ShipmentViewPageFreight = ({ data }: { data: unknown }) => {
  return (
    <FreightTable>
      <tr>
        <td>FOB Information: </td>
        <td>Special Handling: </td>
      </tr>
    </FreightTable>
  );
};

export default ShipmentViewPageFreight;
