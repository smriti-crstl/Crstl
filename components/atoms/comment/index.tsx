import { Comment, CommentProps } from "antd";
import { ReactElement } from "react";

export const SimpleComment = (props: CommentProps): ReactElement => {
  return <Comment {...props} />;
};
