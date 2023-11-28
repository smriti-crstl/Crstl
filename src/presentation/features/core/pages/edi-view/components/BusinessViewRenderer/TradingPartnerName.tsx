import { getTpfNameFromListDoc } from "../../../edi/edi.utils";

export interface TpNameProps {
  listDocData: any;
}

export const TradingPartnerName: React.FC<TpNameProps> = ({ listDocData }) => {
  const tradingPartner = getTpfNameFromListDoc(listDocData);

  if (!tradingPartner) {
    return null;
  }

  return (
    <div>
      <p>
        Trading Partner: <strong>{tradingPartner}</strong>
      </p>
    </div>
  );
};

