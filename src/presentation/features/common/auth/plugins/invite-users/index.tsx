import { Form } from "antd";
import { UserInvitationReq } from "domain/entity/auth/models";
import { useInviteUserQuery } from "domain/interactors/auth";
import { CORE_HOME } from "globals/configs/urls";
import { CoreOrdersLocationStateProps } from "presentation/features/core/pages/orders/components/common/WelcomeModal";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement, useState } from "react";
import { useHistory } from "react-router";

import { BaseForm } from "components/atoms/form";
import { GenericHeading } from "components/atoms/typography";
import {
  SimpleButtonGroup,
  SimpleButtonGroupProps,
} from "components/molecules/button-groups";
import { ResultModal } from "components/molecules/modals";
import { CreateForm } from "components/organisms/create-form";

import { AUTH_PLUGIN_INVITE_USERS_FORM_CONFIG } from "./config";
import styled from "styled-components";

type Props = {
  cancelCallback?: () => void;
  successCallback?: () => void;
  firstButtonText?: string;
  secondButtonText?: string;
};

const Container = styled.div`
  width: 320px;
  max-width: 100%;
`;

export const InviteUsersPlugIn = ({
  cancelCallback,
  successCallback,
  firstButtonText,
  secondButtonText,
}: Props): ReactElement => {
  const [isInviteModalVisible, setIsInviteModalVisible] = useState<boolean>(
    false
  );
  const history = useHistory<CoreOrdersLocationStateProps>();
  const { mutate, isLoading } = useInviteUserQuery();
  const [form] = Form.useForm();

  const handleFlowSuccess = (): void => {
    if (successCallback) {
      form.resetFields();
    } else {
      history.replace(CORE_HOME, { showWelcomeModal: true });
    }
  };

  const buttonGroupProps: SimpleButtonGroupProps = {
    firstButtonProps: {
      text:
        firstButtonText ||
        TEXT_CONSTANTS.PLUGINS.INVITE_USERS.TEXTS.SKIP_BUTTON,
      // Skip is considered as flow Success, otherwise cancel callback is called
      onClick: cancelCallback || handleFlowSuccess,
    },
    secondButtonProps: {
      loading: isLoading,
      text:
        secondButtonText ||
        TEXT_CONSTANTS.PLUGINS.INVITE_USERS.TEXTS.SEND_BUTTON,
      buttonProps: { htmlType: "submit" },
    },
  };

  return (
    <>
      <ResultModal
        texts={{
          successText:
            TEXT_CONSTANTS.PLUGINS.INVITE_USERS.SUCCESS_MODAL.SUCCESS_TEXT,
          successButtonText:
            TEXT_CONSTANTS.PLUGINS.INVITE_USERS.SUCCESS_MODAL
              .SUCCESS_BUTTON_TEXT,
        }}
        open={isInviteModalVisible}
        isSuccess
        width="50vw"
        handleSuccessButtonClick={() => {
          setIsInviteModalVisible(false);
          handleFlowSuccess();
        }}
      />
      <Container>
        <BaseForm
          form={form}
          requiredMark={false}
          layout="vertical"
          name="invite-users"
          onFinish={(values: UserInvitationReq) => {
            mutate(values, {
              onSuccess: () => {
                if (successCallback) {
                  successCallback();
                }
                setIsInviteModalVisible(true);
              },
            });
          }}
        >
          <GenericHeading size="MD">
            {TEXT_CONSTANTS.PLUGINS.INVITE_USERS.TEXTS.INVITE_USERS_HEADING}
          </GenericHeading>
          <CreateForm data={AUTH_PLUGIN_INVITE_USERS_FORM_CONFIG} />
          <SimpleButtonGroup {...buttonGroupProps} />
        </BaseForm>
      </Container>
    </>
  );
};
