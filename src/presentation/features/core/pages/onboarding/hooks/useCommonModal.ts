import { useCallback, useState } from "react";

export const useCommonModal = (): [boolean, () => void] => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);

  return [isModalVisible, toggleModal];
};

