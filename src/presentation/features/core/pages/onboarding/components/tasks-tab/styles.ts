import { Button, Progress } from "antd";
import styled from "styled-components";

import Icon from "@ant-design/icons";
import onboardingHeaderBgImg from "@crstl/app/src/globals/assets/images/onboarding-header-bg.png";
import { Modal } from "@crstl/components/atoms/modal";

interface ButtonProps {
  backgroundColor: string;
  isListView: boolean;
}

export const BoardWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  height: inherit;
  gap: 12px;
  height: calc(100vh - 80px - 46px - 38px);
`;

export const StyledModal = styled(Modal)`
  .ant-modal-body {
    overflow-x: scroll;
    max-height: 80vh;
  }
`;

export const CommonHeader = styled.div`
  border-radius: 8px;
  margin-bottom: 12px;
  background-image: url(${onboardingHeaderBgImg});
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
  color: ${({ theme }) => `${theme.palette.colors.WHITE}`};
  padding: 16px 40px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
`;

export const Title = styled.h1`
  margin: 0px;
  color: ${({ theme }) => `${theme.palette.colors.WHITE}`};
`;

export const SubTitle = styled.p`
  margin-bottom: 8px;
  width: 80%;
  display: none;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

export const TogglerText = styled.div`
  margin-right: 6px;
`;

export const StyledProgress = styled(Progress)`
  width: 50%;

  .ant-progress-text {
    font-weight: 500;
    color: white;
  }
`;

interface ViewModeIconProps {
  isSelected: boolean;
}

export const ViewModeIcon = styled(Icon)<ViewModeIconProps>`
  font-size: 30px;
  border-radius: 4px;
  padding: 4px;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.colors.WHITE : "rgba(255, 255, 255, 0.56)"};
  border-color: ${({ isSelected, theme }) =>
    isSelected && theme.palette.colors.WHITE};
  border-style: solid;
  border-width: ${({ isSelected }) => (isSelected ? "1px" : "0px")};
  border-color: ${({ isSelected, theme }) =>
    isSelected && theme.palette.colors.WHITE};
  background-color: ${({ isSelected }) =>
    isSelected && "rgba(255, 255, 255, 0.36)"};
`;

export const StyledActionButton = styled(Button)<ButtonProps>`
  color: ${({ theme }) => theme.palette.text.SECONDARY};
  border-color: ${(props) => props.backgroundColor};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  text-shadow: none;
  box-shadow: none;
  margin-top: ${(props) => (props.isListView ? 0 : 20)}px;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.text.SECONDARY};
    border-color: ${(props) => props.backgroundColor};
    background-color: ${(props) => props.backgroundColor};
    border-radius: 5px;
    text-shadow: none;
    box-shadow: none;
  }
`;

export const StyledTourButton = styled(Button)`
  height: 40px;
  padding: 0px 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.colors.WHITE};
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  text-shadow: none;
  box-shadow: none;
  font-weight: 500;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.colors.WHITE};
    border: 1px solid ${({ theme }) => theme.palette.colors.WHITE};
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    text-shadow: none;
    box-shadow: none;
  }
`;

