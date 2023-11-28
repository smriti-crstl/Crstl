import { Badge, Button } from "antd";
import { StyledPrimaryButton } from "presentation/features/core/pages/edi-edit/EdiEditPage.styles";
import styled from "styled-components";

interface CustomNavigation {
  active?: boolean;
}

export const TourContainer = styled.div`
  padding-left: 8px;
`;

export const BadgeContainer = styled(Badge)`
  sup {
    background-color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
    position: absolute;
    left: -35px;
    right: auto;
    box-shadow: none;
  }
`;

export const PopoverTab = styled.div`
  background-color: ${({ theme }) => theme.palette.colors.WHITE};
  padding: 15px;
  width: 350px;
  line-height: 1.4;
`;

export const ContentWrapper = styled.div`
  text-align: center;
  line-height: 23px;
`;

export const TitleContainer = styled.h3`
  font-weight: bold;
`;

export const SkipButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const PreviousButton = styled(Button)`
  margin-right: 10px;
  color: ${({ theme }) => theme.palette.colors.ALMOST_BLACK};
  border: none;
  box-shadow: none;

  &:hover {
    color: ${({ theme }) => theme.palette.colors.CORNFLOWER_BLUE};
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.colors.MERCURY} !important;
    background-color: ${({ theme }) =>
      theme.palette.background.PRIMARY} !important;
  }
`;

export const NextButton = styled(StyledPrimaryButton)`
  border-radius: 4px;
`;

export const SkipButton = styled(Button)`
  color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  border: none;
  padding: 0px;
  box-shadow: none;
`;

export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledNavigationButton = styled.span<CustomNavigation>`
  height: ${({ active }) => (active ? "8px" : "6px")};
  width: ${({ active }) => (active ? "8px" : "6px")};
  background-color: ${({ active, theme }) =>
    active
      ? theme.palette.colors.ULTRAMARINE_BLUE
      : theme.palette.colors.DUSTY_GRAY};
  border-radius: 50%;
  display: inline-block;
  margin: 0px 3px;
  border: none;
  cursor: pointer;
`;

