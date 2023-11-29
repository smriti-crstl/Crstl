import { Button, ButtonProps } from "antd";
import { ReactElement } from "react";
import styled, { css } from "styled-components";

import { IThemesSpacing } from "@crstl/app/src/globals/themes/default/contract";

type ButtonTypes = "SECONDARY" | "TERTIARY" | "ERROR";

export type ColoredButtonProps = ButtonProps & {
  customType?: ButtonTypes;
  extraPadding?: string | boolean;
  buttonProps?: ButtonProps;
  $spaceTop?: keyof IThemesSpacing;
  $buttonPlacement?: "right";
};

const commonCss = css<ColoredButtonProps>`
  margin-top: ${({ theme, $spaceTop }) =>
    $spaceTop && theme.spacing[$spaceTop]};
  float: ${({ $buttonPlacement }) => $buttonPlacement && "right"};
`;

// creating custom styled container to override antd button classes
const CustomTypeStyledButtonContainer = styled.span<ColoredButtonProps>`
  ${commonCss}
  .ant-btn-primary {
    background: ${({ theme, customType = "SECONDARY" }) =>
      theme.palette.base[customType]};
    border-color: ${({ theme, customType = "SECONDARY" }) =>
      theme.palette.base[customType]};
    :hover,
    :focus {
      background: ${({ theme, customType = "SECONDARY" }) =>
        theme.mixins.lightenColor(theme.palette.base[customType])};
    }
  }
`;

const DefaultButtonContainer = styled(Button)<ColoredButtonProps>`
  ${commonCss}
`;

export const ColoredButton = ({
  children,
  customType,
  extraPadding,
  style = {},
  buttonProps,
  $spaceTop,
  $buttonPlacement,
  ...rest
}: ColoredButtonProps): ReactElement => {
  const styles = {
    ...style,
  };

  // adding extra padding logic
  if (extraPadding) {
    if (typeof extraPadding === "boolean") {
      styles.padding = "0 2.5rem";
    } else if (typeof extraPadding === "string") {
      styles.padding = extraPadding;
    }
  }

  const commonProps = {
    $buttonPlacement,
    $spaceTop,
  };

  // antD button container
  const ButtonContainer = (
    <DefaultButtonContainer
      type="primary"
      style={styles}
      {...commonProps}
      {...buttonProps}
      {...rest}
    >
      {children}
    </DefaultButtonContainer>
  );

  if (!customType) {
    return ButtonContainer;
  }
  return (
    <CustomTypeStyledButtonContainer {...{ customType, ...commonProps }}>
      {ButtonContainer}
    </CustomTypeStyledButtonContainer>
  );
};
