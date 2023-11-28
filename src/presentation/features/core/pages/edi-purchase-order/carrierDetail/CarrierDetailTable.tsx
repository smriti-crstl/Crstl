import { Document } from "../types/TargetJson850";
import { GenericCarrierDetailTable } from "./GenericCarrierDetailTable";
import { KeHECarrierDetailTable } from "./KeHECarrierDetailTable";

interface PublicProps {
  data?: Document;
  partnerName: string;
  partnerFlavorName?: string;
}

export const CarrierDetailTable: React.FC<PublicProps> = ({
  data,
  partnerName,
  partnerFlavorName, // todo: use this
}) => {
  if (partnerName === "kehe") {
    return <KeHECarrierDetailTable data={data} />;
  }

  return <GenericCarrierDetailTable data={data} />;
};

