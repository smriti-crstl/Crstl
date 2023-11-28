import { Dropdown, Menu } from "antd";
import { useDeleteEdiComment } from "domain/interactors/edi";
import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";
import styled from "styled-components";

type Props = {
  commentDescription: string;
  commentId: string;
  poId: string;
  changeLoadingState?: (loading: boolean) => void;
};

const StyledComment = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 6px ${({ theme }) => theme.spacing.SMALL};
  min-height: 5rem;
  display: flex;
`;

const CommentDescriptionWrapper = styled.div`
  flex-grow: 1;
`;

const StyledDropdownWrapper = styled.div`
  width: 2rem;
  button {
    height: 1rem;
    padding: 0;
    border: none;
  }
`;

const DELETE_COMMENT_TEXT =
  CORE_ORDERS_TEXT_CONSTANTS.VIEW.COMMENTS.DELETE_COMMENT_BUTTON_TEXT;

export const EdiCommentDescription = ({
  commentDescription,
  commentId,
  poId,
  changeLoadingState,
}: Props): ReactElement => {
  const { mutate } = useDeleteEdiComment(commentId, {
    onMutate: () => changeLoadingState?.(true),
    onSettled: () => changeLoadingState?.(false),
  });

  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === DELETE_COMMENT_TEXT) {
          mutate({ commentId });
        }
      }}
    >
      <Menu.Item key={DELETE_COMMENT_TEXT}>{DELETE_COMMENT_TEXT}</Menu.Item>
    </Menu>
  );

  return (
    <StyledComment>
      <CommentDescriptionWrapper>
        {commentDescription}
      </CommentDescriptionWrapper>
      <StyledDropdownWrapper>
        <Dropdown.Button overlay={menu} />
      </StyledDropdownWrapper>
    </StyledComment>
  );
};
