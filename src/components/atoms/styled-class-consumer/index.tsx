import { ReactElement } from "react";

// https://github.com/styled-components/styled-components/issues/2113

export type ClassNameConsumerProps = {
  className?: string;
  children: (className?: string) => React.ReactElement;
};

export const ClassNameConsumer = ({
  className,
  children,
}: ClassNameConsumerProps): ReactElement => children(className);
