import { Comment } from '@ant-design/compatible';
import { Col, Form, Mentions, Row } from "antd";
import { useCreateCommentQuery } from "domain/interactors/orders";
import { useUserTeamQuery } from "domain/interactors/shared";
import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";
import styled from "styled-components";

import { ColoredButton } from "@crstl/components/atoms/buttons";

// TODO: Replace w CommentsMention Molecule

const BottomBar = styled.div`
  border: 1px solid #d9d9d9;
  border-top: none;
  border-radius: 2px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  padding: 6px ${({ theme }) => theme.spacing.SMALL};
`;

const CommentWrapper = styled(Comment)`
  && .ant-mentions:focus {
    border-color: #d9d9d9;
    border-right-width: thin !important;
    outline: 0;
    box-shadow: inherit;
  }

  .ant-mentions-focused {
    border-color: #d9d9d9;
    border-right-width: thin !important;
    outline: 0;
    box-shadow: inherit;
  }

  && .ant-mentions:hover {
    border-color: #d9d9d9;
    border-right-width: thin !important;
  }

  && .ant-mentions {
    border-bottom: 1px solid rgba(245, 245, 245, 1);
    /* border-bottom: 1px solid #f0f0f0; */
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const AtWrapper = styled.div`
  font-size: ${({ theme }) => theme.typography.SIZES.MD};
  font-weight: ${({ theme }) => theme.typography.WEIGHTS.MEDIUM};
  color: ${({ theme }) => theme.palette.greyScale[400]};
  cursor: pointer;
`;

const CREATE_COMMENT_FIELD_NAME = "commentDescription";

type Props = {
  poId: string;
  organizationId: string;
  isUserLoading?: boolean;
};

export const AddComment = ({
  poId,
  isUserLoading,
  organizationId,
}: Props): ReactElement => {
  const [createCommentForm] = Form.useForm();
  const { mutate, isLoading: isCreateCommentLoading } = useCreateCommentQuery(
    poId
  );
  const { isLoading: isTeamLoading, data: teamsData } = useUserTeamQuery(
    organizationId,
    {
      enabled: !!organizationId,
      select: (data) => {
        return data.map((item) => ({
          label: item.fullName,
          value: item.fullName,
        }));
      },
    }
  );

  const handleAddCommentsClick = (): void => {
    const { commentDescription } = createCommentForm.getFieldsValue([
      CREATE_COMMENT_FIELD_NAME,
    ]);
    if (commentDescription) {
      mutate(
        { commentDescription, poId },
        {
          onSuccess: () => {
            createCommentForm.resetFields();
          },
        }
      );
    }
  };

  return (
    <CommentWrapper
      content={
        <Form form={createCommentForm} name="comment">
          <Form.Item
            style={{ marginBottom: "0" }}
            name={CREATE_COMMENT_FIELD_NAME}
          >
            <Mentions
              loading={isUserLoading || isTeamLoading}
              rows={3}
              placeholder={
                CORE_ORDERS_TEXT_CONSTANTS.VIEW.COMMENTS.MENTIONS_PLACEHOLDER
              }
            >
              {teamsData?.map((item) => {
                if (item.value) {
                  return (
                    <Mentions.Option value={item.value} key={item.value}>
                      {item.label}
                    </Mentions.Option>
                  );
                } else {
                  return null;
                }
              })}
            </Mentions>
          </Form.Item>
          <BottomBar>
            <Row justify="space-between" align="middle">
              <Col>
                <AtWrapper
                // onClick={() => {
                //   createCommentForm.setFieldsValue({
                //     [CREATE_COMMENT_FIELD_NAME]: "@",
                //   });
                // }}
                >
                  @
                </AtWrapper>
              </Col>
              <Col>
                <Form.Item style={{ margin: 0 }} shouldUpdate>
                  {() => (
                    <ColoredButton
                      htmlType="submit"
                      onClick={handleAddCommentsClick}
                      loading={isCreateCommentLoading}
                      disabled={
                        !createCommentForm.getFieldValue(
                          CREATE_COMMENT_FIELD_NAME
                        )
                      }
                    >
                      {CORE_ORDERS_TEXT_CONSTANTS.VIEW.COMMENTS.ADD_BUTTON_TEXT}
                    </ColoredButton>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </BottomBar>
        </Form>
      }
    />
  );
};
