import {
  CrateAndBarrelProductListAck,
  CVSProductList,
  GenericProductList,
  KeHEProductListAck,
  OASProductList,
  TargetProductList,
  TargetDotComProductList,
  UNFIProductListAck,
  WalmartProductList,
  ThriveMarketProductListAck,
} from "../productList";
import { CoreMarkProductListAck } from "../productList/CoreMarkProductListAck";
import { Document } from "../types/TargetJson850";

interface PublicProps {
  data?: Document;
  partnerName: string;
  partnerFlavorName?: string;
}

// TODO: clean up needed - there is an overlap in the "genericProductList" component i.e. PO, PO Ack and RTS are all referring to the same component
const ProductList: React.FC<PublicProps> = ({
  data,
  partnerName,
  partnerFlavorName,
}) => {
  if (partnerName === "target") {
    if (partnerFlavorName === "dot com") {
      return <TargetDotComProductList data={data} />;
    } else {
      return <TargetProductList data={data} />;
    }
  } else if (partnerName === "mclane") {
    return <GenericProductList data={data} />;
  } else if (partnerName === "cvs") {
    if (partnerFlavorName === "distribution center/warehouse") {
      return <CVSProductList data={data} />;
    } else {
      return <CVSProductList data={data} />;
    }
  } else if (partnerName === "unfi") {
    if (partnerFlavorName === "wholesale") {
      return <UNFIProductListAck data={data} />;
    } else {
      return <UNFIProductListAck data={data} />;
    }
  } else if (partnerName === "kehe") {
    return <KeHEProductListAck data={data} />;
  } else if (partnerName === "walmart") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <WalmartProductList data={data} />;
    } else {
      return <WalmartProductList data={data} />;
    }
  } else if (partnerName === "oas") {
    return <OASProductList data={data} />;
  } else if (partnerName === "core-mark") {
    return <CoreMarkProductListAck data={data} />;
  } else if (partnerName === "crate&barrel") {
    if (partnerFlavorName === "warehouse") {
      return <CrateAndBarrelProductListAck data={data} />;
    } else {
      return <CrateAndBarrelProductListAck data={data} />;
    }
  } else if (partnerName === "thrive market") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <ThriveMarketProductListAck data={data} />;
    } else {
      return <ThriveMarketProductListAck data={data} />;
    }
  }

  return <GenericProductList data={data} />;
};

export default ProductList;
