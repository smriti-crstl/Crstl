import { Timeline } from "antd";
import { GetEdiCommentsDataObject } from "domain/entity/edi/models";
import { useGetEdiCommentsQuery } from "domain/interactors/edi";
import { useUserTeamQuery } from "domain/interactors/shared";
import { RenderTimestamp } from "presentation/features/common/components";
import { useUserDetails } from "presentation/hooks/common";
import {
  CORE_LAYOUT_TEXT_CONSTANTS,
  CORE_ORDERS_TEXT_CONSTANTS,
} from "presentation/texts-reservoir";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GenericLoading } from "components/atoms/loading";
import { HeaderBar } from "components/molecules/bars";

import { CommentsName } from "../orders/components/view/comments/CommentsName";
import { TimelineDot } from "../orders/components/view/comments/TimelineDot";
// import AddEdiComment from "./AddEdiComments";
import { EdiCommentDescription } from "./EdiCommentDescription";

export const EdiCommentsSection = () => {
  const { orderId } = useParams<{
    orderId: string;
  }>();
  const [{ data }] = useUserDetails();
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
  const changeLoadingState = useCallback(setIsSpinnerLoading, [
    setIsSpinnerLoading,
  ]);
  const [comments, setComments] = useState<GetEdiCommentsDataObject[]>([]);

  const { isLoading: isTeamLoading, data: teamsData } = useUserTeamQuery(
    data?.organizationId || "",
    {
      enabled: !!data?.organizationId,
    }
  );

  const result = useGetEdiCommentsQuery(orderId);

  const { data: commentsData, isFetching } = orderId
    ? result
    : { data: undefined, isFetching: false };

  useEffect(() => {
    if (commentsData && teamsData) {
      const _comments: GetEdiCommentsDataObject[] = commentsData?.data?.map(
        (comment) => {
          const user = teamsData.find(
            (teammate) => comment.userId === teammate.id
          );
          comment.fullName = user?.fullName;
          comment.imageUrl = user?.imageUrl;
          return comment;
        }
      );
      setComments(JSON.parse(JSON.stringify(_comments)));
    }
  }, [commentsData, teamsData]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <HeaderBar>
          {CORE_ORDERS_TEXT_CONSTANTS.VIEW.COMMENTS.HEADING}
        </HeaderBar>
        <GenericLoading
          spinnerProps={{
            spinning: isSpinnerLoading,
          }}
          type="spinner"
        >
          <Timeline style={{ padding: "0px 192px" }}>
            <Timeline.Item dot={<TimelineDot />}>
              <CommentsName
                name={
                  data?.fullName ||
                  CORE_LAYOUT_TEXT_CONSTANTS.HEADER.NAME_LOADING
                }
                extraContent={CORE_ORDERS_TEXT_CONSTANTS.VIEW.COMMENTS.ADD_INFO}
              />
              {/* <AddEdiComment
                poId={orderId}
                organizationId={data?.organizationId || ""}
                isTeamLoading={isTeamLoading}
                teamsData={teamsData?.map((item) => ({
                  label: item.fullName,
                  value: item.fullName,
                }))}
              /> */}
            </Timeline.Item>
            {comments.map((comment) => {
              return (
                <Timeline.Item
                  dot={<TimelineDot imageUrl={comment?.imageUrl} />}
                  key={String(comment.createdAt)}
                >
                  <CommentsName
                    name={comment.fullName || ""}
                    extraContent={
                      <RenderTimestamp ISODateString={comment.createdAt} />
                    }
                  />
                  <EdiCommentDescription
                    changeLoadingState={changeLoadingState}
                    poId={orderId}
                    commentId={comment.id}
                    commentDescription={comment.commentDescription || ""}
                  />
                </Timeline.Item>
              );
            })}
          </Timeline>
        </GenericLoading>
      </div>
    </div>
  );
};
