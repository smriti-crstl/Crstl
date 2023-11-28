import { ReactElement, ReactNode } from "react";

import { SimpleSkeletonProps, Skeleton } from "./Skeleton";
import { Spinner, SpinnerProps } from "./Spinner";

type Props = {
  type?: "spinner" | "skeleton";
  spinnerProps?: SpinnerProps;
  skeletonProps?: SimpleSkeletonProps;
  children?: ReactNode;
};

export const GenericLoading = ({
  type = "skeleton",
  spinnerProps,
  skeletonProps,
  children,
}: Props): ReactElement => {
  switch (type) {
    case "skeleton":
      return (
        <Skeleton aria-label="Loading" {...skeletonProps}>
          {children}
        </Skeleton>
      );
    case "spinner":
      return (
        <Spinner aria-label="Loading" {...spinnerProps}>
          {children}
        </Spinner>
      );
    default:
      return <span>{"Loading..."}</span>;
  }
};
