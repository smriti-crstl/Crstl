import { getItemFromLocalStorage } from "domain/services/localStorage";
import { useFlags } from "launchdarkly-react-client-sdk";
import { ReactElement, useEffect } from "react";
import Joyride, { CallBackProps } from "react-joyride";
import { useHistory } from "react-router-dom";

import { IS_TOUR_VIEWED_LOCAL_STORAGE_KEY } from "./constants";
import { getTourSteps } from "./Steps";
import { TooltipComponent } from "./TourComponent";
import { useTourContext } from "./TourContext";

export const ReactTourJoyride = (): ReactElement => {
  const {
    setState,
    state: { run, stepIndex, steps },
  } = useTourContext();

  const history = useHistory();
  const flags = useFlags();

  useEffect(() => {
    setState({
      steps: getTourSteps(flags),
    });
  }, [flags, setState]);

  useEffect(() => {
    const isTourViewed = getItemFromLocalStorage(
      IS_TOUR_VIEWED_LOCAL_STORAGE_KEY
    );
    if (!isTourViewed || flags.alwaysShowProductTour) {
      setTimeout(() => {
        setState({ run: true, stepIndex: 0, tourActive: true });
        // TODO: remove this redirect if abrupt behavior is a problem
        history.push(steps?.[0]?.route);
      }, 5000);
    }
  }, [flags.alwaysShowProductTour, history, setState, steps]);

  const handleCallback = (data: CallBackProps) => {
    const { action, type, lifecycle } = data;

    if (type === "step:after") {
      return;
    } else if (action === "reset" || lifecycle === "complete") {
      setState({ run: false, stepIndex: 0, tourActive: false });
    }
  };

  return (
    <Joyride
      callback={handleCallback}
      continuous
      run={run}
      stepIndex={stepIndex}
      steps={steps}
      hideCloseButton
      disableScrolling
      disableOverlayClose
      tooltipComponent={TooltipComponent}
    />
  );
};

