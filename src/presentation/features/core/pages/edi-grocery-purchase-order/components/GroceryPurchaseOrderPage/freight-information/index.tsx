import { TradingPartnerNames } from "presentation/features/core/pages/edi/Edi.config";

import { GenericFreight } from "./GenericFreight";
import { HEBFreight } from "./HEBFreight";
import { WegmansFreight } from "./WegmansFreight";

interface PublicProps {
  data: any;
  partnerName: TradingPartnerNames;
  partnerFlavorName?: string;
}

export const FreightInformation: React.FC<PublicProps> = ({
  data,
  partnerName,
  partnerFlavorName,
}) => {
  if (partnerName === "wegmans") {
    if (partnerFlavorName === "warehouse") {
      return <WegmansFreight data={data} />;
    } else {
      return <WegmansFreight data={data} />;
    }
  } else if (partnerName === "heb") {
    if (partnerFlavorName === "warehouse") {
      return <HEBFreight data={data} />;
    } else {
      return <HEBFreight data={data} />;
    }
  }
  return <GenericFreight data={data} />;
};

