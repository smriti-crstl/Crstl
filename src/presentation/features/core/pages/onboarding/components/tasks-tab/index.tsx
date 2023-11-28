import { useTourContext } from "boot/wrappers/react-joyride/TourContext";
import { useGetJetBridgeBoardDataQuery } from "domain/interactors/jetbridge";
import { ReactComponent as List } from "globals/assets/svgs/view_list.svg";
import { ReactComponent as Grid } from "globals/assets/svgs/view_module.svg";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";

import { emptyBoardData } from "../../constants";
import { useSetupFormModal } from "../../hooks/useSetupFormModal";
import { BoardLane } from "./components/BoardLane";
import { ListAccordion } from "./components/ListAccordion";
import { OnboardingRequestModal } from "./components/OnboardingRequestModal";
// import { mockBoardData } from "../../mocks";
import {
  BoardWrapper,
  CommonHeader,
  Footer,
  StyledProgress,
  StyledTourButton,
  SubTitle,
  Title,
  TitleContainer,
  TogglerText,
  ViewModeIcon,
} from "./styles";

export const OnboardingTasksTab: React.FC = () => {
  const [isListViewMode, setListViewMode] = useState(true);
  const {
    setState,
    state: { steps },
  } = useTourContext();
  const history = useHistory();

  const { data, isLoading } = useGetJetBridgeBoardDataQuery();

  const boardData = data?.data ?? emptyBoardData;

  const [
    isRequestModalVisible,
    toggleRequestModal,
    requestModalData,
    setRequestModalData,
  ] = useSetupFormModal();

  const percentage = useMemo(() => {
    const totalTasks =
      boardData?.lanes?.reduce((acc, lane) => acc + lane.cards.length, 0) ?? 0;
    const completedTasks =
      boardData?.lanes?.find((lane) => lane.title.includes("Completed"))?.cards
        ?.length ?? 0;
    const pausedTasks =
      boardData?.lanes?.find((lane) => lane.title.includes("Paused"))?.cards
        ?.length ?? 0;
    if (!totalTasks) {
      return 0;
    }
    return Math.round((completedTasks / (totalTasks - pausedTasks)) * 100);
  }, [boardData]);

  const title =
    percentage === 100
      ? "🎉 Congratulations! You're onboarded!"
      : "Let's get you onboarded!";

  const handleStartTour = () => {
    setState({ run: true, stepIndex: 0, tourActive: true });
    // TODO: remove this redirect if abrupt behavior is a problem
    history.push(steps?.[0]?.route);
  };

  return (
    <Spinner spinning={isLoading}>
      <CommonHeader>
        <TitleContainer>
          <Title>{title}</Title>
          <StyledTourButton onClick={handleStartTour}>
            Replay Product Tour
          </StyledTourButton>
        </TitleContainer>
        <SubTitle>
          {/* // todo: change text here */}
          Lorem ipsum dolor sit amet consectetur. Feugiat posuere iaculis lacus
          donec aliquam fermentum egestas. Metus pellentesque dictumst
          consectetur malesuada amet. Diam vitae fringilla in platea vel
          facilisis enim. Eget ante mi nunc tempor odio.
        </SubTitle>
        <Footer>
          <StyledProgress
            percent={percentage}
            strokeColor="linear-gradient(270deg, #FFF 0%, rgba(255, 255, 255, 0.50) 100%)"
            trailColor="rgba(255, 255, 255, 0.23)"
            format={(percent) => `${percent}% Complete`}
          />
          <Footer>
            <TogglerText>View Mode:</TogglerText>
            <ViewModeIcon
              onClick={() => setListViewMode(true)}
              component={List}
              isSelected={isListViewMode}
            />
            <ViewModeIcon
              onClick={() => setListViewMode(false)}
              component={Grid}
              isSelected={!isListViewMode}
            />
          </Footer>
        </Footer>
      </CommonHeader>

      <OnboardingRequestModal
        {...{
          isVisible: isRequestModalVisible,
          toggleModal: toggleRequestModal,
          tradingPartnerId: requestModalData?.tradingPartnerId,
          requestType: requestModalData?.requestType,
          onboardingTaskId: requestModalData?.onboardingTaskId,
        }}
      />

      {isListViewMode ? (
        <>
          {boardData?.lanes?.map((laneData) => (
            <ListAccordion
              laneData={laneData}
              key={laneData.id}
              toggleRequestModal={toggleRequestModal}
              setRequestModalData={setRequestModalData}
            />
          ))}
        </>
      ) : (
        <BoardWrapper>
          {boardData?.lanes?.map((laneData) => (
            <BoardLane
              laneData={laneData}
              key={laneData.id}
              toggleRequestModal={toggleRequestModal}
              setRequestModalData={setRequestModalData}
            />
          ))}
        </BoardWrapper>
      )}
    </Spinner>
  );
};

