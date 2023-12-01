import { OnboardingTaskData } from "models/v1/edi/OnboardingTaskList";

import { SetOnboardingRequestModalData } from "../../../../hooks/useSetupFormModal";
import { LaneCard } from "../LaneCard";
import {
  CardsCount,
  ColorCircle,
  LaneContent,
  LaneHeader,
  LaneWrapper,
} from "./styles";

interface PublicProps {
  laneData: OnboardingTaskData;
  toggleRequestModal: () => void;
  setRequestModalData: SetOnboardingRequestModalData;
}

export const BoardLane: React.FC<PublicProps> = ({
  laneData,
  toggleRequestModal,
  setRequestModalData,
}) => {
  return (
    <LaneWrapper style={{ ...laneData.style }}>
      <LaneHeader>
        <span>{laneData.title}</span>
        <ColorCircle
          style={{
            backgroundColor: laneData.style.borderColor,
          }}
        />
        <CardsCount>{laneData.cards.length}</CardsCount>
      </LaneHeader>
      {laneData.cards.length > 0 ? (
        <LaneContent>
          {laneData.cards.map((cardData) => (
            <LaneCard
              key={cardData.id}
              cardData={cardData}
              toggleRequestModal={toggleRequestModal}
              setRequestModalData={setRequestModalData}
              laneTitle={laneData.title}
            />
          ))}
        </LaneContent>
      ) : null}
    </LaneWrapper>
  );
};

