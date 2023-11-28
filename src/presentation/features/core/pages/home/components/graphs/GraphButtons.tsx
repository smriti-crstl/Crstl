import { Button, Tooltip } from "antd";
import { ReactComponent as CalendarIcon } from "globals/assets/svgs/calendar-icon.svg";
import { ReactComponent as ChartIcon } from "globals/assets/svgs/chart-icon.svg";
import { ReactComponent as ListIcon } from "globals/assets/svgs/list-icon.svg";
import { ReactComponent as NormalChartIcon } from "globals/assets/svgs/normal-chart-icon.svg";
import { ReactComponent as ColoredCalendarIcon } from "globals/assets/svgs/colored-calendar-icon.svg";
import { ReactElement } from "react";
import styled from "styled-components";

const ButtonContainer = styled(Button)`
  padding: 8px 5px;
  margin: 12px 4px 0 4px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(242, 242, 242, 1);
  border-radius: 4px;
  transform: scale(0.9);
  border: 1px solid rgba(0, 18, 166, 0.5);
  :focus,
  :hover {
    background-color: rgba(242, 242, 242, 1);
  }
`;

type props = {
  isBalanceGraph: boolean;
  isMoneyCalendar: boolean;
  setIsBalanceGraph: (value: boolean) => void;
  setIsMoneyCalendar: (value: boolean) => void;
};

export const GraphButtons = ({
  isMoneyCalendar,
  isBalanceGraph,
  setIsBalanceGraph,
  setIsMoneyCalendar,
}: props): ReactElement => {
  console.log(isBalanceGraph, isMoneyCalendar);

  const onclickTab = (id: number) => {
    switch (id) {
      case 1:
        setIsBalanceGraph(true);
        setIsMoneyCalendar(false);
        break;
      case 3:
        setIsBalanceGraph(false);
        setIsMoneyCalendar(true);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <Tooltip title="Balance">
        <ButtonContainer onClick={() => onclickTab(1)}>
          {isBalanceGraph ? (
            <ChartIcon />
          ) : (
            <NormalChartIcon style={{ width: "20px" }} />
          )}
        </ButtonContainer>
      </Tooltip>
      <Tooltip title="Coming Soon: Estimated AR">
        <ButtonContainer disabled>
          <ListIcon />
        </ButtonContainer>
      </Tooltip>
      <Tooltip title="Money Calendar">
        <ButtonContainer onClick={() => onclickTab(3)}>
          {isMoneyCalendar ? (
            <ColoredCalendarIcon style={{ width: "18px" }} />
          ) : (
            <CalendarIcon />
          )}
        </ButtonContainer>
      </Tooltip>
    </div>
  );
};
