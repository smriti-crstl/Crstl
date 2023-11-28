import { useUserDetails } from "presentation/hooks/common";
import React from "react";

import { Role } from "@crstl/api/src/apis/models/User";

import AccessDenied from "../pages/access-denied";

// const CashAndCards = lazy(() =>
//   lazyRetry(
//     () => import(/* webpackPrefetch: true */ "../pages/analytics/CashAndCards"),
//     "CashAndCards"
//   )
// );

interface Props {
  allowedRoles?: Role[];
  children?: any;
}

function AccessControlRoute({ allowedRoles, children: childrenProp }: Props) {
  const [{ data }] = useUserDetails();

  if (data?.role) {
    const isAdmin = data.role === Role.Admin;

    if (isAdmin) {
      return childrenProp ?? null;
    }

    const isAllowedAccess = allowedRoles?.includes(data?.role ?? Role.Member);

    if (isAllowedAccess) {
      return childrenProp ?? null;
    }
  }

  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child) || typeof child.type === "string") {
      return child;
    }
    return React.cloneElement<any>(child, {
      ...(child.props as any),
      component: AccessDenied,
    });
  });

  return children;
}

export { AccessControlRoute };

