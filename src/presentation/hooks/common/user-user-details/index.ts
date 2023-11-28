import { AppContext } from "presentation/hooks/contexts";
import {
  ContextUserDetailType,
  UserDetailsActions,
} from "presentation/hooks/contexts/reducers";
import { Dispatch, useContext } from "react";

export const useUserDetails = (): [
  ContextUserDetailType,
  Dispatch<UserDetailsActions>
] => {
  const { dispatch } = useContext(AppContext);
  const {
    state: { userDetails },
  } = useContext(AppContext);

  return [userDetails, dispatch];
};
