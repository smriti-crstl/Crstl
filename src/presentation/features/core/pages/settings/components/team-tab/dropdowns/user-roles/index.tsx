import { UserDetailsRes, UserRoleFE } from "domain/entity/shared/models";
import { usePutUpdateTeamUserDetailsMutation } from "domain/interactors/profile";
import { get } from "lodash";
import { getUserCrstlRoleOptions } from "presentation/constants";
import { useUserDetails } from "presentation/hooks/common";
import { ReactElement } from "react";

import { SingleSelect } from "@crstl/components/atoms/selects";

type Props = {
  currentValue: string;
  record: UserDetailsRes;
};

export const TeamsJobRolesDropdown = ({
  currentValue,
  record,
}: Props): ReactElement => {
  const [{ data }] = useUserDetails();
  const { mutate, isLoading } = usePutUpdateTeamUserDetailsMutation();

  const handleJobRoleChange = (newJobRoleValue: UserRoleFE): void => {
    mutate({
      jobRole: newJobRoleValue,
      userId: record.id,
      organizationId: record.organizationId,
    });
  };

  return data?.role === UserRoleFE.Admin && data?.id !== record.id ? (
    <SingleSelect
      style={{ width: "10rem" }}
      loading={isLoading}
      options={getUserCrstlRoleOptions()}
      disabled={!!get(record, "inviteLink")}
      value={currentValue}
      onChange={(value: string) => {
        const newJobFunction = value as UserRoleFE;
        if (newJobFunction) {
          handleJobRoleChange(newJobFunction);
        }
      }}
    />
  ) : (
    <div>{currentValue}</div>
  );
};

