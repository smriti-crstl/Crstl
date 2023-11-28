import { TradingPartnerNames } from "../../edi/Edi.config";
import { GenericFreight } from "./GenericFreightList";
import { HEBFreight } from "./HEBFreight";

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
  if (partnerName === "heb") {
    if (partnerFlavorName === "warehouse") {
      return <HEBFreight data={data} />;
    } else {
      return <HEBFreight data={data} />;
    }
  }
  return <GenericFreight data={data} />;
};

