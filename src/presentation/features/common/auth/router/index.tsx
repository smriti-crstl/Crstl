import {
  EMAIL_SIGN_UP,
  LOGIN,
  PAGE_NOT_FOUND,
  RESET_PASSWORD,
  SIGN_UP,
} from "globals/configs";
import { PublicRoute } from "presentation/router/components/public-route";
import { ReactElement, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";

import { AuthContainerLayout } from "../containers";
import { EmailSignUp } from "../pages/email-sign-up";
import { Login } from "../pages/login";
import { PremierAdminSignUp } from "../pages/premier-admin-signup";
import { ResetPassword } from "../pages/reset-password";

export const AuthRouter = (): ReactElement => {
  return (
    <AuthContainerLayout>
      <Suspense fallback={null}>
        <Switch>
          <PublicRoute exact path={LOGIN} component={Login} />
          <PublicRoute exact path={SIGN_UP} component={PremierAdminSignUp} />
          <PublicRoute exact path={EMAIL_SIGN_UP} component={EmailSignUp} />
          <PublicRoute exact path={RESET_PASSWORD} component={ResetPassword} />
          <Redirect path="*" to={PAGE_NOT_FOUND} />
        </Switch>
      </Suspense>
    </AuthContainerLayout>
  );
};

