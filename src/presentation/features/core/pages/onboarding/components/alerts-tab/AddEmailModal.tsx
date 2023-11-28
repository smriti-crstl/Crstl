import { Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { usePutContactEmailMutation } from "domain/interactors/alerts-tab";
import { setNotification } from "domain/services/notification";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { BaseForm } from "@crstl/components/atoms/form";
import { PaddedModal } from "@crstl/components/atoms/modal";
import {
  SimpleButtonGroup,
  SimpleButtonGroupProps
} from "@crstl/components/molecules/button-groups";

interface Props {
  isVisible: boolean;
  toggleModal: () => void;
}

export const AddEmailModal: React.FC<Props> = ({ isVisible, toggleModal }) => {
  const [form] = useForm();

  const { isLoading, mutate } = usePutContactEmailMutation({
    onSuccess: () => {
      setNotification({
        type: "success",
        moduleName: "Email added successfully",
      });
      toggleModal();
      form.setFieldsValue({ email: "" });
    },
  });

  const buttonGroupProps: SimpleButtonGroupProps = {
    firstButtonProps: {
      text: "Cancel",
      onClick: toggleModal,
    },
    secondButtonProps: {
      loading: isLoading,
      text: "Add",
      buttonProps: { htmlType: "submit" },
    },
  };

  return (
    <PaddedModal visible={isVisible} onCancel={toggleModal} width="40%">
      <h1>Add email to receive alerts</h1>
      <BaseForm
        form={form}
        onFinish={(values) => mutate({ email: values?.email, enabled: true })}
      >
        <Form.Item name="email">
          <Input type="email" required placeholder="Email" />
        </Form.Item>

        <SimpleButtonGroup {...buttonGroupProps} />
      </BaseForm>
    </PaddedModal>
  );
};

