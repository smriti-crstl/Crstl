import { UserGetOrganizationDetailsRes } from "domain/entity/profile/models";
import { UserDetailsRes } from "domain/entity/shared/models";

const extractMyProfileFormFieldsDataFromUserDetails = (
  userDetails: UserDetailsRes
): Partial<UserDetailsRes> => {
  return {
    fullName: userDetails.fullName,
    jobFunction: userDetails.jobFunction,
    role: userDetails.role,

    // Both these fields are not form fields, they are dynamic and based on state of context as they are not editable

    // email: userDetails.email,
    // lastSignInTime: userDetails.lastSignInTime,
  };
};

const extractMyCompanyDetailsFormFieldsDataFromOrganizationDetails = (
  organizationDetails: UserGetOrganizationDetailsRes
): Partial<UserGetOrganizationDetailsRes> => {
  return {
    address: organizationDetails.address,
    timezoneId: organizationDetails.timezoneId,
    name: organizationDetails.name,
  };
};

export {
  extractMyProfileFormFieldsDataFromUserDetails,
  extractMyCompanyDetailsFormFieldsDataFromOrganizationDetails,
};
