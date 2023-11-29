import { UserInvitationReq } from "domain/entity/auth/models";
import { UserRoleFE } from "domain/entity/shared/models";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";

import {
  IMultiTagsSelectProps,
  ISingleSelectProps,
} from "@crstl/components/atoms/selects";
import { CreateFormProps } from "@crstl/components/organisms/create-form";

const AUTH_PLUGIN_INVITE_USERS_FIELD_CONSTANTS: {
  INVITEE_EMAILS: keyof UserInvitationReq;
  ROLE: keyof UserInvitationReq;
} = {
  INVITEE_EMAILS: "email",
  ROLE: "role",
};

const AUTH_PLUGIN_INVITE_USERS_FORM_CONFIG: [
  CreateFormProps<IMultiTagsSelectProps>,
  CreateFormProps<ISingleSelectProps>
] = [
  {
    componentType: "multi-tags-select",
    formFields: {
      field: AUTH_PLUGIN_INVITE_USERS_FIELD_CONSTANTS.INVITEE_EMAILS,
      label: TEXT_CONSTANTS.PLUGINS.INVITE_USERS.LABELS.INVITE_EMAILS,
      name: AUTH_PLUGIN_INVITE_USERS_FIELD_CONSTANTS.INVITEE_EMAILS,
      rules: [
        {
          required: true,
          message:
            TEXT_CONSTANTS.PLUGINS.INVITE_USERS.VALIDATIONS
              .INVITE_EMAILS_REQUIRED,
        },
      ],
    },
    containerProps: {
      showMultipleLines: false,
    },
    popupClassName: "hide-dropdown",
  },
  {
    componentType: "single-select",
    options: [
      {
        label: TEXT_CONSTANTS.PLUGINS.INVITE_USERS.LABELS.ROLES.ADMIN,
        value: UserRoleFE.Admin,
      },
      {
        label: TEXT_CONSTANTS.PLUGINS.INVITE_USERS.LABELS.ROLES.MEMBER,
        value: UserRoleFE.Member,
      },
      {
        label:
          TEXT_CONSTANTS.PLUGINS.INVITE_USERS.LABELS.ROLES
            .THIRD_PARTY_LOGISTICS,
        value: UserRoleFE.Third_Party_Logistics,
      },
    ],
    formFields: {
      field: AUTH_PLUGIN_INVITE_USERS_FIELD_CONSTANTS.ROLE,
      name: AUTH_PLUGIN_INVITE_USERS_FIELD_CONSTANTS.ROLE,
      initialValue: UserRoleFE.Member,
      rules: [
        {
          required: true,
          message:
            TEXT_CONSTANTS.PLUGINS.INVITE_USERS.VALIDATIONS.ROLE_REQUIRED,
        },
      ],
    },
  },
];

export {
  AUTH_PLUGIN_INVITE_USERS_FORM_CONFIG,
  AUTH_PLUGIN_INVITE_USERS_FIELD_CONSTANTS,
};
