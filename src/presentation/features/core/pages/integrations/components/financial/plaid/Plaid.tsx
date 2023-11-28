import { usePostPlaidAccessTokenQuery } from "domain/interactors/integrations/plaid";
import { CORE_INTEGRATIONS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import {
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { usePlaidLink } from "react-plaid-link";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { GenericError } from "@crstl/components/atoms/error";
import { ResultModal } from "@crstl/components/molecules/modals";

import {
  InitialIntegrationState,
  IntegrationActionTypes,
  IntegrationsReducer,
} from "../../../reducer";
import {
  generateIntegrationResultModalTextConstants,
  setPlaidLinkToken,
} from "../../../utils";

type Props = {
  plaidLinkToken: string;
};

export const Plaid = ({ plaidLinkToken }: Props): ReactElement => {
  // timeout instance
  const timer = useRef<number | null>(null);
  // Clear the timeout on unmount
  useEffect(() => {
    return () => {
      if (typeof timer.current === "number") {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const {
    mutate,
    isLoading: isPlaidPostAccessTokenLoading,
  } = usePostPlaidAccessTokenQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bankName, setBankName] = useState("");

  const [
    { isFailure, isSuccess, isLoading: isModalLoading },
    dispatchIntegrationsAction,
  ] = useReducer(IntegrationsReducer, InitialIntegrationState);

  const onModalCancel = useCallback(() => {
    setIsModalVisible(false);
    // the Plaid Modal adds overflow none to the body
    // when antd modal opens, it preserve the previous styles on body object and then overrides them
    // when antd modal closes, since plaid added overflow none to the body before
    // Antd modal adds it again
    // Explicitly clearing overflow property on body style after the animation stops
    // assuming animation to take maximum of 1000 ms
    timer.current = window.setTimeout(() => {
      document.body.style.removeProperty("overflow");
    }, 1000);
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsFailure,
      payload: false,
    });
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsSuccess,
      payload: false,
    });
  }, []);

  const onSuccess = useCallback(
    (token, metadata) => {
      setBankName(metadata?.institution?.name || "");
      setIsModalVisible(true);
      dispatchIntegrationsAction({
        type: IntegrationActionTypes.SetIsLoading,
        payload: true,
      });
      // send token to server
      mutate(
        { publicToken: token, metadata: metadata },
        {
          onSuccess: () => {
            dispatchIntegrationsAction({
              type: IntegrationActionTypes.SetIsFailure,
              payload: false,
            });
            dispatchIntegrationsAction({
              type: IntegrationActionTypes.SetIsSuccess,
              payload: true,
            });
          },
          onError: () => {
            dispatchIntegrationsAction({
              type: IntegrationActionTypes.SetIsSuccess,
              payload: false,
            });
            dispatchIntegrationsAction({
              type: IntegrationActionTypes.SetIsFailure,
              payload: true,
            });
          },
          onSettled: () => {
            dispatchIntegrationsAction({
              type: IntegrationActionTypes.SetIsLoading,
              payload: false,
            });
          },
        }
      );
    },
    [mutate]
  );

  // PLAID Config
  const config = {
    token: plaidLinkToken,
    onSuccess,
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);

  function onClick() {
    setPlaidLinkToken(plaidLinkToken);
    open();
  }

  if (error) {
    return (
      <GenericError text={error ? "Plaid Integration error" : undefined} />
    );
  }

  return (
    <>
      <ResultModal
        destroyOnClose
        maskClosable={true}
        showPartyPopper
        closable={false}
        texts={generateIntegrationResultModalTextConstants(bankName)}
        {...{ isFailure, isSuccess, isLoading: isModalLoading }}
        visible={isModalVisible}
        cancelCallback={onModalCancel}
      />
      <ColoredButton
        loading={!ready || isPlaidPostAccessTokenLoading}
        onClick={onClick}
      >
        {CORE_INTEGRATIONS_TEXT_CONSTANTS.FINANCIAL_TAB.PLAID_BUTTON_TEXT}
      </ColoredButton>
    </>
  );
};
