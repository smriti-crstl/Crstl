import { Alert, Button, Col, Form, Row, Select } from "antd";
import { BaseForm } from "components/atoms/form";
import React from "react";
import { Spinner } from "components/atoms/loading";
import {
  useGetSlackChannelList,
  useUpdateSlackRecipient,
} from "domain/interactors/integrations";
import { SLACK_CONFIG } from "./slack.config";
import styled from "styled-components";

const { Option } = Select;

type Props = {
  onCancelButtonClick: (e?: React.MouseEvent) => void;
  onSuccess: () => void;
};

const StyledBaseForm = styled(BaseForm)`
  width: 250px;
  max-width: 100%;
`;

const StyledAlert = styled(Alert)`
  width: 520px;
  max-width: 100%;
`;

interface FormDataExtended extends FormData {
  channel: string;
}

function SlackChannelUpdate({
  onCancelButtonClick,
  onSuccess,
}: Props): React.ReactElement {
  const {
    data,
    isLoading: isFetchingSlackChannelList,
  } = useGetSlackChannelList();

  const {
    mutate,
    isLoading: isUpdatingSlackRecipient,
    isError,
  } = useUpdateSlackRecipient("");

  const isLoading = isFetchingSlackChannelList || isUpdatingSlackRecipient;

  const onFinish = (formData: FormDataExtended): void => {
    mutate({ recipient: formData.channel }, { onSuccess });
  };

  return (
    <>
      <StyledBaseForm layout="vertical" name="my-profile" onFinish={onFinish}>
        <Spinner spinning={isLoading}>
          <Form.Item
            label="Channel"
            name="channel"
            rules={[
              {
                required: true,
                message: SLACK_CONFIG.CHANNEL_NAME_VALIDATION_MESSAGE,
              },
            ]}
          >
            <Select>
              <Option value="">Please select</Option>
              {data?.map(({ id, name }) => (
                <Option key={name} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Row gutter={20}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {SLACK_CONFIG.SUBMIT}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Button type="ghost" onClick={onCancelButtonClick}>
                {SLACK_CONFIG.CANCEL}
              </Button>
            </Col>
          </Row>
        </Spinner>
      </StyledBaseForm>
      {isError && (
        <StyledAlert message={SLACK_CONFIG.ERROR} type="error" closable />
      )}
    </>
  );
}

export { SlackChannelUpdate };
