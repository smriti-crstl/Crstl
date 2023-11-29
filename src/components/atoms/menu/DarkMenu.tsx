import { Menu } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

export type DarkMenuData = { label: string; value: string; icon: ReactNode }[];

export type DarkMenuProps = {
  data: DarkMenuData;
  onChange?: (key: string) => void;
};

export const CustomDarkMenuWrapper = styled.div`
  && .ant-menu-inline-collapsed > .ant-menu-item {
    width: 100%;
  }
  && .ant-menu {
    height: 100%;
    width: 100%;
  }

  & .ant-menu-dark > .ant-menu-item,
  & .ant-menu-dark > .ant-menu-submenu > .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    /* height: 30px;
    line-height: 16px; */
    /* font-size: 16px;
    margin-top: 12px; */
  }

  & .ant-menu-dark .analytics-all > .ant-menu-submenu-title,
  & .ant-menu-dark .marketing > .ant-menu-submenu-title,
  & .ant-menu-dark .orders-shopify-list-all-1 > .ant-menu-submenu-title {
    cursor: text;
    color: rgba(255, 255, 255, 0.65);
  }

  & .ant-menu-dark .ant-menu-submenu-open,
  & .ant-menu-dark .ant-menu-submenu-selected {
    color: #ffffffa6;
  }

  && .ant-menu-item,
  .ant-menu-submenu {
    margin-right: auto !important;
    margin-left: auto !important;
    width: 90%;
    border-radius: 5px;
    /* Additional changed done to free up menu items space */
    /* height: 45px;
    margin: 8px 0;
    display: flex;
    align-items: center;
    font-size: 1rem; */
  }
  && .ant-menu-sub {
    background: transparent;
  }
  && .ant-menu-sub > .ant-menu-item {
    /* height: 30px;
    line-height: 28px; */
    /* font-size: 14px;
    text-overflow: initial; */
  }
  && .ant-menu-item:hover {
    background-color: #353d73;
  }

  && .ant-menu-dark .ant-menu-item:hover {
    background-color: #353d73;
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: #5d67ae;
    span {
      /* color: ${({ theme }) => theme.palette.base.PRIMARY}; */
    }
  }
  svg {
    /* Increased font size from 1.2rem to 1.3rem */
    font-size: 1.3rem;
    vertical-align: inherit;
  }
`;

export const StyledCustomDarkMenuWrapper = styled.div`
  && .ant-menu-inline-collapsed > .ant-menu-item {
    width: 100%;
  }
  && .ant-menu {
    height: 100%;
    width: 100%;
  }

  & .ant-menu-dark > .ant-menu-item,
  & .ant-menu-dark > .ant-menu-submenu > .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 16px;
    font-size: 16px;
    margin: 5px auto;
  }

  & .ant-menu-dark .analytics-all > .ant-menu-submenu-title,
  & .ant-menu-dark .marketing > .ant-menu-submenu-title,
  & .ant-menu-dark .orders-shopify-list-all-1 > .ant-menu-submenu-title,
  & .ant-menu-item-disabled {
    cursor: text;
    color: rgba(255, 255, 255, 0.65);
  }

  & .ant-menu-dark .ant-menu-submenu-open,
  & .ant-menu-dark .ant-menu-submenu-selected {
    color: #ffffffa6;
  }

  && .ant-menu-item,
  .ant-menu-submenu {
    margin-right: auto !important;
    margin-left: auto !important;
    width: 90%;
    border-radius: 5px;
    /* Additional changed done to free up menu items space */
    /* height: 45px;
    margin: 8px 0;
    display: flex;
    align-items: center;
    font-size: 1rem; */

    padding-left: 16px !important;

    .ant-menu-item-icon {
      margin-right: 8px;
    }

    .ant-badge {
      margin-left: 6px;

      .ant-badge-count {
        font-size: 12px;
        padding: 0 4px;
        box-shadow: none; // this is removing the white outline

        height: 16px;
        border-radius: 8px;
        line-height: 16px;
      }
    }
  }
  && .ant-menu-sub {
    background: transparent;
  }
  && .ant-menu-sub > .ant-menu-item {
    height: 30px;
    line-height: 28px;
    font-size: 14px;
    text-overflow: initial;
  }
  && .ant-menu-item:hover {
    background-color: ${({ theme }) => theme.palette.colors.RHINO};
  }

  && .ant-menu-dark .ant-menu-item:hover {
    background-color: ${({ theme }) => theme.palette.colors.RHINO};
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
    span {
      /* color: ${({ theme }) => theme.palette.base.PRIMARY}; */
    }
  }
  svg {
    /* Increased font size from 1.2rem to 1.3rem */
    font-size: 1.3rem;
    vertical-align: inherit;
  }

  & .ant-menu-item-disabled {
    opacity: 1;
    color: #ffffffa6 !important;

    &:hover {
      background: transparent !important;
    }
  }
`;

export const DarkMenu = ({ data, onChange }: DarkMenuProps): ReactElement => {
  return (
    <CustomDarkMenuWrapper>
      <Menu
        theme="dark"
        style={{ minWidth: "10rem" }}
        selectedKeys={[]}
        onSelect={({ key }) => onChange?.(key.toString())}
      >
        {data.map(({ label, value, icon }) => {
          return (
            <Menu.Item
              icon={icon}
              style={{
                margin: 0,
              }}
              key={value}
            >
              {label}
            </Menu.Item>
          );
        })}
      </Menu>
    </CustomDarkMenuWrapper>
  );
};
