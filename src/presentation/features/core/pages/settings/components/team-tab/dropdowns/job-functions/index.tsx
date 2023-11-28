import {
  UserDetailsRes,
  UserJobFunctionsFE,
} from "domain/entity/shared/models";
import { usePutUpdateTeamUserDetailsMutation } from "domain/interactors/profile";
import { get } from "lodash";
import { getUserJobFunctionsOptions } from "presentation/constants";
import { ReactElement } from "react";

import { SingleSelect } from "@crstl/components/atoms/selects";

type Props = {
  currentValue: string;
  record: UserDetailsRes;
};

export const TeamsJobFunctionsDropdown = ({
  currentValue,
  record,
}: Props): ReactElement => {
  const { mutate, isLoading } = usePutUpdateTeamUserDetailsMutation();

  const handleJobFunctionChange = (
    newJobFunctionValue: UserJobFunctionsFE
  ): void => {
    mutate({
      jobFunction: newJobFunctionValue,
      userId: record.id,
      organizationId: record.organizationId,
    });
  };

  return (
    <SingleSelect
      style={{ width: "10rem" }}
      loading={isLoading}
      disabled={!!get(record, "inviteLink")}
      options={getUserJobFunctionsOptions()}
      value={currentValue}
      onChange={(value: string) => {
        const newJobFunction = value as UserJobFunctionsFE;
        if (newJobFunction) {
          handleJobFunctionChange(newJobFunction);
        }
      }}
    />
  );
};

