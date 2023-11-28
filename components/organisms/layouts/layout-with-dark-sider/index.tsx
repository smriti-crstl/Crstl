import { Layout } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { DynamicTextLogo } from "../../../atoms/logo";
import { WhiteHeaderWithIcons } from "../../../molecules/headers";
import { HeaderIconProps } from "../../../molecules/icon-groups";

const { Sider, Content } = Layout;

type LayoutWithSiderProps = {
  children: ReactNode;
  menu: ReactNode;
  headerTitle: string;
  logoText?: string;
  iconsData?: HeaderIconProps[];
  trigger?: ReactNode;
  showBackButton?: boolean;
  siteWideAlert?: ReactNode;
  widget?: ReactNode;
  others: any[];
};

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContainer = styled.main`
  flex-grow: 1;
  .ant-layout-content {
    background: ${({ theme }) => theme.palette.background.PRIMARY};
    overflow: auto;
  }
  && .ant-layout-sider-trigger {
    background: transparent;
    position: fixed;
    bottom: 1rem;
  }
  && .ant-layout-sider-children {
    position: fixed;
    overflow: hidden;
    width: inherit;
  }
`;

// Used to have side nav collapse here
// Changed width of text wrapper in DynamicTextLogo
// Changed width of Sider
// Added margins to align with menu items

export const LayoutWithDarkSider = ({
  children,
  menu,
  logoText,
  iconsData,
  headerTitle,
  trigger,
  showBackButton,
  siteWideAlert,
  widget,
  others,
}: LayoutWithSiderProps): ReactElement => {
  return (
    <ChildrenWrapper>
      <MainContainer>
        <Layout style={{ minHeight: "100%" }} hasSider={true}>
          <Sider
            width="210px"
            theme="dark"
            collapsed={false}
            collapsible
            trigger={trigger}
          >
            <DynamicTextLogo text={logoText} />
            {menu}
          </Sider>
          <Layout>
            {siteWideAlert}
            <Content>
              <WhiteHeaderWithIcons
                showBackButton={showBackButton}
                title={headerTitle}
                iconsData={iconsData}
                widget={widget}
                others={others}
              />
              {children}
            </Content>
          </Layout>
        </Layout>
      </MainContainer>
    </ChildrenWrapper>
  );
};
