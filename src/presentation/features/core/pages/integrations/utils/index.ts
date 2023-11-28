import {
  getItemFromSessionStorage,
  removeItemFromSessionStorage,
  setItemInSessionStorage,
} from "domain/services/sessionStorage";
import { CORE_INTEGRATIONS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

const INTEGRATION_LOCAL_STORAGE_KEYS = {
  INTEGRATION_SOURCE_ID: "integrationSourceId",
  INTEGRATION_LOG_ID: "integrationLogId",
};

type SetIntegrationIdsToLocalStorageProps = {
  integrationSourceId: string;
  integrationLogId: string;
};
const setIntegrationIdsToStorage = ({
  integrationLogId,
  integrationSourceId,
}: SetIntegrationIdsToLocalStorageProps): void => {
  setItemInSessionStorage(
    INTEGRATION_LOCAL_STORAGE_KEYS.INTEGRATION_SOURCE_ID,
    integrationSourceId
  );
  setItemInSessionStorage(
    INTEGRATION_LOCAL_STORAGE_KEYS.INTEGRATION_LOG_ID,
    integrationLogId
  );
};

type GetIntegrationIdsFromLocalStorage = {
  integrationSourceId: string;
  integrationLogId: string;
} | null;

const getIntegrationIdsFromStorage = (): GetIntegrationIdsFromLocalStorage => {
  const integrationSourceId = getItemFromSessionStorage(
    INTEGRATION_LOCAL_STORAGE_KEYS.INTEGRATION_SOURCE_ID
  );
  const integrationLogId = getItemFromSessionStorage(
    INTEGRATION_LOCAL_STORAGE_KEYS.INTEGRATION_LOG_ID
  );
  if (integrationSourceId && integrationLogId) {
    return {
      integrationSourceId,
      integrationLogId,
    };
  }
  return null;
};

const clearIntegrationIdsFromStorage = (): void => {
  removeItemFromSessionStorage(
    INTEGRATION_LOCAL_STORAGE_KEYS.INTEGRATION_LOG_ID
  );
  removeItemFromSessionStorage(
    INTEGRATION_LOCAL_STORAGE_KEYS.INTEGRATION_SOURCE_ID
  );
};

interface IntegrationResultModalTextConstants {
  failureButtonText: string;
  failureSubText: string;
  failureText: string;
  successButtonText: string;
  successText: string;
}

const generateIntegrationResultModalTextConstants = (
  integrationSourceName: string,
  overrides: Partial<IntegrationResultModalTextConstants> = {}
): IntegrationResultModalTextConstants => ({
  failureButtonText:
    CORE_INTEGRATIONS_TEXT_CONSTANTS.RESULT_MODAL.FAILURE_BUTTON_TEXT,
  failureSubText:
    CORE_INTEGRATIONS_TEXT_CONSTANTS.RESULT_MODAL.FAILURE_SUB_TEXT,
  failureText: CORE_INTEGRATIONS_TEXT_CONSTANTS.RESULT_MODAL.FAILURE_TEXT,
  successButtonText:
    CORE_INTEGRATIONS_TEXT_CONSTANTS.RESULT_MODAL.SUCCESS_BUTTON_TEXT,
  successText: CORE_INTEGRATIONS_TEXT_CONSTANTS.RESULT_MODAL.SUCCESS_TEXT(
    integrationSourceName
  ),
  ...overrides,
});

const setPlaidLinkToken = (token: string) =>
  window.localStorage.setItem("plaid_link_token", token);

const getPlaidLinkToken = () =>
  window.localStorage.getItem("plaid_link_token") ?? "";

const unsetPlaidLinkToken = () =>
  window.localStorage.removeItem("plaid_link_token");

export type { IntegrationResultModalTextConstants };

export {
  setIntegrationIdsToStorage,
  getIntegrationIdsFromStorage,
  clearIntegrationIdsFromStorage,
  generateIntegrationResultModalTextConstants,
  setPlaidLinkToken,
  getPlaidLinkToken,
  unsetPlaidLinkToken,
};
