import { useAuthentication } from "domain/interactors/auth/hooks";
import { LOGIN, ORG_SELECTION } from "globals/configs";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { SomethingWentWrong } from "../../../features/common/error-pages/pages/something-went-wrong";

export type PrivateRouteLocationStateProps = null | {
  from: string;
};

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
  baseRoute?: string;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  baseRoute,
}) => {
  const [{ isAuthenticated, isLoggedIn }] = useAuthentication();
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
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: isLoggedIn ? ORG_SELECTION : LOGIN,
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

