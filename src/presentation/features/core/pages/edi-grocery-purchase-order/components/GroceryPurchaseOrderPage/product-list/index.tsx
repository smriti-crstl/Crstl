import { TradingPartnerNames } from "presentation/features/core/pages/edi/Edi.config";

import { GenericProductList } from "./GenericProductList";
import { HEBProductList } from "./HEBProductList";
import { WegmansProductList } from "./WegmansProductList";

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
  if (partnerName === "wegmans") {
    if (partnerFlavorName === "warehouse") {
      return <WegmansProductList data={data} />;
    } else {
      return <WegmansProductList data={data} />;
    }
  } else if (partnerName === "heb") {
    if (partnerFlavorName === "warehouse") {
      return <HEBProductList data={data} />;
    } else {
      return <HEBProductList data={data} />;
    }
  }
  return <GenericProductList data={data} />;
};

