import { useFlags } from "launchdarkly-react-client-sdk";

import { ShipmentDocumentsModalDropShip } from "./ShipmentDocumentsModalDropShip";
import { ShipmentDocumentsModalDefault } from "./ShipmentDocumentsModalDefault";
import { getShipmentDocsSortConfigFromLocalStorage as getShipmentDocsSortConfig } from "./utils";
import { useListDocumentQuery } from "domain/interactors/edi";
import { useTpfForLD } from "presentation/hooks/common";

interface Props {
  asnId: string;
  visible: boolean;
  toggle: () => void;
}

export const ShipmentDocumentsModal = ({ asnId, visible, toggle }: Props) => {
  const result = useListDocumentQuery("856", asnId);
  useTpfForLD(result?.data);
  const flags = useFlags();
  const isDropShipAsn = flags?.dropshipAsn;
  if (isDropShipAsn) {
    return (
      <ShipmentDocumentsModalDropShip
        asnId={asnId}
        visible={visible}
        toggle={toggle}
      />
    );
  } else {
    return (
      <ShipmentDocumentsModalDefault
        asnId={asnId}
        visible={visible}
        toggle={toggle}
      />
    );
  }
};

export const getShipmentDocsSortConfigFromLocalStorage = getShipmentDocsSortConfig;
