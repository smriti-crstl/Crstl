// import { PRIVACY_POLICY } from "globals/configs";
import { ReactElement, useEffect } from "react";
import styled from "styled-components";

// import { AuthBottomBar } from "@crstl/components/molecules/auth-bottom-bar";
import { LoginPlugIn, LoginPlugInProps } from "../../plugins/login";
import { useAuthentication } from "domain/interactors/auth/hooks";
import { CORE_EDI_LIST_VIEW, CORE_SETUP, ORG_SELECTION } from "globals/configs";
import { useHistory } from "react-router-dom";
import { tokenManagement } from "domain/interactors/auth/service";
import { Role } from "@crstl/api/src/apis/models/User";

const LoginContainer = styled.div`
  padding-top: 1.5rem;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  > form {
    width: 80%;
    max-width: 22.5rem;
  }
`;

// const BarWrapper = styled.div`
//   padding-top: 1rem;
//   width: 80%;
//   max-width: 20rem;
// `;

export const Login = (props: LoginPlugInProps): ReactElement => {
  const history = useHistory();
  const [{ isAuthenticated, isLoggedIn }] = useAuthentication();
  useEffect(() => {
    if (isAuthenticated) {
      const role = tokenManagement.getRole();
      const redirectPath =
        role === Role.Intake ? CORE_SETUP : CORE_EDI_LIST_VIEW;
      history.push(redirectPath);
    } else if (isLoggedIn) {
      history.push(ORG_SELECTION);
    }
  }, []);
  return (
    <LoginContainer>
      <LoginPlugIn {...props} />
    </LoginContainer>
  );
};

