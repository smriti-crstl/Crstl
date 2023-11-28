import { StatusLabelFE } from "domain/entity/shared/models";
import { useChangeChipStatusQuery } from "domain/interactors/orders";
import { useUserDetails } from "presentation/hooks/common";
import { ReactElement, useState } from "react";

import { OrderChips } from "@crstl/components/molecules/order-chips";

type Props = {
  configArray:
    | { status: string; backgroundColor: string; textColor: string }[]
    | undefined;
  value: string;
  parentModule: string;
  poId: string;
};

export const OrderChipsWrapper = ({
  value,
  configArray,
  parentModule,
  poId,
}: Props): ReactElement => {
  const [{ data }] = useUserDetails();
  const { mutate, isLoading } = useChangeChipStatusQuery(
    data?.organizationId || ""
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [deliveryStatusValue, setDeliveryStatusValue] = useState(value);

  const handleChipStatusChange = (obj: {
    [obj: string]: string | undefined;
  }): void => {
    const [[parentKey, updatedValue]] = Object.entries(obj) as [
      [StatusLabelFE, string]
    ];

    if (deliveryStatusValue !== updatedValue) {
      setDeliveryStatusValue(updatedValue);
      mutate({
        prevValue: value || "",
        poId,
        label: parentKey,
        value: updatedValue,
      });
    }
    setIsDropdownVisible(false);
  };

  return (
    <OrderChips
      parentModule={parentModule}
      onChange={handleChipStatusChange}
      {...{
        configArray,
        value: deliveryStatusValue,
        isDropdownVisible,
        setIsDropdownVisible,
        isLoading,
      }}
    />
  );
};
