import { Modal } from "antd";
import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  width: 60%;
`;

export const SectionWrapper = styled.div`
  width: 100%;
`;

export const FieldRow = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid
    ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};

  display: flex;
  gap: 20px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  gap: 8px;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-modal-content {
    border-radius: 16px;
  }
`;

export const TabsContainer = styled.div`
  .ant-tabs-nav {
    padding-right: 0px !important;
    padding-left: 0px !important;
    box-shadow: none !important;
  }

  .ant-tabs-nav::before {
    border: none;
  }
`;

export const ColorCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const TabItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FormItemContainer = styled.div`
  margin: 0;
`;
