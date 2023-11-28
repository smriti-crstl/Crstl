import styled from "styled-components";
import { useFlags } from "launchdarkly-react-client-sdk";
import { HeaderShadowContainerWithoutTabs } from "@crstl/components/molecules/headers";
import { PageWrapper, PageContainer } from "@crstl/components/molecules/page";
import { FacebookAdMetrics } from "./components/FacebookAdMetrics";
import { FacebookAdMetricsTrend } from "./components/FacebookAdMetricsTrend";
import { IndividualFacebookAdMetricsSection } from "./sections/IndividualFacebookAdMetricsSection";

const ComponentContainer = styled.div`
  margin-bottom: 24px;
`;

function MarketingFacebookPage() {
  const flags = useFlags();

  return (
    <div>
      <HeaderShadowContainerWithoutTabs />
      <PageWrapper>
        <PageContainer>
          {flags.facebookAdsMetrics && (
            <ComponentContainer>
              <FacebookAdMetrics />
            </ComponentContainer>
          )}
          {flags.facebookAdsMetricsTrend && (
            <ComponentContainer>
              <FacebookAdMetricsTrend />
            </ComponentContainer>
          )}
          {flags.facebookAdsMetricsTrend && (
            <IndividualFacebookAdMetricsSection />
          )}
        </PageContainer>
      </PageWrapper>
    </div>
  );
}

export { MarketingFacebookPage as default };
