import { TabPaneChildrenWrapper } from "@crstl/components/atoms/tabs";
import { EditableTransactions } from "./EditableTransactions";
import Transactions from "./Transactions";

type Props = {
  datesSelected: any;
};

const CoreTransactions = ({ datesSelected }: Props) => {
  return (
    <TabPaneChildrenWrapper>
      {/* <Transactions /> */}
      {/* <EditableTransactions activeAccountId={null} /> */}
    </TabPaneChildrenWrapper>
  );
};

export default CoreTransactions;
