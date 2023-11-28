import {
  useUserInviteesQuery,
  useUserTeamQuery,
} from "domain/interactors/shared";
import { useUserDetails } from "presentation/hooks/common";
import { ReactElement, useMemo } from "react";

import { PaperCard } from "@crstl/components/atoms/card";
import { SimpleTable } from "@crstl/components/atoms/table";

import { SETTINGS_TEAMS_TABLE_CONFIG } from "../../config";
import { TableContainer } from "./styles";

const CoreSettingsTeam = (): ReactElement => {
  const [{ data, isLoading }] = useUserDetails();

  const {
    data: teamsData = [],
    isLoading: isTeamDetailsLoading,
  } = useUserTeamQuery(data?.organizationId || "", {
    enabled: !!data?.organizationId,
  });

  const {
    data: inviteesData = [],
    isLoading: isInviteesDetailsLoading,
  } = useUserInviteesQuery();

  const allUsers = useMemo(() => {
    const existingUsers = teamsData?.map((element: any) => {
      if (element && element.role === "Third_Party_Logistics") {
        element.role = "3PL";
      }
      return element;
    });
    const pendingInvites = inviteesData?.filter(
      (element: any) => element?.status === "invited"
    );

    return [...pendingInvites, ...existingUsers];
  }, [teamsData, inviteesData]);

  console.log({ allUsers });

  return (
    <PaperCard removePadding>
      <TableContainer>
        <SimpleTable
          rowKey={(record) => record.id}
          loading={
            isLoading || isTeamDetailsLoading || isInviteesDetailsLoading
          }
          dataSource={allUsers}
          columns={SETTINGS_TEAMS_TABLE_CONFIG}
          pagination={{ position: ["bottomLeft"] }}
        />
      </TableContainer>
    </PaperCard>
  );
};

export default CoreSettingsTeam;

