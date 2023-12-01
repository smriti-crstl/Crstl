import moment from "moment";

import { CheckOutlined } from "@ant-design/icons";
import { CardData } from "models/v1/edi/OnboardingTaskList";

import { SetOnboardingRequestModalData } from "../../../../hooks/useSetupFormModal";
import { ActionButton } from "../ActionButton";
import {
  CardBody,
  CardCreationInfo,
  CardFooter,
  CardTitle,
  CardWrapper,
  CompletedTimeStamp,
  CompletedTimestampInfo,
  ETAChip,
  TagsContainer,
  TradingPartnerChip,
} from "./styles";

interface PublicProps {
  cardData: CardData;
  toggleRequestModal: () => void;
  setRequestModalData: SetOnboardingRequestModalData;
  laneTitle: string;
}

export const LaneCard: React.FC<PublicProps> = ({
  cardData,
  toggleRequestModal,
  setRequestModalData,
  laneTitle,
}) => {
  const currentDate = moment();
  const createdDate = moment(cardData?.created_timestamp);
  const ageOfTicket = currentDate.diff(createdDate, "days");

  const isTagsContainerVisible =
    cardData?.trading_partner_name || cardData?.eta_timestamp;

  return (
    <CardWrapper>
      <CardBody>
        {isTagsContainerVisible && (
          <TagsContainer>
            {cardData.trading_partner_name && (
              <TradingPartnerChip>
                {cardData?.trading_partner_name}
              </TradingPartnerChip>
            )}
            {cardData?.eta_timestamp && (
              <ETAChip>
                ETA: {moment(cardData.eta_timestamp).format("MMM D, YYYY")}
              </ETAChip>
            )}
          </TagsContainer>
        )}
        <CardTitle toStrikethrough={laneTitle === "Completed"}>
          {cardData?.title}
        </CardTitle>
        <ActionButton
          cardData={cardData}
          toggleRequestModal={toggleRequestModal}
          setRequestModalData={setRequestModalData}
          status={laneTitle}
          isListView={false}
        />
      </CardBody>
      <CardFooter>
        {cardData?.created_timestamp && (
          <CardCreationInfo>
            <span>
              Created:{" "}
              {moment(cardData.created_timestamp).format("MMM D, YYYY")}
            </span>
            {/* {ageOfTicket ? <span>{ageOfTicket} days ago</span> : null} */}
          </CardCreationInfo>
        )}
        {cardData?.completed_timestamp && (
          <CompletedTimestampInfo>
            <CompletedTimeStamp>
              Completed:{" "}
              {moment(cardData.completed_timestamp).format("MMM D, YYYY")}
            </CompletedTimeStamp>
            <CheckOutlined />
          </CompletedTimestampInfo>
        )}
      </CardFooter>
    </CardWrapper>
  );
};

