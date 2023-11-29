import { Card, TabPaneProps, Tabs as AntdTabs, TabsProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

const { TabPane } = AntdTabs;

type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  {
    [P in K]-?: T[P];
  };

interface ITabPaneRequireFields extends TabPaneProps {
  route?: string;
}

type TabPaneRequireFields = RequireFields<
  ITabPaneRequireFields,
  "tab" | "tabKey"
>;

export type TabsConfig = TabPaneRequireFields[];

export interface ITabsProps extends TabsProps {
  data: TabsConfig;
}

const TabsWrapper = styled.div`
  .ant-tabs-nav-wrap {
    padding: 12px 2rem 4px 2rem;
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const BorderedTabs = ({
  data,
  ...tabProps
}: ITabsProps): ReactElement => {
  return (
    <Card bodyStyle={{ padding: "0" }} style={{ height: "100%" }}>
      <TabsWrapper>
        {data.length > 0 && (
          <AntdTabs {...tabProps}>
            {data.map(({ children, ...rest }) => (
              <TabPane key={rest.tabKey} {...rest}>
                {children}
              </TabPane>
            ))}
          </AntdTabs>
        )}
      </TabsWrapper>
    </Card>
  );
};
