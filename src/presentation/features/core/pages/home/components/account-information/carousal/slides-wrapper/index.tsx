import { ReactElement } from "react";
import styled from "styled-components";

import { PrimarySlide } from "../primary-slide";
import { SecondarySlide } from "../secondary-slide";

type SlideProps = {
  $zIndex: number;
  $length: number;
};

const StyledSlide = styled.div<SlideProps>`
  z-index: ${({ $zIndex }) => $zIndex};
  min-width: 250px;
  height: 100%;
  max-height: 200px;
  font-size: 1rem;
  width: 70%;
  position: absolute;
  & > * {
    height: 100%;
  }
  margin-left: ${({ $length }) =>
    $length === 1 || $length === 2 ? "35px" : "0px"};
`;

type Props = {
  bgColor?: string;
  color?: string;
  name?: string;
  balance?: number;
  accountNumber?: string;
  message?: string;
  noOfRampCards?: number;
  index: number;
  length: number;
};

const Mappings = ({ index, ...rest }: Props): ReactElement => {
  switch (index) {
    case 0:
      return <PrimarySlide {...rest} />;
    case 1:
      return (
        <SecondarySlide
          {...{
            translateX: "12%",
            showName: true,
            transitionFactor: index,
            ...rest,
          }}
        />
      );
    case 2:
      return (
        <SecondarySlide
          {...{
            translateX: "24%",
            showName: true,
            transitionFactor: index,
            ...rest,
          }}
        />
      );
    case 3:
      return (
        <SecondarySlide
          {...{ translateX: "29%", transitionFactor: index, ...rest }}
        />
      );
    case 4:
      return (
        <SecondarySlide
          {...{ translateX: "34%", transitionFactor: index, ...rest }}
        />
      );
    default:
      return <div />;
  }
};

export const SlidesWrapper = ({
  index,
  length,
  ...rest
}: Props): ReactElement => {
  return (
    <StyledSlide $zIndex={length - index} $length={length}>
      <Mappings {...{ index, length, ...rest }} />
    </StyledSlide>
  );
};
