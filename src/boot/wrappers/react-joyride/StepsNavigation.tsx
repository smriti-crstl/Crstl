import { useHistory } from "react-router-dom";

import { NavigationContainer, StyledNavigationButton } from "./style";
import { useTourContext } from "./TourContext";

export const StepsNavigation = () => {
  const history = useHistory();

  const {
    setState,
    state: { stepIndex, steps },
  } = useTourContext();

  const goToStep = (index: number) => {
    if (stepIndex === index) {
      return;
    }
    setState({ run: false });
    history.push(steps?.[index]?.route);
    setState({ run: true, stepIndex: index });
  };

  if (steps?.length <= 1) {
    return <span />;
  }

  return (
    <NavigationContainer>
      {steps.map((_, index) => {
        const active = stepIndex === index;
        return (
          <StyledNavigationButton
            active={active}
            onClick={() => goToStep(index)}
            key={index}
          />
        );
      })}
    </NavigationContainer>
  );
};

