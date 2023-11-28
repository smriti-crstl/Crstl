import styled from "styled-components";

import { ReactComponent as Integration } from "globals/assets/svgs/integrations_nav_icon.svg";
import { Stats } from "domain/entity/connections/model";

export const AnalyticsCardContainer = styled.div`
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex: 1;
  .right_box {
    width: 40%;
    display: flex;
    justify-content: flex-end;
  }
  .left_box {
    width: 60%;
  }
  .metric_box {
    background: rgba(255, 255, 255, 0.76);
    width: 100%;
    height: 40px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 32px;
    border-radius: 100px;
  }
`;

export const AnalyticsListContainer = styled.div`
  display: flex;
  gap: 16px;
`;

interface AnalyticsCardProps {
  title: string;
  data: number;
  backgroundColor: string;
  icon: React.ComponentType;
}

export const AnalyticsCard = ({
  title,
  data,
  backgroundColor,
  icon,
}: AnalyticsCardProps) => {
  return (
    <AnalyticsCardContainer style={{ background: backgroundColor }}>
      <div className="left_box">{title}</div>
      <div className="right_box">
        <div className="metric_box">{data || 0}</div>
      </div>
    </AnalyticsCardContainer>
  );
};

interface AnalyticsListProps {
  stats: Stats;
}

export const AnalyticsList = ({ stats }: AnalyticsListProps) => {
  return (
    <AnalyticsListContainer>
      <AnalyticsCard
        data={stats?.activeConnections}
        title="Total Active Connections"
        backgroundColor="#DCF0E2"
        icon={Integration}
      />
      <AnalyticsCard
        data={stats?.activeTradingPartnerConnections}
        title="Active Trading Partner Connections"
        backgroundColor="#FDF7E4"
        icon={Integration}
      />
      <AnalyticsCard
        data={stats?.activeIntegrationConnections}
        title="Active Integration Connections"
        backgroundColor="rgba(231,244,255,1)"
        icon={Integration}
      />
      <AnalyticsCard
        data={stats?.inactiveConnections}
        title="Total Inactive Connections"
        backgroundColor="rgba(249,208,199,1)"
        icon={Integration}
      />
    </AnalyticsListContainer>
  );
};

