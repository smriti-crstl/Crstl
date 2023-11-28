import { ContextUserDetailType } from "presentation/hooks/contexts/reducers";
import { COMMON_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import {
  convertZonedTimeToUtc,
  formatDate,
  formatIsoUtcToZonedTime,
} from "presentation/utils";

import { useUserDetails } from "../user-user-details";

type DateFunction<Props> = (date: Props) => string;

type GetZonedTimeFnArgs = {
  ISODateString: string;
  withAltLabel?: boolean;
};

type GetISOTimeFnArgs = {
  zonedDateString: string;
  withAltLabel?: boolean;
};

export type GetZonedTimeProps = DateFunction<GetZonedTimeFnArgs>;
export type GetISOTimeProps = DateFunction<GetISOTimeFnArgs>;

type UseTimestampReturnProps = {
  getZonedTime: GetZonedTimeProps;
  getISOTime: GetISOTimeProps;
};

const getLoadingOrErrorState = ({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}): string | null => {
  if (isLoading) {
    return COMMON_TEXT_CONSTANTS.LOADING;
  }
  if (isError) {
    return COMMON_TEXT_CONSTANTS.ERROR;
  }
  return null;
};

const getZonedTimeInternal = ({
  ISODateString,
  withAltLabel,
  context,
}: GetZonedTimeFnArgs & {
  context: ContextUserDetailType;
}): string => {
  const { data, isError, isLoading } = context;
  const errorOrLoadingText = getLoadingOrErrorState({ isLoading, isError });
  if (errorOrLoadingText) {
    return errorOrLoadingText;
  }
  if (data) {
    const zonedTime = formatIsoUtcToZonedTime(ISODateString, data.timezone);
    const formattedDate = formatDate(zonedTime);
    if (withAltLabel && data.altLabel) {
      return formattedDate + " " + data.altLabel;
    } else {
      return formattedDate;
    }
  }
  return "";
};

const getISOTimeInternal = ({
  zonedDateString,
  context,
}: GetISOTimeFnArgs & {
  context: ContextUserDetailType;
}): string => {
  const { data, isError, isLoading } = context;

  const errorOrLoadingText = getLoadingOrErrorState({ isError, isLoading });
  if (errorOrLoadingText) {
    return errorOrLoadingText;
  }
  if (data) {
    const utcTime = convertZonedTimeToUtc(zonedDateString, data.timezone);
    // ! TODO: Confirm what type of date to send the backend?
    const isoDate = utcTime.toISOString();
    return isoDate;
  }
  return "";
};

export const useTimestamp = (): UseTimestampReturnProps => {
  const [context] = useUserDetails();
  return {
    getZonedTime: (args: GetZonedTimeFnArgs) =>
      getZonedTimeInternal({ context, ...args }),
    getISOTime: (args: GetISOTimeFnArgs) =>
      getISOTimeInternal({ context, ...args }),
  };
};
