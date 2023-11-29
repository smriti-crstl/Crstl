import { Card, CardProps, Row } from "antd";
import { ReactElement, useContext } from "react";
import styled, { CSSObject, ThemeContext } from "styled-components";

import { StarFilled, StarOutlined } from "@ant-design/icons";

import { DEVICE } from "../../config/screen-sizes/screenSize";

interface IPaperCard extends CardProps {
  extraPadding?: boolean | string;
  removePadding?: boolean;
  $isWidthDynamic?: boolean | string;
  $removeBorderRadius?: boolean;
  removeBorderBottom?: boolean;
  isResponsiveCard?: boolean;
  isBarChart?: boolean;
}

interface IAnalyticsCard extends CardProps {
  isFavorites?: boolean;
  onFavoriteChange?: () => void;
}

interface CardSizeType {
  [key: string]: CSSObject;
}

const CardSizes: CardSizeType = {
  small: {
    width: "470px",
  },
  medium: {
    width: "957px",
  },
  large: {
    width: "1444px",
  },
};

interface IFixedSizeCard extends CardProps {
  cardSize?: keyof typeof CardSizes;
}

const FixedSizeAntDCard = ({ cardSize, ...rest }: IFixedSizeCard) => (
  <Card {...rest} />
);

const StyledFixedSizeAntDCard = styled(FixedSizeAntDCard)`
  .ant-card-body {
    padding: 0;
  }
  .ant-card-head {
    border-bottom: 0;
    min-height: 44px;
  }
  .ant-card-extra,
  .ant-card-head-title {
    padding: 16px 0 0 0;
  }
`;

const AntDCard = ({
  extraPadding,
  removePadding,
  isBarChart,
  removeBorderBottom,
  ...rest
}: IPaperCard): ReactElement => <Card {...rest} />;

const StyledCard = styled(AntDCard)`
  border-radius: ${({ $removeBorderRadius }) => !$removeBorderRadius && "6px"};
  border: 1px solid ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  width: ${({ $isWidthDynamic }) =>
    !$isWidthDynamic
      ? "100%"
      : typeof $isWidthDynamic === "string"
      ? $isWidthDynamic
      : "fit-content"};
  padding: ${({ extraPadding }) =>
    extraPadding && typeof extraPadding === "boolean"
      ? "0 4rem 4rem 4rem"
      : extraPadding};
  .ant-card-body {
    padding: ${({ removePadding }) => removePadding && 0};
  }
`;

const ResponsiveStyledCard = styled(AntDCard)`
  border-radius: ${({ $removeBorderRadius }) => !$removeBorderRadius && "6px"};
  padding: ${({ extraPadding }) =>
    extraPadding && typeof extraPadding === "boolean"
      ? "0 4rem 4rem 4rem"
      : extraPadding};
  .ant-card-body {
    padding: ${({ removePadding }) => removePadding && 0};
  }
  .ant-card-head {
    border-bottom: ${({ removeBorderBottom }) => removeBorderBottom && 0};
  }
  .ant-card-extra,
  .ant-card-head-title {
    padding: ${({ removeBorderBottom }) => removeBorderBottom && "16px 0 0 0"};
  }
  margin: 10px;
  @media ${DEVICE.laptop} {
    width: 20rem;
    height: 19rem;
  }
  @media ${DEVICE.laptopL} {
    width: 25rem;
    height: 24rem;
    margin-right: 30px;
  }
  @media ${DEVICE.desktop} {
    width: 30rem;
    height: 29rem;
    margin-right: 50px;
  }
  @media ${DEVICE.desktopL} {
    width: 35rem;
    height: 34rem;
    margin-right: 100px;
  }
`;

const StyledAnalyticsCard = styled(AntDCard)`
  &.left-section-cards {
    width: 775px;
  }
  border-radius: 6px;
  .ant-card-body {
    padding: 0;
  }
  .ant-card-head {
    border-bottom: 0;
    min-height: 44px;
  }
  .ant-card-extra,
  .ant-card-head-title {
    padding: 16px 0 0 0;
  }
  margin: 12.5px;
  width: 370px;
  min-height: 305px;
`;

export const StyledFlexBoxCard = styled(StyledAnalyticsCard)`
  .ant-card-body,
  .ant-card-body div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .ant-card-head-title {
    padding: 16px 0 10px 0;
  }

  display: flex;
  flex-direction: column;
`;

export const StyledFullWidthCard = styled(AntDCard)`
  width: 100%;
  border-radius: 6px;
  .ant-card-body {
    padding: 0;
  }
  .ant-card-head {
    border-bottom: 0;
    min-height: 44px;
  }
  .ant-card-extra,
  .ant-card-head-title {
    padding: 16px 0 0 0;
  }
  margin: 12.5px;
`;

export const FixedSizeCard = styled(StyledFixedSizeAntDCard)({
  borderRadius: "6px",
});

export const FluidWidthCard = FixedSizeCard;

export const CardBody = styled.div({
  padding: "0 24px",
});

export const PaperCard = ({
  isResponsiveCard,
  removeBorderBottom,
  isBarChart,
  ...rest
}: IPaperCard): ReactElement =>
  isResponsiveCard ? (
    <ResponsiveStyledCard {...rest} removeBorderBottom isBarChart />
  ) : (
    <StyledCard {...rest} />
  );

export const HorizontallyCenteredPaperCard = ({
  children,
  ...rest
}: IPaperCard): ReactElement => (
  <StyledCard {...rest}>
    <Row align="middle" style={{ flexDirection: "column" }}>
      {children}
    </Row>
  </StyledCard>
);

const FavouriteStar = ({
  isFavorites,
  onFavoriteChange,
}: IAnalyticsCard): ReactElement => {
  const theme = useContext(ThemeContext);

  return isFavorites ? (
    <StarFilled
      style={{ color: theme.palette.colors.CREAM_CAN }}
      onClick={onFavoriteChange}
    />
  ) : (
    <StarOutlined
      style={{ color: theme.palette.colors.SILVER }}
      onClick={onFavoriteChange}
    />
  );
};

// toggle to be able to show or hide stars
const SHOW_STAR = false;

export const AnalyticsPaperCard = ({
  isFavorites,
  onFavoriteChange,
  ...rest
}: IAnalyticsCard): ReactElement => {
  return (
    <StyledAnalyticsCard
      className={"grid-item"}
      extra={
        SHOW_STAR ? (
          <FavouriteStar
            isFavorites={isFavorites}
            onFavoriteChange={onFavoriteChange}
          />
        ) : null
      }
      {...rest}
    />
  );
};
