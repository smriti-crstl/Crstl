import { Timeline } from "antd";
import { useGetCommentsQuery } from "domain/interactors/orders";
import { RenderTimestamp } from "presentation/features/common/components";
import { useUserDetails } from "presentation/hooks/common";
import {
  CORE_LAYOUT_TEXT_CONSTANTS,
  CORE_ORDERS_TEXT_CONSTANTS,
} from "presentation/texts-reservoir";
import { ReactElement, useCallback, useState } from "react";
import { useParams } from "react-router";

import { GenericError } from "components/atoms/error";
import { GenericLoading } from "components/atoms/loading";
import { HeaderBar } from "components/molecules/bars";

import { AddComment } from "./AddComment";
import { CommentDescription } from "./CommentDescription";
import { CommentsName } from "./CommentsName";
import { TimelineDot } from "./TimelineDot";

export const OrderViewComments = (): ReactElement => {
  const [{ data }] = useUserDetails();
  const { id } = useParams<{ id: string }>();
  const { data: commentsData, isError, isLoading } = useGetCommentsQuery(id);

  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

  const changeLoadingState = useCallback(setIsSpinnerLoading, [
    setIsSpinnerLoading,
  ]);

  return (
    <>
      <HeaderBar>{CORE_ORDERS_TEXT_CONSTANTS.VIEW.COMMENTS.HEADING}</HeaderBar>
      <GenericLoading
        spinnerProps={{
          spinning: isSpinnerLoading || isLoading,
        }}
        type="spinner"
      >
        <Timeline style={{ padding: "1rem 0 1rem 1rem" }}>
          <Timeline.Item dot={<TimelineDot />}>
            <CommentsName
              name={
                data?.fullName || CORE_LAYOUT_TEXT_CONSTANTS.HEADER.NAME_LOADING
              }
              extraContent={CORE_ORDERS_TEXT_CONSTANTS.VIEW.COMMENTS.ADD_INFO}
            />
            <AddComment
              poId={id}
              organizationId={data?.organizationId || ""}
              isUserLoading={isLoading}
            />
          </Timeline.Item>
          {isError && <GenericError />}
          {commentsData &&
            commentsData.length > 0 &&
            commentsData?.map((comment) => {
              return (
                <Timeline.Item
                  dot={<TimelineDot />}
                  key={String(comment.createdAt)}
                >
                  <CommentsName
                    name={comment.fullName}
                    extraContent={
                      <RenderTimestamp ISODateString={comment.createdAt} />
                    }
                  />
                  <CommentDescription
                    changeLoadingState={changeLoadingState}
                    poId={id}
                    commentId={comment.id}
                    commentDescription={comment.commentDescription || ""}
                  />
                </Timeline.Item>
              );
            })}
        </Timeline>
      </GenericLoading>
    </>
  );
};
