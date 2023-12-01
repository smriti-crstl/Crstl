import moment from "moment";
import { useEffect, useState } from "react";

import { OnboardingTaskData } from "models/v1/edi/OnboardingTaskList";
import { SimpleTable } from "components/atoms/table";

import { SetOnboardingRequestModalData } from "../../../../hooks/useSetupFormModal";
import { ActionButton } from "../ActionButton";
import {
  ColorCircle,
  LaneHeader,
  StyledCollapse,
  StyledPanel,
  StyledSpacer,
  TableContainer,
} from "./styles";

interface PublicProps {
  laneData: OnboardingTaskData;
  toggleRequestModal: () => void;
  setRequestModalData: SetOnboardingRequestModalData;
}

export const ListAccordion: React.FC<PublicProps> = ({
  laneData,
  toggleRequestModal,
  setRequestModalData,
}) => {
  const [activeKey, setActiveKey] = useState<string | string[]>();

  const { title: laneTitle, cards: cardData } = laneData;

  useEffect(() => {
    setActiveKey(laneData.cards.length === 0 ? [] : ["1"]);
  }, [laneData.cards.length]);

  const LIST_VIEW_TABLE_CONFIG = () => [
    {
      title: "Task name",
      dataIndex: "title",
      width: "25%",
      render: function TaskName(value: string, tableRow: any) {
        if (
          ["global-edi-setup", "alerts-setup"].includes(
            tableRow?.user_task_type
          )
        ) {
          value = "📌 " + value;
        }

        return value;
      },
    },
    {
      title: "Trading Partner",
      dataIndex: "trading_partner_name",
      width: "25%",
    },
    {
      title: "Created",
      dataIndex: "created_timestamp",
      width: "15%",
      render: (value: string) => {
        return moment(value).format("MMM D, YYYY");
      },
    },
    {
      title: "Days ago",
      dataIndex: "created_timestamp",
      width: "15%",
      render: (value: string) => {
        const createdDate = moment(value);
        const ageOfTicket = moment().diff(createdDate, "days");
        const children = ageOfTicket ? (
          <span>{ageOfTicket} days ago</span>
        ) : null;
        return children;
      },
    },
    {
      title: `${laneTitle === "Completed" ? "Completed on" : ""}`,
      dataIndex: "completed_timestamp",
      width: "20%",
      render: function ActionButtonFn(value: string, tableRow: any) {
        return (
          <ActionButton
            cardData={tableRow}
            toggleRequestModal={toggleRequestModal}
            setRequestModalData={setRequestModalData}
            status={laneTitle}
            isListView={true}
            completedDate={moment(value).format("MMM D, YYYY")}
          />
        );
      },
    },
  ];

  return (
    <StyledSpacer extraStyle={laneData.style} direction="vertical">
      <StyledCollapse
        onChange={(key) => setActiveKey(key)}
        activeKey={activeKey}
        style={{ ...laneData.style }}
      >
        <StyledPanel
          header={
            <LaneHeader>
              <ColorCircle extraStyle={laneData.style} />
              <span>{`${laneData.title} (${laneData.cards.length})`}</span>
            </LaneHeader>
          }
          key="1"
        >
          <TableContainer styleProp={laneData.style}>
            <SimpleTable
              columns={LIST_VIEW_TABLE_CONFIG()}
              dataSource={cardData}
              pagination={false}
            />
          </TableContainer>
        </StyledPanel>
      </StyledCollapse>
    </StyledSpacer>
  );
};

