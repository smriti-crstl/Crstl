import { Dropdown } from "antd";
import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type SimpleDropdownProps = {
  children: ReactNode;
  menu: ReactElement;
  isVisibleControlled?: boolean;
  setIsDropdownVisible?: Dispatch<SetStateAction<boolean>>;
};

export const DropdownWithVisibleOverlay = ({
  children,
  menu,
  isVisibleControlled,
  setIsDropdownVisible,
}: SimpleDropdownProps): ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <Dropdown
      forceRender
      trigger={["click"]}
      onVisibleChange={(flag) => {
        if (isVisibleControlled === undefined) {
          setIsVisible(flag);
        } else {
          setIsDropdownVisible?.(flag);
        }
      }}
      visible={isVisibleControlled || isVisible}
      overlay={menu}
    >
      {children}
    </Dropdown>
  );
};
