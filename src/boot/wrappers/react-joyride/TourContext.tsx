import { createContext, useContext, useMemo } from "react";
import { useSetState } from "react-use";

import { TourState } from "./types";

const appState = {
  run: false,
  stepIndex: 0,
  steps: [],
  tourActive: false,
};

export const TourContext = createContext({
  state: appState,
  setState: () => undefined,
});
TourContext.displayName = "TourContext";

export function TourProvider(props: any) {
  const [state, setState] = useSetState(appState);

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [setState, state]
  );

  return <TourContext.Provider value={value} {...props} />;
}

export function useTourContext(): {
  setState: (
    patch:
      | Partial<TourState>
      | ((previousState: TourState) => Partial<TourState>)
  ) => void;
  state: TourState;
} {
  const context = useContext(TourContext);

  if (!context) {
    throw new Error("useTourContext must be used within a AppProvider");
  }

  return context;
}

