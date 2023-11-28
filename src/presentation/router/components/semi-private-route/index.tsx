import { useAuthentication } from "domain/interactors/auth/hooks";
import { LOGIN } from "globals/configs";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { SomethingWentWrong } from "../../../features/common/error-pages/pages/something-went-wrong";

export type SemiPrivateRouteLocationStateProps = null | {
  from: string;
};

interface SemiPrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
  baseRoute?: string;
}
export const SemiPrivateRoute: React.FC<SemiPrivateRouteProps> = ({
  component: Component,
  baseRoute,
}) => {
  const [{ isLoggedIn }] = useAuthentication();
  if (!Component) return <SomethingWentWrong />;

  const getCurrentLocationState = (state: unknown): Record<string, unknown> => {
    if (state && typeof state === "object") {
      return { ...state };
    }
    return {};
  };

  return (
    <Route
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: LOGIN,
              state: {
                ...getCurrentLocationState(props.location.state),
                from: baseRoute || props.location.pathname,
              },
              search: props.location.search,
            }}
          />
        )
      }
    />
  );
};
