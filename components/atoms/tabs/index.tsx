import { Input, TabPaneProps, Tabs as AntdTabs, TabsProps } from "antd";
import { ReactElement } from "react";
import styled, { css } from "styled-components";

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
  additionalTopElement?: boolean;
}

export const TopBarWrapperCss = css`
  background: ${({ theme }) => theme.palette.background.PRIMARY};
  padding-left: 4rem;
  padding-right: 1rem;
  min-height: 50px;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.HEADER};
`;

const TabsWrapper = styled.div`
  .ant-tabs > .ant-tabs-nav {
    ${TopBarWrapperCss}
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
    align-self: flex-end;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }
`;

const AdditionalElementWrapper = styled.div`
  background: white;
`;

const AdditionalElementContent = styled.div`
  padding-left: 4rem;
  padding-right: 1rem;
  width: 30rem;
`;

export const TabPaneChildrenWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.MEDIUM};
`;

export const Tabs = ({
  data,
  additionalTopElement,
  ...tabProps
}: ITabsProps): ReactElement => (
  <TabsWrapper>
    {additionalTopElement && (
      <AdditionalElementWrapper>
        <AdditionalElementContent>
          <Input.Search placeholder="Search" />
        </AdditionalElementContent>
      </AdditionalElementWrapper>
    )}
    {data.length > 0 && (
      <AntdTabs {...tabProps}>
        {data.map(({ children, ...rest }) => (
          <TabPane key={rest.tabKey} {...rest}>
            <TabPaneChildrenWrapper>{children}</TabPaneChildrenWrapper>
          </TabPane>
        ))}
      </AntdTabs>
    )}
  </TabsWrapper>
);
