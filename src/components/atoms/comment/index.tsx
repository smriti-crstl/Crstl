import { Comment } from '@ant-design/compatible';
import { CommentProps } from "antd";
import { ReactElement } from "react";

export const SimpleComment = (props: CommentProps): ReactElement => {
  return <Comment {...props} />;
};
