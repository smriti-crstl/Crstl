import { UserDetailsRes } from "domain/entity/shared/models";
import { ActionMap } from "globals/types";

// Type of User Details reducer state
export type ContextUserDetailType = {
  data: UserDetailsRes | null;
  isLoading: boolean;
  isError: boolean;
};

// Actions that can be called on User Details
export enum Types {
  AddUserDetails = "ADD_USER_DETAILS",
  IsUserDetailsLoading = "IS_USER_DETAILS_LOADING",
}
// Type of Payload response that an action can receive
type UserDetailsPayload = {
  [Types.AddUserDetails]: { data: UserDetailsRes; isLoading?: boolean };
  [Types.IsUserDetailsLoading]: boolean;
};

export type UserDetailsActions = ActionMap<UserDetailsPayload>[keyof ActionMap<UserDetailsPayload>];

export const userDetailsReducer = (
  state: ContextUserDetailType,
  action: UserDetailsActions
): ContextUserDetailType => {
  switch (action.type) {
    case "ADD_USER_DETAILS":
      return { ...state, ...action.payload };
    case "IS_USER_DETAILS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
