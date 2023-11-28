import { Skeleton as AntdSkeleton, SkeletonProps } from "antd";
import { AriaAttributes, ReactElement } from "react";

export type SimpleSkeletonProps = SkeletonProps & AriaAttributes;

export const Skeleton = (props: SimpleSkeletonProps): ReactElement => {
  return <AntdSkeleton active {...props} />;
};
