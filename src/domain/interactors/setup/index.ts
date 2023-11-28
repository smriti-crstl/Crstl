import {
  getOnboardingSetupConfig,
  getOnboardingSetupFormSubmission,
  postOnboardingSetupFormSubmission,
} from "domain/entity/onboarding-setup/repositories";
import { useMutation, useQuery, useQueryClient } from "react-query";

const SETUP_QUERIES = {
  GET_ONBOARDING_SETUP_CONFIG: "GET_ONBOARDING_SETUP_CONFIG",
  GET_ONBOARDING_SETUP_REQUEST: "GET_ONBOARDING_SETUP_REQUEST",
  POST_ONBOARDING_SETUP_REQUEST: "POST_ONBOARDING_SETUP_REQUEST",
};

export const useGetOnboardingSetupConfigQuery = ({
  tradingPartnerId,
  requestType,
}: {
  tradingPartnerId?: string;
  requestType?: string;
}) => {
  return useQuery(
    [SETUP_QUERIES.GET_ONBOARDING_SETUP_CONFIG, tradingPartnerId, requestType],
    getOnboardingSetupConfig
  );
};

export const useGetOnboardingSetupRequestQuery = ({
  tradingPartnerId,
  requestType,
}: {
  tradingPartnerId?: string;
  requestType?: string;
}) => {
  return useQuery(
    [SETUP_QUERIES.GET_ONBOARDING_SETUP_REQUEST, tradingPartnerId, requestType],
    getOnboardingSetupFormSubmission
  );
};

export const usePostOnboardingRequestMutation = () => {
  const queryClient = useQueryClient();
  const mutationResult = useMutation(postOnboardingSetupFormSubmission, {
    onSuccess: () => {
      queryClient.invalidateQueries(SETUP_QUERIES.GET_ONBOARDING_SETUP_REQUEST);
    },
  });

  return mutationResult;
};

