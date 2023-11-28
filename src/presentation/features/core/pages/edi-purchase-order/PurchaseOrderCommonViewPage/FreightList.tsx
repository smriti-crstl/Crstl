import {
  CoreMarkFreight,
  CVSFreight,
  GenericFreight,
  KeHEFreight,
  OASFreight,
  TargetFreight,
  UNFIFreight,
  WalmartFreight,
} from "../freight";
import { Document } from "../types/TargetJson850";

interface PublicProps {
  data?: Document;
  partnerName: string;
  partnerFlavorName?: string;
}

const FreightList: React.FC<PublicProps> = ({
  data,
  partnerName,
  partnerFlavorName,
}) => {
  if (partnerName === "target") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <TargetFreight data={data} />;
    } else {
      return <TargetFreight data={data} />;
    }
  } else if (partnerName === "mclane") {
    return <GenericFreight data={data} />;
  } else if (partnerName === "cvs") {
    if (partnerFlavorName === "distribution center/warehouse") {
      return <CVSFreight data={data} />;
    } else {
      return <CVSFreight data={data} />;
    }
  } else if (partnerName === "unfi") {
    if (partnerFlavorName === "wholesale") {
      return <UNFIFreight data={data} />;
    } else {
      return <UNFIFreight data={data} />;
    }
  } else if (partnerName === "kehe") {
    return <KeHEFreight data={data} />;
  } else if (partnerName === "walmart") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <WalmartFreight data={data} />;
    } else {
      return <WalmartFreight data={data} />;
    }
  } else if (partnerName === "oas") {
    return <OASFreight data={data} />;
  } else if (partnerName === "core-mark") {
    return <CoreMarkFreight data={data} />;
  }
  return null;
};

export default FreightList;

