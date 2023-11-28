import { Empty } from "antd";
import { ReactComponent as ChevronRight } from "globals/assets/svgs/chevron-right.svg";
import { ReactElement, useLayoutEffect, useState } from "react";
import styled, { css } from "styled-components";

import { SlidesWrapper } from "./slides-wrapper";

type ChevronProps = {
  $isDisabled: boolean;
};

const CardsContainer = styled.div`
  width: 475px;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChevronStyles = css`
  height: 30px;
  &:focus {
    outline: none;
  }
`;

const StyledTransparentButton = styled.button<ChevronProps>`
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  outline: none;
`;

const StyledChevronRight = styled(ChevronRight)<ChevronProps>`
  ${ChevronStyles}
  fill: ${({ $isDisabled }) => ($isDisabled ? "#CDCDCD" : "#4d4d4d")};
`;

const StyledChevronLeft = styled(ChevronRight)<ChevronProps>`
  ${ChevronStyles}
  fill: ${({ $isDisabled }) => ($isDisabled ? "#CDCDCD" : "#4d4d4d")};
  transform: rotateZ(180deg);
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
`;

export type SlideDataSetProps = Array<{
  color?: string;
  bgColor: string;
  name: string;
  balance?: number;
  accountNumber?: string;
  accountName?: string;
  limit?: number;
  message?: string;
  countOfRampCards?: number;
}>;

type Props = {
  slideData?: SlideDataSetProps;
  updatedAt?: string;
};
export const HomeAccountCarousal = ({ slideData }: Props): ReactElement => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState(() => {
    return slideData ? slideData : [];
  });

  useLayoutEffect(() => {
    setData(slideData || []);
  }, [slideData]);

  const nextSlide = (): void => {
    setActiveSlide((prev) => {
      if (prev === data.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
    setData((prev) => {
      const [firstSlide, ...rest] = prev;
      return [...rest, firstSlide];
    });
  };

  const prevSlide = (): void => {
    setActiveSlide((prev) => {
      if (prev === 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });

    setData((prev) => {
      const clone = [...prev];
      const lastSlide = clone.splice(-1);
      return [...lastSlide, ...clone];
    });
  };

  if (slideData && slideData.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <CardsContainer>
      <div style={{ position: "relative", height: "100%" }}>
        {data.map((item, index) => {
          return (
            <SlidesWrapper
              key={item.name + item.bgColor + item.accountNumber}
              {...item}
              index={index}
              length={data.length}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
          marginTop: "10px",
        }}
      >
        <StyledTransparentButton
          $isDisabled={activeSlide === 0}
          onClick={prevSlide}
          disabled={activeSlide === 0}
        >
          <StyledChevronLeft $isDisabled={activeSlide === 0} />
        </StyledTransparentButton>
        &nbsp;&nbsp;
        <div style={{ margin: "0 1.5rem" }}>
          {activeSlide + 1}/{data.length}
        </div>
        &nbsp;&nbsp;
        <StyledTransparentButton
          $isDisabled={slideData ? activeSlide === slideData?.length - 1 : true}
          onClick={nextSlide}
          disabled={slideData ? activeSlide === slideData?.length - 1 : true}
        >
          <StyledChevronRight
            $isDisabled={
              slideData ? activeSlide === slideData?.length - 1 : true
            }
          />
        </StyledTransparentButton>
      </div>
    </CardsContainer>
  );
};
