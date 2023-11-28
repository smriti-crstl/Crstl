import { ReactElement } from "react";

import { LIVE_TABS } from "../../../config";
import { Finance } from "../Finance";
import { FinanceSection } from "../Finance/Finance.styles";
import { Operations } from "../Operations";
import { Sales } from "../Sales";

type Props = {
  tabSelected?: string;
};

export const ReportsView = ({ tabSelected }: Props): ReactElement => {
  return (
    <>
      {tabSelected === LIVE_TABS.ALL && <Finance tabSelected={tabSelected} />}
      {tabSelected === LIVE_TABS.FINANCE && (
        <FinanceSection>
          <Finance tabSelected={tabSelected} />
        </FinanceSection>
      )}
      {(tabSelected === LIVE_TABS.ALL || tabSelected === LIVE_TABS.SALES) && (
        <Sales tabSelected={tabSelected} />
      )}
      {tabSelected === LIVE_TABS.OPERATIONS && <Operations />}
    </>
  );
};
