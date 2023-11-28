import { setItemInLocalStorage } from "domain/services/localStorage";
import { TooltipRenderProps } from "react-joyride";
import { useHistory } from "react-router-dom";

import { IS_TOUR_VIEWED_LOCAL_STORAGE_KEY } from "./constants";
import { StepsNavigation } from "./StepsNavigation";
import {
  Container,
  ContentWrapper,
  NextButton,
  PopoverTab,
  PreviousButton,
  SkipButton,
  SkipButtonContainer,
  TitleContainer,
  TourContainer,
} from "./style";
import { useTourContext } from "./TourContext";

export const TooltipComponent: React.FC<TooltipRenderProps> = ({
  step,
  tooltipProps,
}) => {
  const history = useHistory();

  const {
    setState,
    state: { stepIndex, steps },
  } = useTourContext();

  const stepCount = steps?.length;

  const handleBackStep = () => {
    setState({ run: false });
    history.push(steps?.[stepIndex - 1]?.route);
    setState({ run: true, stepIndex: stepIndex - 1 });
  };

  const handleNextStep = () => {
    setState({ run: false });
    history.push(steps?.[stepIndex + 1]?.route);
    setState({ run: true, stepIndex: stepIndex + 1 });
  };

  const handleSkipTour = () => {
    setState({ run: false, stepIndex: 0, tourActive: false });
    setItemInLocalStorage(IS_TOUR_VIEWED_LOCAL_STORAGE_KEY, "true");
  };

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepCount - 1;

  return (
    <TourContainer {...tooltipProps}>
      <PopoverTab>
        <SkipButtonContainer>
          <SkipButton size="small" onClick={handleSkipTour}>
            {isLastStep ? "End Tour" : "Skip Tour"}
          </SkipButton>
        </SkipButtonContainer>
        <ContentWrapper>
          {step?.title && <TitleContainer>{step.title}</TitleContainer>}
          {step?.content}
        </ContentWrapper>
        <Container>
          <StepsNavigation />
          <div>
            <PreviousButton disabled={isFirstStep} onClick={handleBackStep}>
              Back
            </PreviousButton>
            <NextButton disabled={isLastStep} onClick={handleNextStep}>
              Next
            </NextButton>
          </div>
        </Container>
      </PopoverTab>
    </TourContainer>
  );
};

