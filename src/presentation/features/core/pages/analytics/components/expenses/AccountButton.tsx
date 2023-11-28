import { AccountData } from "domain/entity/transactions/models";
import { AccountButtonStyles } from "./Expenses.styles";

type Props = {
  data: AccountData;
  isSelected: boolean;
  onClick: (accountId: string) => void;
};

function AccountButton({ data, isSelected, onClick }: Props) {
  return (
    <AccountButtonStyles
      isSelected={isSelected}
      onClick={() => onClick(data.accountId)}
    >
      <span className="title">{data.name}</span>
      <span className="text">{data.officialName}</span>
      <span className="badge">{data.accountMask}</span>
    </AccountButtonStyles>
  );
}

export { AccountButton };
