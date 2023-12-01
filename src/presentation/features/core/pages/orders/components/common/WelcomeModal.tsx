import PartyPopperImage from "globals/assets/images/party-popper.png";
import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement, useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";

import { ColoredButton } from "components/atoms/buttons";
import { PaddedModal } from "components/atoms/modal";
import {
  GenericHeading,
  GenericSubHeading,
} from "components/atoms/typography";

const PartyPopper = styled.img`
  height: 7rem;
`;
export type CoreOrdersLocationStateProps = {
  showWelcomeModal: boolean;
};

export const WelcomeModal = (): ReactElement => {
  const location = useLocation<CoreOrdersLocationStateProps>();
  const history = useHistory();

  const [showModal, setShowModal] = useState(
    !!location.state?.showWelcomeModal
  );

  const getStarted = (): void => {
    history.replace({ ...location, state: {} });
    setShowModal(false);
  };

  return (
    <PaddedModal
      open={showModal}
      cancelCallback={() => setShowModal(false)}
      closable={false}
    >
      <PartyPopper src={PartyPopperImage} alt="🎉" />
      <GenericHeading weight="MEDIUM">
        {CORE_ORDERS_TEXT_CONSTANTS.WELCOME_MODAL.HEADING}
      </GenericHeading>
      <GenericSubHeading size="XS">
        {CORE_ORDERS_TEXT_CONSTANTS.WELCOME_MODAL.SUB_HEADING}
      </GenericSubHeading>
      <ColoredButton size="large" $spaceTop="XL" onClick={getStarted}>
        {CORE_ORDERS_TEXT_CONSTANTS.WELCOME_MODAL.BUTTON_TEXT}
      </ColoredButton>
    </PaddedModal>
  );
};
