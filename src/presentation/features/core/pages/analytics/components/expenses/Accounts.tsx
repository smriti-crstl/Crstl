import React from "react";
import { useGetAllAccountsQuery } from "domain/interactors/transactions";
import { AccountButton } from "./AccountButton";
import {
  AccountsHeader,
  AccountListStyles,
  AccountsSidebarContainer,
} from "./Expenses.styles";

interface Props {
  activeAccountId: string | null;
  onChange: (activeAccountId: string | null) => void;
}

function Accounts({ activeAccountId, onChange }: Props) {
  const { data, isError, isLoading } = useGetAllAccountsQuery();

  if (isError || isLoading) {
    return null;
  }

  return data?.length ? (
    <AccountsSidebarContainer>
      <AccountsHeader>Accounts</AccountsHeader>
      <div className="scroll-container">
        <div className="scroll-content">
          <AccountListStyles>
            <li>
              <AccountButton
                data={{
                  accountId: "",
                  accountMask:
                    data.length === 1 ? `1 Account` : `${data.length} Accounts`,
                  name: "All Accounts",
                  officialName: "",
                  institutionName: "",
                }}
                isSelected={activeAccountId === null}
                onClick={() => onChange(null)}
              />
            </li>
            {data.map((accountItem) => (
              <li key={accountItem.accountId}>
                <AccountButton
                  data={accountItem}
                  isSelected={accountItem.accountId === activeAccountId}
                  onClick={onChange}
                />
              </li>
            ))}
          </AccountListStyles>
        </div>
      </div>
    </AccountsSidebarContainer>
  ) : null;
}

export { Accounts };
