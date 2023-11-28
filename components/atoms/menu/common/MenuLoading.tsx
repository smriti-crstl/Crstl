import { Menu } from "antd";
import { ReactElement } from "react";
import { Spinner } from "../../loading";
import { MenuWrapper } from "./MenuWrapper";

export const MenuLoading = (): ReactElement => (
  <MenuWrapper>
    <Menu>
      <div>
        <Spinner />
      </div>
    </Menu>
  </MenuWrapper>
);
