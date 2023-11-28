import { CORE_SETTINGS, PAGE_NOT_FOUND } from "globals/configs";
import CoreSettings from "presentation/features/core/pages/settings";
import { ReactElement, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const CoreSettingsRouter = (): ReactElement => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path={CORE_SETTINGS} component={CoreSettings} />
        <Redirect path="*" to={PAGE_NOT_FOUND} />
      </Switch>
    </Suspense>
  );
};

export default CoreSettingsRouter;
