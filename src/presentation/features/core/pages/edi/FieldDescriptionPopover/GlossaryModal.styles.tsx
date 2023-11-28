import { Modal } from "antd";
import styled from "styled-components";

interface IRowProps {
  highlight: boolean;
}

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 742px;
    border-radius: 16px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const Header = styled.div`
  margin-bottom: 36px;
`;

export const Title = styled.div`
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
  margin-bottom: 20px;
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
  white-space: pre-wrap;
`;

export const Row = styled.tr<IRowProps>`
  margin-bottom: 22px;
  background: ${(props) => (props.highlight ? "#DCE0FE" : "white")};
  border-radius: 4px;
  white-space: pre-wrap;
`;

export const RowKey = styled.td`
  font-weight: 600;
  text-align: left;
  width: 124px;
  vertical-align: top;
  padding-left: 12px;
  padding-top: 8px;
`;

export const TableContainer = styled.div`
  height: 400px;
  overflow: auto;
`;
