import { ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";

export const AnchorLink = ({ children, ...rest }: LinkProps): ReactElement => {
  return <Link {...rest}>{children}</Link>;
};
