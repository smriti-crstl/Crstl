import { Form } from "antd";
import { UserDetailsRes } from "domain/entity/shared/models";
import { useChangeUserProfileDetailsQuery } from "domain/interactors/profile";
import { debounce } from "lodash";
import { RenderTimestamp } from "presentation/features/common/components";
import { useUserDetails } from "presentation/hooks/common";
import { Types } from "presentation/hooks/contexts/reducers";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement, useEffect } from "react";
import styled from "styled-components";

import { BaseForm } from "@crstl/components/atoms/form";
import { Spinner } from "@crstl/components/atoms/loading";
import { Paragraph } from "@crstl/components/atoms/typography";
import { CreateForm } from "@crstl/components/organisms/create-form";

import { PROFILE_TAB_MY_PROFILE_FORM_CONFIG } from "../../../config";
import { extractMyProfileFormFieldsDataFromUserDetails } from "../../../utils";
import moment from "moment";

// import { ProfilePicture } from "../profile-picture";

const Wrapper = styled.div`
  max-width: 20rem;
`;

export const ProfileTabMyProfileFields = (): ReactElement => {
  const [profileForm] = Form.useForm();

  const [{ data: userDetailsData, isLoading }, dispatch] = useUserDetails();

  const { mutate } = useChangeUserProfileDetailsQuery({
    onMutate: (data) => {
      // TODO: Solve the TS error here. Should refer to UserUpdateRequest
      // Try wrapping this dispatch in a check of if(userDetailsData) to solve the TS error.
      const updatedData = data as UserDetailsRes;
      dispatch({
        type: Types.AddUserDetails,
        payload: {
          data: { ...userDetailsData, ...updatedData },
          isLoading: false,
        },
      });
    },
  });

  useEffect(() => {
    if (userDetailsData) {
      const data = userDetailsData as UserDetailsRes;
      const myProfileFormData = extractMyProfileFormFieldsDataFromUserDetails(
        data
      );
      profileForm.setFieldsValue({ ...myProfileFormData });
    }
  }, [profileForm, userDetailsData]);

  return (
    <Wrapper>
      {/* <ProfilePicture /> */}
      <BaseForm
        form={profileForm}
        layout="vertical"
        name="my-profile"
        onValuesChange={debounce((changedValues, _allValues) => {
          // Changed values will only contain one key,value at a time
          const [[, value]] = Object.entries<string>(changedValues);
          if (value.trim()) {
            mutate(changedValues);
          }
        }, 1000)}
      >
        <Spinner spinning={isLoading}>
          <CreateForm data={PROFILE_TAB_MY_PROFILE_FORM_CONFIG} />
          <Form.Item
            label={CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.EMAIL}
          >
            <Paragraph isDisabled>{userDetailsData?.email}</Paragraph>
          </Form.Item>
          <Form.Item
            label={CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.LAST_LOG_IN}
          >
            <Paragraph isDisabled>
              <RenderTimestamp
                ISODateString={userDetailsData?.lastSignInTime}
              />
            </Paragraph>
          </Form.Item>
          {userDetailsData?.lastActiveAt && (
            <Form.Item
              label={
                CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.LAST_ACTIVE
              }
            >
              <Paragraph isDisabled>
                About {moment(userDetailsData?.lastActiveAt).fromNow()}
              </Paragraph>
            </Form.Item>
          )}
        </Spinner>
      </BaseForm>
    </Wrapper>
  );
};
