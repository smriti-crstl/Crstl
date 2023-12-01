import { ButtonProps } from "antd";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { LinkButton } from "components/atoms/buttons";
import { Paragraph } from "components/atoms/typography";

type AuthBottomBarProps = {
  text: string;
  buttonText: string;
  suffix?: string;
  buttonProps?: ButtonProps;
  redirectionUrl: string;
  showSecondaryLink?: boolean;
  secondaryLinkProps?: {
    prefix?: string;
    redirectionUrl: string;
    buttonProps?: ButtonProps;
    buttonText: string;
  };
};

export const AuthBottomBar = ({
  text,
  buttonText,
  buttonProps,
  redirectionUrl,
  suffix,
  showSecondaryLink,
  secondaryLinkProps,
}: AuthBottomBarProps): ReactElement => {
  return (
    <Paragraph
      style={{ paddingTop: "1rem", display: "inline", fontSize: "10px" }}
      weight="LIGHT"
    >
      {text}
      <Link to={redirectionUrl}>
        <LinkButton
          style={{ fontSize: "10px", height: "16px" }}
          {...buttonProps}
        >
          {buttonText}
        </LinkButton>
      </Link>
      {showSecondaryLink && (
        <>
          {secondaryLinkProps?.prefix}
          <Link to={secondaryLinkProps?.redirectionUrl || ""}>
            <LinkButton
              style={{ fontSize: "10px", height: "16px" }}
              {...secondaryLinkProps?.buttonProps}
            >
              {secondaryLinkProps?.buttonText}
            </LinkButton>
          </Link>
        </>
      )}
      {suffix}
    </Paragraph>
  );
};
