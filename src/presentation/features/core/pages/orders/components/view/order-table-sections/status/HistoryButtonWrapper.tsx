import Modal from "antd/lib/modal/Modal";
import { ReactElement, useState } from "react";

import { StatusModel } from "models/config";
import { ColoredButton, LinkButton } from "components/atoms/buttons";
import { GenericHeading } from "components/atoms/typography";

import { HistoryComponent } from "./HistoryComponent";

export interface IHistoryData {
  fullName?: string;
  prevStatus?: string;
  createdAt?: string;
  status?: string;
  prevStatusDescription?: string;
  statusDescription?: string;
}

type Props = {
  historyData: IHistoryData[];
  configDropdownValues?: StatusModel[];
  parentModule: string;
  customerName?: string;
  orderName?: string;
};

export const HistoryButtonWrapper = ({
  historyData,
  configDropdownValues,
  parentModule,
  customerName,
  orderName,
}: Props): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal
        width="800px"
        bodyStyle={{ padding: "0.5rem 0 0 0" }}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        centered
        footer={[
          <ColoredButton
            key="button"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Close
          </ColoredButton>,
        ]}
        closable={false}
        title={
          <GenericHeading $alignCenter $removeMargin size="XS" weight="MEDIUM">
            {parentModule} Status History
          </GenericHeading>
        }
      >
        <HistoryComponent
          historyData={historyData}
          configDropdownValues={configDropdownValues}
          customerName={customerName}
          orderName={orderName}
        />
      </Modal>
      <LinkButton
        style={{ fontSize: "inherit" }}
        onClick={() => setIsModalOpen(true)}
        $linkColor="#00A298"
      >
        View History
      </LinkButton>
    </>
  );
};
