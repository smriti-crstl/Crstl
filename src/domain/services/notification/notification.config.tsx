import {
  ArgsProps as NotificationArgsProps,
  IconType,
} from "antd/lib/notification";
import { COLORS } from "globals/themes/default/colors";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { CSSProperties } from "react";

const commonStyle: CSSProperties = {
  borderRadius: 10,
  fontWeight: 500,
  padding: 8,
};

export const StyleMap: Record<IconType, Partial<NotificationArgsProps>> = {
  error: {
    style: {
      ...commonStyle,
      backgroundColor: COLORS.SOFT_PEACH,
    },
    icon: <CloseCircleFilled style={{ color: COLORS.BRIGHT_RED }} />,
  },
  info: {
    style: {
      ...commonStyle,
      backgroundColor: COLORS.WHITE,
    },
    icon: <InfoCircleOutlined style={{ color: COLORS.BLACK }} />,
  },
  success: {
    style: {
      ...commonStyle,
      backgroundColor: COLORS.HONEYDEW_GREEN,
    },
    icon: <CheckCircleFilled style={{ color: COLORS.CHATEAU_GREEN }} />,
  },
  warning: {
    style: {
      ...commonStyle,
      backgroundColor: COLORS.EARLY_DAWN_YELLOW,
    },
    icon: <WarningFilled style={{ color: COLORS.LIGHT_MUSTARD }} />,
  },
};
