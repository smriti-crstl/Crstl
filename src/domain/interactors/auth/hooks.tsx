import { tokenManagement } from "./service";

const useAuthentication = (): [
  {
    isAuthenticated: boolean;
    isLoggedIn: boolean;
  }
] => {
  const isAuthenticated = !!tokenManagement.getAuthTokenForOrg();
  const isLoggedIn = !!tokenManagement.getAuthToken();

  return [{ isAuthenticated, isLoggedIn }];
};

export { useAuthentication };

