import { ReactElement } from "react";
import { ColoredButton } from "components/atoms/buttons";
import { ConnectedIndicator } from "components/atoms/indicators";
import { Modal } from "antd";
import { RAILS_CONFIG } from "./railz.config";
import { theme } from "globals/themes";

type Props = {
  onAddButtonClick: () => void;
  isconnected: boolean;
  needsAuth?: boolean;
  businessName?: string;
  isModalOpen?: boolean;
  setIsModalOpen: (state: boolean) => void;
};

export const RailzAuth = ({
  onAddButtonClick,
  isconnected,
  isModalOpen,
  setIsModalOpen,
}: Props): ReactElement => {
  if (isconnected) {
    return <ConnectedIndicator />;
  } else {
    return (<>
      <Modal
        title={RAILS_CONFIG.RAILZ_INTEGRATION}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        maskStyle={{ backgroundColor: theme.palette.colors.KLIEN_BLUE }}
      >
        <div id={RAILS_CONFIG.RAILS_CONNECT_DIV}></div>
      </Modal>
      <ColoredButton onClick={onAddButtonClick}>Add</ColoredButton>
    </>);
  }
};
