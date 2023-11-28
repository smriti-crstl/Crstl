import { createContext, useReducer } from "react";

import {
  ContextUserDetailType,
  UserDetailsActions,
  userDetailsReducer,
} from "./reducers";

// Context's Initial State
type InitialStateType = {
  userDetails: ContextUserDetailType;
};

const initialState: InitialStateType = {
  userDetails: {
    data: null,
    isLoading: false,
    isError: false,
  },
};

// Creating the Context
const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<UserDetailsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

// The main reducer, multiple reducers can be combined here
const mainReducer = (
  { userDetails }: InitialStateType,
  action: UserDetailsActions
): { userDetails: ContextUserDetailType } => ({
  userDetails: userDetailsReducer(userDetails, action),
});

const AppProvider: React.FC = ({ children }) => {
  // Instantiating the Main Reducer/Context's state
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
