import { ReactComponent as ArrowUp } from "globals/assets/svgs/arrow-up.svg";
import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ColoredButton } from "components/atoms/buttons";

import { GenericHeading } from "../../../atoms/typography";
import { HeaderIconProps, HeaderIcons } from "../../icon-groups";
import { StyledHeader } from "../header-wrapper";

export const BackButton = (): ReactElement => {
  const history = useHistory();
  return (
    <ColoredButton
      onClick={() => {
        history.goBack();
      }}
      style={{ marginRight: "8px" }}
      size="middle"
      type="ghost"
    >
      <div style={{ transform: "rotate(-90deg)" }}>
        <ArrowUp style={{ fill: "inherit" }} />
      </div>
    </ColoredButton>
  );
};

export type WhiteHeaderWithIconsProps = {
  title: string;
  iconsData?: HeaderIconProps[];
  showBackButton?: boolean;
  widget?: ReactNode;
  others: any[];
};

const HeadingContainer = styled.span`
  margin-left: ${({ theme }) => theme.spacing.XL};
`;
export const WhiteHeaderWithIcons = ({
  title,
  iconsData,
  showBackButton,
  widget,
  others,
}: WhiteHeaderWithIconsProps): ReactElement => {
  return (
    <StyledHeader>
      <GenericHeading
        weight="MEDIUM"
        style={{ margin: 0, display: "flex", alignItems: "center" }}
        size="SM"
        className="top-header"
      >
        {showBackButton && <BackButton />}
        {title}
        {widget}
      </GenericHeading>
      <HeaderIcons data={iconsData} others={others} />
    </StyledHeader>
  );
};
