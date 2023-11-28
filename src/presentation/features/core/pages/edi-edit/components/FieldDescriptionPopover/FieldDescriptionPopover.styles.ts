import { Modal, Popover } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  padding: 8px;
  width: 192px;
  height: 98px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled.div`
  font-family: Inter;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  text-align: left;
  margin-bottom: 11px;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Link = styled.div`
  font-family: Inter;
  font-size: 11px;
  font-weight: 400;
  line-height: 15px;
  cursor: pointer;
  text-decoration: underline;
`;

export const StyledPopover = styled(Popover)`
  margin-left: 8px;
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 742px;
    border-radius: 16px;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const ModalTitle = styled.div`
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
  margin-bottom: 20px;
`;

export const ModalSubtitle = styled.div``;

export const StyledLabel = styled.span`
  border-bottom: 1px dotted;
`;

