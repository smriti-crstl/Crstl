import { Dispatch, SetStateAction, useCallback, useState } from "react";

export interface OnboardingRequestModalData {
  tradingPartnerId?: string;
  requestType?: string;
  onboardingTaskId?: string;
}

export type SetOnboardingRequestModalData = Dispatch<
  SetStateAction<OnboardingRequestModalData>
>;

export const useSetupFormModal = (): [
  boolean,
  () => void,
  OnboardingRequestModalData,
  SetOnboardingRequestModalData
] => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [
    requestModalData,
    setRequestModalData,
  ] = useState<OnboardingRequestModalData>({
    tradingPartnerId: "",
    requestType: "",
    onboardingTaskId: "",
  });

  const toggleModal = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);

  return [isModalVisible, toggleModal, requestModalData, setRequestModalData];
};

