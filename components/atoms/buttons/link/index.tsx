import { Button, ButtonProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

type LinkButtonProps = ButtonProps & {
  extraPadding?: string | boolean;
  $linkColor?: string;
};

// creating custom styled container to override antd button classes
const StyledButtonContainer = styled.span<LinkButtonProps>`
  .ant-btn-link {
    color: ${({ theme, $linkColor }) =>
      $linkColor ? $linkColor : theme.palette.text.PRIMARY};
    :hover,
    :focus {
      color: ${({ theme, $linkColor }) =>
        theme.mixins.lightenColor(
          $linkColor ? $linkColor : theme.palette.text.PRIMARY
        )};
    }
    /* default padding */
    padding: 0 4px;
    /* overriding default padding based on extra-padding */
    padding: ${({ theme, extraPadding }) =>
      theme.mixins.addExtraPadding(extraPadding, "0 8px")};
    font-weight: inherit;

    > * {
      text-decoration: underline;
    }
  }
`;

export const LinkButton = ({
  children,
  extraPadding,
  $linkColor,
  ...rest
}: LinkButtonProps): ReactElement => {
  // antD button container
  const ButtonContainer = (
    <Button type="link" {...rest}>
      {children}
    </Button>
  );
  return (
    <StyledButtonContainer {...{ extraPadding, $linkColor }}>
      {ButtonContainer}
    </StyledButtonContainer>
  );
};
