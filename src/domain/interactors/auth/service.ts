import { IS_TOUR_VIEWED_LOCAL_STORAGE_KEY } from "boot/wrappers/react-joyride/constants";
import {
  clearLocalStorage,
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "domain/services/localStorage";
import { History } from "history";

const AUTH_TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const ROLE_KEY = "role";
const ORG_KEY = "last_org_id";
const ACCESS_TOKEN_KEY = "auth_tokens";
const MULTI_ORG_KEY = "is_multi_org";

// const getAuthToken = (): string | null =>
//   getItemFromLocalStorage(AUTH_TOKEN_KEY);

// const setAuthToken = (value: string): void =>
//   setItemInLocalStorage(AUTH_TOKEN_KEY, value);

// const setRefreshToken = (value: string): void =>
//   setItemInLocalStorage(REFRESH_TOKEN_KEY, value);

// const getRefreshToken = (): string | null =>
//   getItemFromLocalStorage(REFRESH_TOKEN_KEY);

const removeAuthToken = (): void => setItemInLocalStorage(AUTH_TOKEN_KEY, "");
const removeRefreshToken = (): void =>
  setItemInLocalStorage(REFRESH_TOKEN_KEY, "");

const logout = (): void => {
  const isTourViewed = getItemFromLocalStorage(
    IS_TOUR_VIEWED_LOCAL_STORAGE_KEY
  );
  removeAuthToken();
  removeRefreshToken();
  clearLocalStorage();
  if (isTourViewed !== null) {
    setItemInLocalStorage(IS_TOUR_VIEWED_LOCAL_STORAGE_KEY, isTourViewed);
  }
};

const tokenManagement = {
  getAuthToken: (): string | null => getItemFromLocalStorage(AUTH_TOKEN_KEY),

  getAuthTokenForOrg: () => {
    const lastOrgId = getItemFromLocalStorage(ORG_KEY);
    const authTokensStr: string | null = getItemFromLocalStorage(
      ACCESS_TOKEN_KEY
    );
    if (!authTokensStr) return null;
    const authTokens = JSON.parse(authTokensStr);
    return authTokens?.[`${lastOrgId}`];
  },

  setAuthTokenForOrg: ({
    authToken,
    orgId,
  }: {
    authToken: string;
    orgId: string;
  }) => {
    setItemInLocalStorage(ORG_KEY, orgId);
    const authTokensStr: string | null = getItemFromLocalStorage(
      ACCESS_TOKEN_KEY
    );
    const authTokens = authTokensStr ? JSON.parse(authTokensStr) : {};
    const key = `${orgId}`;
    const newAuthTokens = { ...authTokens, [key]: authToken };

    setItemInLocalStorage(ACCESS_TOKEN_KEY, JSON.stringify(newAuthTokens));
  },

  setAuthToken: (authToken: string) => {
    setItemInLocalStorage(AUTH_TOKEN_KEY, authToken);
  },

  getRefreshToken: (): string | null =>
    getItemFromLocalStorage(REFRESH_TOKEN_KEY),

  setRefreshToken: (refreshToken: string) => {
    setItemInLocalStorage(REFRESH_TOKEN_KEY, refreshToken);
  },

  setRole: (value: string): void => setItemInLocalStorage(ROLE_KEY, value),

  getRole: (): string | null => getItemFromLocalStorage(ROLE_KEY),

  setOrg: (value: string): void => setItemInLocalStorage(ORG_KEY, value),

  getOrg: (): string | null => getItemFromLocalStorage(ORG_KEY),

  setIsMultiOrg: (value: boolean): void =>
    setItemInLocalStorage(MULTI_ORG_KEY, JSON.stringify(value)),

  getIsMultiOrg: (): boolean => {
    const isMultiOrgStr = getItemFromLocalStorage(MULTI_ORG_KEY);
    return isMultiOrgStr ? JSON.parse(isMultiOrgStr) : !!isMultiOrgStr;
  },
};

// Keys
export { AUTH_TOKEN_KEY };

// Functions
export { removeAuthToken, logout, removeRefreshToken, tokenManagement };

