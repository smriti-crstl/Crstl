import CrstlColoured from "globals/assets/images/crstl_coloured.png";
import { InviteUsersPlugIn } from "presentation/features/common/auth/plugins/invite-users";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

import { Logo } from "components/atoms/logo";
import { PaddedModal } from "components/atoms/modal";

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
};
export const InviteTeammatesModal = ({
  isVisible,
  toggleModal,
}: Props): ReactElement => {
  return (
    <PaddedModal onCancel={toggleModal} open={isVisible} width="50%">
      <Logo image={CrstlColoured} isLarge />
      <br />
      <InviteUsersPlugIn
        firstButtonText={
          CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TEXTS.INVITE_CANCEL_BUTTON_TEXT
        }
        secondButtonText={
          CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TEXTS.INVITE_SEND_BUTTON_TEXT
        }
        cancelCallback={toggleModal}
        successCallback={toggleModal}
      />
    </PaddedModal>
  );
};
