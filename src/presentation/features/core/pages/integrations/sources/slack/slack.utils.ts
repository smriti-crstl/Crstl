import { getItemFromSessionStorage } from "domain/services/sessionStorage";
import { SLACK_CONFIG } from "./slack.config";

const integrationLogId = getItemFromSessionStorage(SLACK_CONFIG.INTEGRATION_ID);

export const getQueryString = (code: string, state: string): string => {
  if (code && state) {
    return `?code=${code}&integrationLogId=${integrationLogId}&state=${state}`;
  }
  return "";
};
