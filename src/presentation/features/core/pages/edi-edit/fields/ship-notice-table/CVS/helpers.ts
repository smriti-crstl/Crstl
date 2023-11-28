import { CVSASNHLLoopPack } from "./types";

/**
 * @param data - rowItem data type - CVSASNHLLoopPack
 * since the (date_time_qualifier_01 === "036") condition is a special case here, we need this
 * otherwise we can just hardcode paths as string
 * @returns paths to individual editable items in a single row
 */
export const getEditableItemPaths = (data: CVSASNHLLoopPack) => {
  // * This is to make sure only the date_time_qualifier_01 === "036" date is displayed
  const expDateFindIndex = data?.HL_loop_item[0]?.date_time_reference_DTM?.findIndex(
    ({ date_time_qualifier_01 }) => date_time_qualifier_01 === "036" // Note the hardcoding here - might want to accommodate more types
  );
  const expirationDateIndex = expDateFindIndex === -1 ? 0 : expDateFindIndex;

  // * Declaring ItemPath constants here
  const lotNumberItemPath = "item_identification_LIN.product_service_id_13";
  const grossWeightPerPackItemPath =
    "item_physical_details_PO4.gross_weight_per_pack_06";
  const descriptionItemPath = "product_item_description_PID.[0].description_05";
  const expirationDateItemPath = `date_time_reference_DTM.[${expirationDateIndex}].date_02`;
  const grossWeightPerPackItemUnitPath =
    "item_physical_details_PO4.unit_or_basis_for_measurement_code_07";

  return {
    lotNumberItemPath,
    grossWeightPerPackItemPath,
    descriptionItemPath,
    expirationDateItemPath,
    grossWeightPerPackItemUnitPath,
  };
};
