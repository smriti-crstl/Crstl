import { useCallback, useState } from "react";

export const useTeammatesModal = (): [boolean, () => void] => {
  const [isTeammatesModalVisible, setIsTeammatesModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setIsTeammatesModalVisible((prev) => !prev);
  }, []);

  return [isTeammatesModalVisible, toggleModal];
};
