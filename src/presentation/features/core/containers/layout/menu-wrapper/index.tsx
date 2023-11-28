import { ReactElement } from "react";
import { SideMenu } from "@crstl/components/molecules/side-menu";
import { getSideMenuConfig } from "./config";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useGetOrdersSummaryCountQuery } from "domain/interactors/edi";
import { useGetPendingOnboardingTasksCountQuery } from "domain/interactors/jetbridge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CoreLayoutMenuWrapper = (): ReactElement => {
  const flags = useFlags();

  const { data: ordersCount } = useGetOrdersSummaryCountQuery();
  const transactionsCount =
    ordersCount?.data.find(({ id }) => id === "new")?.count ?? 0;

  const {
    data: pendingOnboardingData,
  } = useGetPendingOnboardingTasksCountQuery();

  const onboardingCount = pendingOnboardingData?.data?.count ?? 0;

  const config = getSideMenuConfig(flags, {
    transactions: transactionsCount,
    onboarding: onboardingCount,
  });
  return <SideMenu theme="dark" data={config} />;
};

export default CoreLayoutMenuWrapper;

