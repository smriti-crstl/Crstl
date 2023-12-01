import { ReactElement } from "react";

import { ExpensesReport } from "./components/reports";
import { HeaderShadowContainerWithoutTabs } from "components/molecules/headers";

const Expenses = (): ReactElement => {
  return (
    <>
      <HeaderShadowContainerWithoutTabs />
      <ExpensesReport />
    </>
  );
};

export default Expenses;
