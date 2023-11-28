import {
  PAGE_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  UNAUTHORIZED,
} from "globals/configs";
import { PublicRoute } from "presentation/router/components/public-route";
import { ReactElement, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { PageNotFound } from "../pages/page-not-found";
import { SomethingWentWrong } from "../pages/something-went-wrong";
import { Unauthorized } from "../pages/unauthorized";

export const ErrorRouter = (): ReactElement => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <PublicRoute exact path={PAGE_NOT_FOUND} component={PageNotFound} />
        <PublicRoute
          exact
          path={SOMETHING_WENT_WRONG}
          component={SomethingWentWrong}
        />
        <PublicRoute exact path={UNAUTHORIZED} component={Unauthorized} />
        <Redirect path="*" to={PAGE_NOT_FOUND} />
      </Switch>
    </Suspense>
  );
};
