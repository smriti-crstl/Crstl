import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useViewResultModal = ({
  isSuccess,
  isFailure,
  isLoading,
}: {
  isSuccess: boolean;
  isFailure: boolean;
  isLoading: boolean;
}): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (isSuccess || isFailure || isLoading) {
      setIsModalVisible(true);
    }
  }, [isFailure, isLoading, isSuccess]);

  return [isModalVisible, setIsModalVisible];
};
