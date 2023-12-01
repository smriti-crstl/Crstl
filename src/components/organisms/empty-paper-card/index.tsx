import { ReactElement, useEffect, useState, useContext } from "react";
import { PaperCard } from "components/atoms/card";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { EmptyData } from "../../atoms/empty";
import { ThemeContext } from "styled-components";

export const EmptyPaperCard = (): ReactElement => {
  const windowWidth = window.screen.availWidth;
  const [isFavorites, setIsFavorites] = useState(false);
  const [cardHeight, setCardHeight] = useState("19rem");
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (windowWidth >= 1300 && windowWidth < 1600) {
      setCardHeight("19rem");
    }
    if (windowWidth >= 1600 && windowWidth < 1920) {
      setCardHeight("24rem");
    }
    if (windowWidth >= 1920) {
      setCardHeight("29rem");
    }
  }, [windowWidth]);

  const onFavoriteChange = (): void => {
    setIsFavorites(!isFavorites);
  };

  return (
    <PaperCard
      removeBorderBottom
      isResponsiveCard
      extra={
        isFavorites ? (
          <StarFilled
            style={{ color: theme.palette.colors.CREAM_CAN }}
            onClick={onFavoriteChange}
          />
        ) : (
          <StarOutlined
            style={{ color: theme.palette.colors.SILVER }}
            onClick={onFavoriteChange}
          />
        )
      }
      $isWidthDynamic
    >
      <div style={{ height: cardHeight }}>
        <EmptyData />
      </div>
    </PaperCard>
  );
};
