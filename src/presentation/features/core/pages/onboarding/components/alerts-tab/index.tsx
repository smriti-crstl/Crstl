import { UserDetailsRes } from "domain/entity/shared/models";
import { useGetContactEmailsQuery } from "domain/interactors/alerts-tab";
import { useUserTeamQuery } from "domain/interactors/shared";
import { useUserDetails } from "presentation/hooks/common";
import { ReactElement } from "react";

import { HorizontallyCenteredPaperCard } from "components/atoms/card";
import { SimpleTable } from "components/atoms/table";

import { StyledPrimaryButton } from "../../../edi-edit/EdiEditPage.styles";
import { IntegrationsTabContent } from "../../../integrations/components/integration-tabs-content";
import { SETTINGS_ALERTS_TABLE_CONFIG } from "../../config";
import { useCommonModal } from "../../hooks/useCommonModal";
import { AddEmailModal } from "./AddEmailModal";
import {
  AddEmailWrapper,
  Container,
  TableContainer,
  TitleContainer,
} from "./styles";
import { AlertsTableCol } from "./types";

export const OnboardingAlertsTab = (): ReactElement => {
  const [{ data: userData, isLoading }] = useUserDetails();
  const [isAddEmailModalVisible, toggleAddEmailModal] = useCommonModal();

  const {
    data: contactEmails,
    isLoading: isContactEmailsLoading,
  } = useGetContactEmailsQuery();

  const {
    data: teamsDataMap,
    isLoading: isTeamDetailsLoading,
  } = useUserTeamQuery(userData?.organizationId || "", {
    select: (response) => {
      // creating a <email, {data}> map for ease of access
      const teamMembersMap: Record<string, UserDetailsRes> = {};
      response.forEach((user) => {
        if (!user.isActive) {
          return;
        }
        teamMembersMap[user.email] = user;
      });
      return teamMembersMap;
    },
  });

  const tableData =
    contactEmails?.data?.map((item) => ({
      ...teamsDataMap?.[item?.email ?? ""],
      ...item,
    })) ?? [];

  return (
    <>
      <AddEmailModal
        {...{
          isVisible: isAddEmailModalVisible,
          toggleModal: toggleAddEmailModal,
        }}
      />
      <HorizontallyCenteredPaperCard>
        <Container>
          <IntegrationsTabContent />
          <TableContainer>
            <AddEmailWrapper>
              <TitleContainer>Email Notifications</TitleContainer>
              <StyledPrimaryButton onClick={toggleAddEmailModal}>
                Add Email
              </StyledPrimaryButton>
            </AddEmailWrapper>
            <SimpleTable
              rowKey={(record) => record.email}
              loading={
                isLoading || isTeamDetailsLoading || isContactEmailsLoading
              }
              dataSource={tableData as AlertsTableCol[]}
              columns={SETTINGS_ALERTS_TABLE_CONFIG}
              pagination={{ pageSize: 5 }}
            />
          </TableContainer>
        </Container>
      </HorizontallyCenteredPaperCard>
    </>
  );
};

