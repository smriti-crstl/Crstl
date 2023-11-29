import { Badge, Menu, MenuProps, Tooltip } from "antd";
import { ReactElement, ReactNode, useLayoutEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { StyledCustomDarkMenuWrapper } from "../../atoms/menu/DarkMenu";

const { SubMenu } = Menu;

export type SideMenuPropsElementProps = {
  title: string;
  route: string;
  key?: string;
  disabled?: boolean;
  children?: SideMenuPropsElementProps[];
  icon?: ReactNode;
  onClick?: (menuItem: SideMenuPropsElementProps) => void;
  count?: number;
  hideTooltip?: boolean;
  id?: string;
};

interface SideMenuProps extends MenuProps {
  data: SideMenuPropsElementProps[];
}

export const SideMenu = ({ data, ...rest }: SideMenuProps): ReactElement => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const [openKeys, setOpenKeys] = useState<string[]>([
    "analytics",
    "marketing",
    "orders",
  ]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // The splice is number of route elements in pathname you want to skip
  // before referring menu keys
  //
  // example: if path === ["/", "orders", "all"]
  // we are skipping the first "/" here so the splice is numbered to 1
  const generateAdminMenuRouteKeys = (route: string): string[] =>
    route.split("/").splice(1);

  useLayoutEffect(() => {
    const routeKeys = generateAdminMenuRouteKeys(pathname);
    setOpenKeys((prev) =>
      Array.from(new Set([...prev, ...routeKeys, pathname]))
    );
    const previousPath = pathname.split("/").slice(0, -1).join("/");
    setSelectedKeys([...routeKeys, previousPath, pathname]);
  }, [pathname]);

  const adminMenuKeys = (
    item: SideMenuPropsElementProps,
    level: number
  ): ReactElement => {
    const nextLevel = level + 1;
    const sanitizedRoute = generateAdminMenuRouteKeys(item.route);
    const key = sanitizedRoute[level];
    if (item.children) {
      return (
        <SubMenu
          icon={item.icon}
          title={item.title}
          key={key}
          className={sanitizedRoute.join("-")}
        >
          {item.children.map((c) => adminMenuKeys(c, nextLevel))}
        </SubMenu>
      );
    }

    const className = generateAdminMenuRouteKeys(item.route).join("-");

    return (
      <Menu.Item
        disabled={item.disabled}
        onClick={() => {
          push(item.route);
          if (item.onClick) {
            item.onClick(item);
          }
        }}
        key={item.key || item.route}
        icon={item.icon}
        className={className}
        id={item?.id}
      >
        {item.disabled && !item?.hideTooltip ? (
          <Tooltip placement="top" title="Contact Crstl">
            {item.title}
          </Tooltip>
        ) : (
          item.title
        )}
        {item.count ? <Badge count={item.count} size="small" /> : null}
      </Menu.Item>
    );
  };

  return (
    <StyledCustomDarkMenuWrapper>
      <Menu
        mode="inline"
        defaultOpenKeys={["analytics", "marketing"]}
        openKeys={openKeys}
        onOpenChange={(keys) => {
          return null;
        }}
        selectedKeys={selectedKeys}
        expandIcon={() => null}
        {...rest}
      >
        {data.map((item) => adminMenuKeys(item, 0))}
      </Menu>
    </StyledCustomDarkMenuWrapper>
  );
};
