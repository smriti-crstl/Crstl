import { AxiosError } from "axios";
import {
  ActivateOrDeactivateTeamUsersReq,
  ActivateOrDeactivateTeamUsersRes,
  UserGetOrganizationDetailsRes,
  UserUpdateOrganizationDetailsReqTransformed,
  UserUpdateOrganizationDetailsRes,
  UserUpdateProfileDetailsReq,
  UserUpdateProfileDetailsRes,
  UserUpdateTeamUserDetailsReq,
  UserUpdateTeamUserDetailsRes,
  USTimezoneModelTransformed,
} from "domain/entity/profile/models";
import {
  getUserOrganizationDetails,
  getUserTimezones,
  putActivateDeactivateTeamUser,
  putOrganizationDetailsQuery,
  putUpdateTeamUserDetails,
  putUserProfileDetails,
} from "domain/entity/profile/repositories";
import { UserDetailsRes } from "domain/entity/shared/models";
import { setMessage, setNotification } from "domain/services/notification";
import { TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES } from "presentation/features/core/pages/settings/constants";
import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

import { SHARED_QUERY_KEYS } from "../shared";

const PROFILE_QUERY_KEYS = {
  GET_ORGANIZATION: "GET_ORGANIZATION",
  GET_USER_TIMEZONES: "GET_USER_TIMEZONES",
};

const useChangeUserProfileDetailsQuery = (
  options?: UseMutationOptions<
    UserUpdateProfileDetailsRes,
    AxiosError,
    UserUpdateProfileDetailsReq
  >
): UseMutationResult<
  UserUpdateProfileDetailsRes,
  AxiosError,
  UserUpdateProfileDetailsReq
> => {
  const queryClient = useQueryClient();

  return useMutation<
    UserUpdateProfileDetailsRes,
    AxiosError,
    UserUpdateProfileDetailsReq
  >(putUserProfileDetails, {
    ...options,
    onSuccess: (data) => {
      // TODO: Ask backend to send success ack message
      setMessage({
        type: "success",
        content: data.message || "Changes Saved",
        duration: 0.5,
      });
    },
    onError: (data) => {
      // TODO: Ask backend to send error ack message
      queryClient.resetQueries(SHARED_QUERY_KEYS.USER_DETAILS);
      setNotification({
        type: "error",
        moduleName: data.name,
        description: data.response?.data.message,
      });
    },
  });
};

const useGetOrganizationDetailsQuery = <TData = UserGetOrganizationDetailsRes>(
  organizationId: string,
  options?: UseQueryOptions<UserGetOrganizationDetailsRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [PROFILE_QUERY_KEYS.GET_ORGANIZATION, organizationId],
    getUserOrganizationDetails,
    options
  );
};

const useGetUserTimezonesQuery = <TData = USTimezoneModelTransformed>(
  options?: UseQueryOptions<USTimezoneModelTransformed, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    PROFILE_QUERY_KEYS.GET_USER_TIMEZONES,
    getUserTimezones,
    options
  );
};

// Follow this example for Optimistic updates
const usePutOrganizationDetailsQuery = (
  organizationId: string
): UseMutationResult<
  UserUpdateOrganizationDetailsRes,
  AxiosError,
  UserUpdateOrganizationDetailsReqTransformed,
  // Context is UserDetailsRes
  UserDetailsRes | undefined
> => {
  const queryClient = useQueryClient();
  return useMutation<
    UserUpdateOrganizationDetailsRes,
    AxiosError,
    UserUpdateOrganizationDetailsReqTransformed,
    // Context is UserDetailsRes
    UserDetailsRes | undefined
  >(putOrganizationDetailsQuery, {
    onMutate: async (data) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(SHARED_QUERY_KEYS.USER_DETAILS);

      // Snapshot the previous value
      const previousUserDetails = queryClient.getQueryData<UserDetailsRes>(
        SHARED_QUERY_KEYS.USER_DETAILS
      );

      // Optimistically update to the new value
      if (previousUserDetails) {
        queryClient.setQueryData<UserDetailsRes>(
          SHARED_QUERY_KEYS.USER_DETAILS,
          {
            ...previousUserDetails,
            organizationName: data.payload.name || "",
          }
        );
      }
      // Returning context value
      return previousUserDetails;
    },
    onSuccess: (data) => {
      setMessage({
        type: "success",
        content: data.message || "Changes Saved",
        duration: 0.5,
      });
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, _variables, context) => {
      // TODO: Ask backend to send error ack message
      // Here context represents previous user details
      if (context) {
        queryClient.setQueryData<UserDetailsRes>(
          SHARED_QUERY_KEYS.USER_DETAILS,
          context
        );
      }
      setNotification({
        type: "error",
        moduleName: err.name,
        description: err.response?.data.message,
      });

      // Refetch organization details
      queryClient.invalidateQueries([
        PROFILE_QUERY_KEYS.GET_ORGANIZATION,
        organizationId,
      ]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(SHARED_QUERY_KEYS.USER_DETAILS);
    },
  });
};

