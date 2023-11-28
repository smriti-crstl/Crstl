import styled from "styled-components";

import { ReactComponent as UpArrow } from "globals/assets/svgs/up-Arrow.svg";
import { ReactComponent as UpArrowDisabled } from "globals/assets/svgs/up-Arrow-Disabled.svg";
import { ReactComponent as DownArrow } from "globals/assets/svgs/down-Arrow.svg";
import { ReactComponent as DownArrowDisabled } from "globals/assets/svgs/down-Arrow-Disabled.svg";

interface IMoneyCalendarProps {
  $dueDate?: string;
  $currentDate?: string;
  $positive?: boolean;
  $color?: string;
  $background?: string;
  $bottom?: boolean;
}

interface IStyledAmountSpanProps {
  $payable?: boolean;
}

interface IDueAmountText {
  $color?: string;
}

interface ITotalAmountTextProps {
  $color?: string;
}

const ContainerWrapper = styled.div`
  width: 350px;
  height: 150px;
  padding: 15px 10px;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DescriptionWrapper = styled.div`
  display: flex;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.1;
  font: inter;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.9;
`;

const Styledlabel = styled.text`
  margin-bottom: 5px;
  margin-right: 3px;
`;

const StyledText = styled.text`
  margin-bottom: 5px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.colors.BLACK};
`;

const CalendarWrapper = styled.div`
  height: 100%;
  padding: 1rem;
  /* hiding month / year part of the calendar */
  .ant-picker-calendar-header .ant-picker-calendar-mode-switch {
    display: none;
  }
  .ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-cell-selected
    .ant-picker-calendar-date,
  .ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-cell-selected:hover
    .ant-picker-calendar-date,
  .ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-cell-selected
    .ant-picker-calendar-date-today,
  .ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-cell-selected:hover
    .ant-picker-calendar-date-today {
    background: none;
  }
  .ant-picker-content {
    td {
      cursor: default;
    }
  }
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner,
  .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner,
  .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
    color: #fff;
    background: none;
  }
`;

const CalendarCellWrapper = styled.div`
  overflow-y: auto;
  text-align: center;
`;

const StyledSpan = styled.span`
  font-size: 10px;
  width: 35px;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
`;

const StyledUpArrow = styled(UpArrow)`
  margin-right: 3px;
  width: 7px;
`;

const StyledUpArrowDisabled = styled(UpArrowDisabled)`
  margin-right: 3px;
  width: 7px;
`;

const StyledDownArrow = styled(DownArrow)`
  margin-right: 3px;
  width: 7px;
  align-self: center;
`;

const StyledDownArrowDisabled = styled(DownArrowDisabled)`
  margin-right: 3px;
  width: 7px;
  align-self: center;
`;

const StyledList = styled.li<IMoneyCalendarProps>`
  color: ${(props) => props.$color};
  background: ${(props) => props.$background};
  font-size: 10px;
  width: 100%;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.$bottom ? "20px" : "3px")};
`;

const DueListDetailWrapper = styled.div`
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  max-height: 180px;
  overflow-y: auto;
`;

const StyledAmountSpan = styled.span<IStyledAmountSpanProps>`
  font-size: 12px;
  width: 80px;
  color: ${(props) =>
    props.$payable
      ? props.theme.palette.text.CALENDAR_CHIP_TEXT_NEGATIVE_RED
      : props.theme.palette.text.CALENDAR_CHIP_TEXT_GREEN};
`;

const DueListWrapper = styled.div`
  width: max-content;
  min-width: 250px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
`;

const DueListHeader = styled.div`
  align-self: center;
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme.palette.text.PRIMARY};
`;

const DueListFooter = styled.div`
  padding: 12px 12px 0 12px;
  border-top: 1px solid ${(props) => props.theme.palette.background.SECONDARY};
  display: flex;
  justify-content: space-between;
  color: black;
`;

const DueAmountText = styled.span<IDueAmountText>`
  font-weight: bold;
  color: ${(props) => props.$color};
`;

const FooterText = styled.div`
  font-size: 10px;
`;

const StyledFirmName = styled.text`
  margin-left: 4px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.PRIMARY};
`;

const ListItemWrapper = styled.div`
  margin: 2px 0;
  display: flex;
  align-items: center;
  align-content: center;
`;

const TotalAmountText = styled.h2<ITotalAmountTextProps>`
  margin-bottom: -45px;
  margin-left: 10px;
  color: ${(props) => props.$color};
  font-size: 20px;
  font-weight: 500;
`;

export {
  StyledList,
  DataWrapper,
  LabelWrapper,
  HeadingWrapper,
  DescriptionWrapper,
  ContainerWrapper,
  StyledText,
  Styledlabel,
  CalendarWrapper,
  CalendarCellWrapper,
  StyledSpan,
  StyledUpArrow,
  StyledUpArrowDisabled,
  DueListDetailWrapper,
  DueListHeader,
  DueListFooter,
  FooterText,
  DueAmountText,
  ListItemWrapper,
  StyledFirmName,
  DueListWrapper,
  StyledAmountSpan,
  TotalAmountText,
  StyledDownArrow,
  StyledDownArrowDisabled,
};
