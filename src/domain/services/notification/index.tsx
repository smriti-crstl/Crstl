import { message, notification } from "antd";
import { IconType } from "antd/lib/notification";
import { AxiosError } from "axios";
import { COLORS } from "globals/themes/default/colors";
import { debounce, throttle } from "lodash";
import { COMMON_TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { CloseOutlined } from "@ant-design/icons";

import { StyleMap } from "./notification.config";

export interface SetNotificationProps {
  type: IconType;
  moduleName?: string;
  description?: string;
  duration?: number;
}

export type SetMessageProps = {
  type: IconType;
  content: string;
  duration?: number | (() => void);
};

export const setNotification = debounce(
  ({ type, moduleName, description, duration }: SetNotificationProps) => {
    return notification.open({
      message: moduleName ? moduleName : null,
      description,
      duration,
      type,
      closeIcon: <CloseOutlined style={{ color: COLORS.ALMOST_BLACK }} />,
      ...StyleMap[type],
    });
  },
  500
);

export const setMessage = throttle(
  ({ type, content, duration }: SetMessageProps) => {
    return message[type](content, duration);
  },
  2000,
  { leading: true, trailing: false }
);

export const handleGlobalError = (error: AxiosError): void => {
  if (error && error?.response?.data.error === "string") {
    setNotification({
      ...COMMON_TEXT_CONSTANTS.ERROR_NOTIFICATION,
      description: error.response?.data.error,
    });
  }
};

