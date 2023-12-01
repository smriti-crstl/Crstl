import { Form } from "antd";
import { LOGIN } from "globals/configs";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

import { ColoredButton } from "components/atoms/buttons";
import { PaperCard } from "components/atoms/card";
import { GenericHeading } from "components/atoms/typography";
import { AuthBottomBar } from "components/molecules/auth-bottom-bar";
import { CreateForm } from "components/organisms/create-form";

import { SIGN_UP_FORM_CONFIG } from "./utils/config";

export const SignUp = (): ReactElement => {
  return (
    <div style={{ width: "100%" }}>
      <PaperCard extraPadding>
        <Form
          layout="vertical"
          name="login"
          onFinish={(values) => console.log(values)}
        >
          <GenericHeading>{TEXT_CONSTANTS.SIGN_UP.SIGN_UP_TEXT}</GenericHeading>
          <CreateForm data={SIGN_UP_FORM_CONFIG} />
          <ColoredButton
            shape="round"
            customType="TERTIARY"
            size="large"
            extraPadding
            buttonProps={{ htmlType: "submit" }}
          >
            {TEXT_CONSTANTS.SIGN_UP.SIGN_UP_TEXT}
          </ColoredButton>
          <AuthBottomBar
            redirectionUrl={LOGIN}
            text={TEXT_CONSTANTS.SIGN_UP.BOTTOM_BAR_TEXT}
            buttonText={TEXT_CONSTANTS.SIGN_UP.LOG_IN_BUTTON}
          />
        </Form>
      </PaperCard>
    </div>
  );
};
