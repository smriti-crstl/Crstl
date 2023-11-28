import { TradingPartnerNames } from "../../../edi/Edi.config";
import { GenericProductList } from "./GenericProductList";

interface PublicProps {
  data: any;
  partnerName: TradingPartnerNames;
  partnerFlavorName?: string;
}

export const ProductList: React.FC<PublicProps> = ({
  data,
  partnerName,
  partnerFlavorName,
}) => {
  if (partnerName === "crate and barrel") {
    if (partnerFlavorName === "warehouse") {
      return <GenericProductList data={data} />;
    } else {
      return <GenericProductList data={data} />;
    }
  }

  // TODO: add logic for other partners and duplicate + rename GenericProductList to CrateAndBarrelProductList when more come in
  return <GenericProductList data={data} />;
};

