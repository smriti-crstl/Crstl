import { Dispatch, ReactElement, SetStateAction, useState } from "react";

import { SimpleInput } from "components/atoms/inputs";
import { PaddedModal } from "components/atoms/modal";
import { GenericHeading } from "components/atoms/typography";
import { SimpleButtonGroup } from "components/molecules/button-groups";

type Props = {
  isShopNameModalOpen: boolean;
  isLoading: boolean;
  setIsShopNameModalOpen: Dispatch<SetStateAction<boolean>>;
  handleModalSuccess: (shopName: string | null) => void;
};

// TODO: Integrate Text reservoir

export const ShopifyInputModal = ({
  isShopNameModalOpen,
  setIsShopNameModalOpen,
  handleModalSuccess,
  isLoading,
}: Props): ReactElement => {
  const [shopName, setShopName] = useState<null | string>(null);

  return (
    <PaddedModal
      open={isShopNameModalOpen}
      onCancel={() => setIsShopNameModalOpen(false)}
    >
      <GenericHeading size="MD">Please enter the shop name</GenericHeading>
      <SimpleInput
        onPressEnter={() => handleModalSuccess(shopName)}
        value={shopName || ""}
        onChange={(e) => setShopName(e.target.value)}
      />
      <br />
      <SimpleButtonGroup
        firstButtonProps={{
          text: "Cancel",
          onClick: () => setIsShopNameModalOpen(false),
        }}
        secondButtonProps={{
          text: "Done",
          onClick: () => handleModalSuccess(shopName),
          loading: isLoading,
        }}
      />
    </PaddedModal>
  );
};