const usePutUpdateTeamUserDetailsMutation = (): UseMutationResult<
  UserUpdateTeamUserDetailsRes,
  AxiosError,
  UserUpdateTeamUserDetailsReq,
  UserDetailsRes[] | undefined
> => {
  const queryClient = useQueryClient();
  return useMutation<
    UserUpdateTeamUserDetailsRes,
    AxiosError,
    UserUpdateTeamUserDetailsReq,
    UserDetailsRes[] | undefined
  >(putUpdateTeamUserDetails, {
    onMutate: async (data) => {
      const queryKey = [SHARED_QUERY_KEYS.USER_TEAM, data.organizationId];
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([
        SHARED_QUERY_KEYS.USER_TEAM,
        data.organizationId,
      ]);

      // Snapshot the previous value
      const previousUserDetails = queryClient.getQueryData<UserDetailsRes[]>(
        queryKey
      );

      // Optimistically update to the new value
      if (previousUserDetails) {
        queryClient.setQueryData<UserDetailsRes[]>(
          queryKey,
          previousUserDetails.map((item) => {
            if (item.id === data.userId) {
              return {
                ...item,
                ...(data.jobFunction ? { jobFunction: data.jobFunction } : {}),
                ...(data.jobRole ? { jobRole: data.jobRole } : {}),
              };
            }
            return item;
          })
        );
      }
      // Returning context value
      return previousUserDetails;
    },
    onError: (err, variables, context) => {
      // Here context represents previous user details
      const queryKey = [SHARED_QUERY_KEYS.USER_TEAM, variables.organizationId];
      if (context) {
        queryClient.setQueryData<UserDetailsRes[]>(queryKey, context);
      }
      setNotification({
        type: "error",
        moduleName: err.name,
        description: err.response?.data.message,
      });
    },
    // Always refetch after error or success:
    onSettled: (_data, _error, variables) => {
      const queryKey = [SHARED_QUERY_KEYS.USER_TEAM, variables.organizationId];
      queryClient.invalidateQueries(queryKey);
    },
  });
};

const usePutActivateDeactivateTeamUserQuery = (): UseMutationResult<
  ActivateOrDeactivateTeamUsersRes,
  AxiosError,
  ActivateOrDeactivateTeamUsersReq,
  UserDetailsRes[] | undefined
> => {
  const queryClient = useQueryClient();
  return useMutation<
    ActivateOrDeactivateTeamUsersRes,
    AxiosError,
    ActivateOrDeactivateTeamUsersReq,
    UserDetailsRes[] | undefined
  >(putActivateDeactivateTeamUser, {
    onMutate: async (data) => {
      const queryKey = [SHARED_QUERY_KEYS.USER_TEAM, data.organizationId];
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([
        SHARED_QUERY_KEYS.USER_TEAM,
        data.organizationId,
      ]);

      // Snapshot the previous value
      const previousUserDetails = queryClient.getQueryData<UserDetailsRes[]>(
        queryKey
      );

      // Optimistically update to the new value
      if (previousUserDetails) {
        queryClient.setQueryData<UserDetailsRes[]>(
          queryKey,
          previousUserDetails.map((item) => {
            if (item.id === data.userId) {
              return {
                ...item,
                isActive:
                  data.isActive ===
                  TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES.ACTIVATED
                    ? true
                    : false,
              };
            }
            return item;
          })
        );
      }
      // Returning context value
      return previousUserDetails;
    },
    onError: (err, variables, context) => {
      // Here context represents previous user details
      const queryKey = [SHARED_QUERY_KEYS.USER_TEAM, variables.organizationId];
      if (context) {
        queryClient.setQueryData<UserDetailsRes[]>(queryKey, context);
      }
      setNotification({
        type: "error",
        moduleName: err.name,
        description: err.response?.data.message,
      });
    },
    // Always refetch after error or success:
    onSettled: (_data, _error, variables) => {
      const queryKey = [SHARED_QUERY_KEYS.USER_TEAM, variables.organizationId];
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export {
  useChangeUserProfileDetailsQuery,
  useGetOrganizationDetailsQuery,
  useGetUserTimezonesQuery,
  usePutOrganizationDetailsQuery,
  usePutUpdateTeamUserDetailsMutation,
  usePutActivateDeactivateTeamUserQuery,
};

