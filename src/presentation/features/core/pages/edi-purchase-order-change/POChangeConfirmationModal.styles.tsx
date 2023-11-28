import { Button, Modal } from "antd";
import styled from "styled-components";

type IFormOption = {
  selected?: boolean;
};

export const StyledModal = styled(Modal)`
  display: flex;
  alignitems: center;
  justifycontent: center;
  .ant-modal-content {
    border-radius: 16px;
  }
`;

export const POChangeConfirmationModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 56px;
  width: 600px;
  border-radius: 16px;
`;
export const Title = styled.span`
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
`;
export const Subtitle = styled.span`
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
`;

export const FormOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormOption = styled.div<IFormOption>`
  position: relative;
  display: flex;
  white-space: pre-line;
  width: 232px;
  height: 140px;
  border: 1px solid black;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid ${(props) => (props.selected ? "#4E63F8" : "#D9D9D9")};
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  background: ${(props) => (props.selected ? "#F6F9FD" : "#FFFFFF")};
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;

export const CancelButton = styled(Button)`
  margin-right: 12px;
  background: #f0f0f0;
  border-radius: 4px;
  height: 42px;
  width: 126px;
`;

export const OKButton = styled(Button)`
  background: #4e63f8;
  border-radius: 4px;
  height: 42px;
  width: 126px;
`;

export const GrayDot = styled.div`
  height: 16px;
  width: 16px;
  background: #f0f0f0;
  border-radius: 9999;
  position: absolute;
  align-self: flex-start;
  left: 12px;
  top: 12px;
`;
