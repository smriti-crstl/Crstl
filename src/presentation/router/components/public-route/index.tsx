import { APP_ROOT_URL } from "globals/configs";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { SomethingWentWrong } from "../../../features/common/error-pages/pages/something-went-wrong";

interface PrivateRouteProps extends RouteProps {
  baseRoute?: string;
  restricted?: boolean;
}
export const PublicRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  baseRoute,
  restricted,
  ...rest
}) => {
  if (!Component) return <SomethingWentWrong />;
  if (restricted) {
    return (
      <Route
        render={(props) => (
          <Redirect
            to={{
              pathname: APP_ROOT_URL,
              state: { from: baseRoute || props.location.pathname },
            }}
          />
        )}
        {...rest}
      />
    );
  }
  return <Route component={Component} {...rest} />;
};

