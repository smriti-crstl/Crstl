import { UserJobFunctionsFE, UserRoleFE } from "domain/entity/shared/models";
import { startCase } from "lodash";

import {
  COUNTRIES,
  CountryObject,
  StateObject,
  STATES,
} from "../locations-data";

type UserJobFunctionsOptions = {
  label: UserJobFunctionsFE;
  value: UserJobFunctionsFE;
}[];

const getUserJobFunctionsOptions = (): UserJobFunctionsOptions => {
  const options = [];
  for (const item in UserJobFunctionsFE) {
    options.push({ label: startCase(item), value: item });
  }
  return options as UserJobFunctionsOptions;
};

type UserRoleOptions = {
  label: UserRoleFE;
  value: UserRoleFE;
}[];

const getUserCrstlRoleOptions = (): UserRoleOptions => {
  const options = [];
  for (const item in UserRoleFE) {
    options.push({
      label: item === "Third_Party_Logistics" ? "3PL" : item,
      value: item,
    });
  }
  return options as UserRoleOptions;
};

type UserStates = {
  label: string;
  value: string;
}[];
const getUserStates = (): UserStates => {
  return STATES.map((state: StateObject) => ({
    label: state.name,
    value: state.abbreviation,
  }));
};

type UserCountries = {
  label: string;
  value: string;
}[];

const getUserCountries = (): UserCountries => {
  return COUNTRIES.map((country: CountryObject) => ({
    label: country.name,
    value: country.name,
  }));
};

const USER_DEFAULT_IMAGE_URL =
  "https://i.postimg.cc/FHzJ8hHv/ODTLcjx-Afvqbx-Hn-VXCYX.jpg";

export {
  getUserJobFunctionsOptions,
  getUserCrstlRoleOptions,
  getUserStates,
  getUserCountries,
  USER_DEFAULT_IMAGE_URL,
};

