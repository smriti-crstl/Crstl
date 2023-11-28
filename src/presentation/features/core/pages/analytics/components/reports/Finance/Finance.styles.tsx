import { Select, Table, Dropdown } from "antd";
import styled from "styled-components";

import { CARD_HEIGHT, LIVE_TABS } from "../../../config";

interface IRightSection {
  tabSelected?: string;
}

interface ITotalAmount {
  sign?: string;
}

export const FinanceSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const LeftSection = styled.div`
  display: flex;
  flex: 2 0 auto;
  flex-direction: column;
`;

export const RightSection = styled.div<IRightSection>`
  ${(props) =>
    props.tabSelected === LIVE_TABS.FINANCE &&
    `display: flex;
    flex: 1 0 auto;
    flex-direction: column;
  `}
`;

export const CarouselContainer = styled.div`
  height: 290px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const BreakElement = styled.div`
  overflow: hidden;
  height: 0px;
  width: 0px;
`;

export const TotalAmount = styled.div<ITotalAmount>`
  font-weight: 700;
  color: ${({ sign, theme }) =>
    sign === "+"
      ? theme.palette.colors.CHATEAU_GREEN
      : sign === "-"
      ? theme.palette.colors.NEGATIVE_RED
      : theme.palette.colors.ALMOST_BLACK};
`;

export const TotalAmountPrefix = styled.div`
  margin-right: 2px;
`;

export const TotalAmountContainer = styled.div`
  position: relative;
  bottom: 40px;
  padding: 0px 8px;
  line-height: 24px;
  font-size: 10px;
  display: flex;
  width: 116px;
`;

export const TableContainer = styled(Table)`
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.colors.ALMOST_BLACK};
  .ant-table-thead {
    .ant-table-cell {
      background-color: ${({ theme }) =>
        theme.palette.background.TABLE_HEADER_BG_COLOR};
    }
  }
`;

export const InvoiceDueTableContainer = styled(TableContainer)`
  font-size: 10px !important;
  padding: 0px !important;
`;

export const TitleContainer = styled.div`
  color: ${({ theme }) => theme.palette.colors.BLACK};
  font-weight: 400;
  font-size: 16px;
  white-space: pre-line;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FullHeightDiv = styled.div`
  height: 100%;
`;

export const MarginTopDiv = styled.div`
  margin-top: 10px;
`;

export const CardContainer = styled.div`
  height: ${CARD_HEIGHT};
  padding: 5px;
  padding-top: 10px;
`;

export const StyledSelect = styled(Select)`
  min-width: 124px;
  margin-right: 4px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
`;

export const StyledDropdown = styled(Dropdown)`
  border: 1px solid ${(props) => props.theme.palette.colors.ALMOST_BLACK};
  padding: 6px;
  font-size: 14px;
`;

export const StyledHeader = styled.div`
  max-width: 392px;
  overflow: hidden;
  overflow-wrap: break-word;
  white-space: pre-line;
  padding-right: 12px;
`;

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SelectedItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
`;
