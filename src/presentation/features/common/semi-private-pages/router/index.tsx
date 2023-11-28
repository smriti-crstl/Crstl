import { PAGE_NOT_FOUND, ORG_SELECTION } from "globals/configs";
import { ReactElement, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";

import { AuthContainerLayout } from "../containers";
import { OrgSelection } from "../pages/org-selection";
import { SemiPrivateRoute } from "presentation/router/components/semi-private-route";

export const SemiPrivateRouter = (): ReactElement => {
  return (
    <AuthContainerLayout>
      <Suspense fallback={null}>
        <Switch>
          <SemiPrivateRoute
            exact
            path={ORG_SELECTION}
            component={OrgSelection}
          />
          <Redirect path="*" to={PAGE_NOT_FOUND} />
        </Switch>
      </Suspense>
    </AuthContainerLayout>
  );
};

