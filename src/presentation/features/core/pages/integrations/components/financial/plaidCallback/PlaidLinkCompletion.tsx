import { GenericError } from "@crstl/components/atoms/error";
import { Content } from "@crstl/components/molecules/modals";
import { usePostPlaidAccessTokenQuery } from "domain/interactors/integrations/plaid";
import { CORE_INTEGRATIONS_FINANCIAL } from "globals/configs";
import { useCallback, useEffect, useReducer, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useHistory } from "react-router-dom";
import {
  InitialIntegrationState,
  IntegrationActionTypes,
  IntegrationsReducer,
} from "../../../../integrations/reducer";
import { generateIntegrationResultModalTextConstants } from "../../../../integrations/utils";

type Props = {
  plaidLinkToken: string;
};

function PlaidLinkCompletion({ plaidLinkToken }: Props) {
  const history = useHistory();

  const { mutate } = usePostPlaidAccessTokenQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bankName, setBankName] = useState("");

  const [
    { isFailure, isSuccess, isLoading: isModalLoading },
    dispatchIntegrationsAction,
  ] = useReducer(IntegrationsReducer, InitialIntegrationState);

  const onModalCancel = useCallback(() => {
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsFailure,
      payload: false,
    });
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsSuccess,
      payload: false,
    });
    history.replace({
      pathname: CORE_INTEGRATIONS_FINANCIAL,
    });
  }, [history]);

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
    receivedRedirectUri: window.location.href,
    onSuccess,
    // ...
  };

  const { open, error } = usePlaidLink(config);

  useEffect(() => {
    open();
  }, [open]);

  if (error) {
    return (
      <GenericError text={error ? "Plaid Integration error" : undefined} />
    );
  }

  return (
    <Content
      destroyOnClose
      maskClosable={true}
      showPartyPopper
      closable={false}
      texts={generateIntegrationResultModalTextConstants(bankName, {
        successButtonText: "Back to Integrations",
      })}
      {...{ isFailure, isSuccess, isLoading: isModalLoading }}
      visible={isModalVisible}
      cancelCallback={onModalCancel}
    />
  );
}

export { PlaidLinkCompletion };
