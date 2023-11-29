import { ReactElement, ReactNode, useState } from "react";
import { CustomHeaderWithIcons } from "@crstl/components/molecules/headers";
import { Layout } from "antd";
import styled from "styled-components";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { HeaderIconProps } from "../../../molecules/icon-groups";

const { Sider, Content } = Layout;

type LayoutWithSiderProps = {
  children: ReactNode;
  menu: ReactNode;
  logoText?: string;
  iconsData?: HeaderIconProps[];
};

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContainer = styled.main`
  flex-grow: 1;
`;

const IconContainer = styled.div`
  text-align: start;
  padding-left: ${({ theme }) => theme.spacing.MEDIUM};
`;

const ContentContainer = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing.MEDIUM} 0 0 ${theme.spacing.MEDIUM}`};
`;

export const LayoutWithSider = ({
  children,
  menu,
  logoText,
  iconsData,
}: LayoutWithSiderProps): ReactElement => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <ChildrenWrapper>
      <CustomHeaderWithIcons text={logoText} data={iconsData} />
      <MainContainer>
        <Layout style={{ height: "100%" }} hasSider={true}>
          <Sider
            theme="light"
            collapsible
            collapsed={isCollapsed}
            onCollapse={() => setIsCollapsed((prev) => !prev)}
            trigger={
              <IconContainer>
                {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </IconContainer>
            }
          >
            {menu}
          </Sider>
          <Layout>
            <Content>
              <ContentContainer>{children}</ContentContainer>
            </Content>
          </Layout>
        </Layout>
      </MainContainer>
    </ChildrenWrapper>
  );
};
