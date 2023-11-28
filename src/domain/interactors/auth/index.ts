import { AxiosError } from "axios";
import {
  CreateUserFromInviteReqPayload,
  CreateUserFromInviteRes,
  UserChangePasswordReq,
  UserInvitationReq,
  UserLoginReq,
  UserLoginRes,
  UserResetPasswordReq,
} from "domain/entity/auth/models";
import {
  postCreateUserFromInviteRequest,
  postInviteUser,
  postUserLogin,
  putUserChangePassword,
  putUserResetPassword,
  verifyUser,
  getOrganizations,
  switchOrganization,
} from "domain/entity/auth/repositories";
import { useMutation, UseMutationResult, useQuery } from "react-query";
import { queryClient } from "domain/frameworks";

import { tokenManagement } from "./service";

const QUERY_KEYS = {
  GET_ORGANIZATIONS: "GET_ORGANIZATIONS",
};

const useLoginQuery = (): UseMutationResult<
  UserLoginRes,
  AxiosError,
  UserLoginReq
> => {
  const mutation = useMutation<UserLoginRes, AxiosError, UserLoginReq>(
    postUserLogin,
    {
      onSuccess: (props) => {
        const {
          access_token,
          refresh_token,
          role,
          organization_id,
          is_multi_org,
        } = props;
        tokenManagement.setRefreshToken(refresh_token);
        tokenManagement.setAuthToken(access_token);
        tokenManagement.setIsMultiOrg(is_multi_org);
        if (role && organization_id) {
          tokenManagement.setRole(role);
          tokenManagement.setOrg(organization_id);
          tokenManagement.setAuthTokenForOrg({
            authToken: access_token,
            orgId: organization_id,
          });
        }
      },
    }
  );
  return mutation;
};

const useChangePasswordQuery = (): UseMutationResult<
  unknown,
  AxiosError,
  UserChangePasswordReq
> => {
  const mutation = useMutation<unknown, AxiosError, UserChangePasswordReq>(
    putUserChangePassword
  );
  return mutation;
};

const useInviteUserQuery = (): UseMutationResult<
  unknown,
  AxiosError,
  UserInvitationReq
> => {
  return useMutation<unknown, AxiosError, UserInvitationReq>(postInviteUser);
};

const useCreateUserFromInviteQuery = (): UseMutationResult<
  CreateUserFromInviteRes,
  AxiosError,
  CreateUserFromInviteReqPayload
> => {
  const mutation = useMutation<
    CreateUserFromInviteRes,
    AxiosError,
    CreateUserFromInviteReqPayload
  >(postCreateUserFromInviteRequest, {
    onSuccess: ({ token, refreshToken, isMultiOrg, role, organizationId }) => {
      tokenManagement.setRefreshToken(refreshToken);
      tokenManagement.setAuthToken(token);
      tokenManagement.setIsMultiOrg(isMultiOrg);
      tokenManagement.setRole(role);
      tokenManagement.setOrg(organizationId);
      tokenManagement.setAuthTokenForOrg({
        authToken: token,
        orgId: organizationId,
      });
    },
  });

  return mutation;
};

const useVerifyUserQuery = () => {
  return useMutation([], verifyUser);
};

const useResetPasswordQuery = (): UseMutationResult<
  unknown,
  AxiosError,
  UserResetPasswordReq
> => {
  const mutation = useMutation<unknown, AxiosError, UserResetPasswordReq>(
    putUserResetPassword
  );
  return mutation;
};

const useGetOrganizationsQuery = () => {
  return useQuery([QUERY_KEYS.GET_ORGANIZATIONS], getOrganizations);
};

const useSwitchOrganizationQuery = (inValidateAllData: boolean) => {
  const mutation = useMutation(switchOrganization, {
    onSuccess: (props) => {
      const { access_token, role, organization_id } = props;
      tokenManagement.setRole(role);
      tokenManagement.setOrg(organization_id);
      tokenManagement.setAuthTokenForOrg({
        authToken: access_token,
        orgId: organization_id,
      });
      if (inValidateAllData) {
        queryClient.resetQueries();
      }
    },
  });
  return mutation;
};

export {
  useLoginQuery,
  useChangePasswordQuery,
  useInviteUserQuery,
  useCreateUserFromInviteQuery,
  useVerifyUserQuery,
  useResetPasswordQuery,
  useGetOrganizationsQuery,
  useSwitchOrganizationQuery,
};

