import { Button, SelectProps } from "antd";
import { useGetSearchTradingPartners } from "domain/interactors/shared";
import { compact, debounce, flatMap } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { getTpfName } from "../../edi/edi.utils";
import { StyledInput, StyledSelect, VendorFieldContainer } from "../styles";
import { HandleListChangeFn, UpdateVendorIdsDataFn, VendorIds } from "../types";

interface PublicProps {
  tradingPartnerId?: string;
  tradingPartnerName?: string;
  vendorId?: string;
  idx: number;
  vendorIds: VendorIds;
  setVendorIds: Dispatch<SetStateAction<VendorIds>>;
  handleListChange: HandleListChangeFn;
  updateVendorIdsData: UpdateVendorIdsDataFn;
}

export const VendorIdForm: React.FC<PublicProps> = ({
  vendorIds,
  setVendorIds,
  tradingPartnerId,
  tradingPartnerName,
  vendorId,
  idx,
  handleListChange,
  updateVendorIdsData,
}) => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [options, setOptions] = useState<SelectProps<string>["options"]>(() =>
    tradingPartnerId
      ? [{ label: tradingPartnerName, value: tradingPartnerId }]
      : []
  );

  const { isLoading } = useGetSearchTradingPartners(
    { searchKey },
    {
      enabled: searchKey.length >= 3,
      onSuccess: (response) => {
        const searchTpOptions = (response?.data ?? []).map(
          ({ id, name, flavor }) => ({
            label: getTpfName({ name, flavor }),
            value: id,
            disabled: compact(flatMap(vendorIds, "tradingPartnerId")).includes(
              id
            ),
          })
        );

        setOptions(searchTpOptions);
      },
    }
  );

  const handleSearch = debounce((searchStr) => {
    setSearchKey(searchStr);
  }, 1000);

  return (
    <VendorFieldContainer key={tradingPartnerId ?? "new-vendor-id"}>
      <StyledSelect
        // TODO: remove this disabled
        disabled={idx !== 0}
        options={options}
        placeholder="Trading Partner"
        filterOption={false}
        onSearch={handleSearch}
        showArrow={false}
        loading={isLoading}
        value={tradingPartnerId}
        // * Note intentionally added `selectedOption: any` as `OptionsType | OptionData | OptionGroupData` wasn't matching
        onChange={(newTpId, selectedOption: any) => {
          handleListChange({
            arrIndex: idx,
            field: "tradingPartnerId",
            value: newTpId as string,
          });
          handleListChange({
            arrIndex: idx,
            field: "tradingPartnerName",
            value: selectedOption?.label,
          });
        }}
        notFoundContent={null}
        showSearch
        defaultActiveFirstOption={false}
      />
      <StyledInput
        // TODO: remove this disabled
        disabled={idx !== 0}
        placeholder="Vendor ID"
        value={vendorId}
        onChange={(e) =>
          handleListChange({
            arrIndex: idx,
            field: "vendorId",
            value: e.target.value,
          })
        }
      />
      {idx === 0 ? (
        <Button
          icon={<PlusOutlined />}
          disabled={!tradingPartnerId}
          onClick={() =>
            setVendorIds((prevArr) => {
              const newVendorIds = [{}, ...prevArr];
              updateVendorIdsData(newVendorIds);
              return newVendorIds;
            })
          }
        />
      ) : (
        <Button
          icon={<MinusOutlined />}
          onClick={() =>
            setVendorIds((prevArr) => {
              const newVendorIds = prevArr.filter((_, index) => index !== idx);
              updateVendorIdsData(newVendorIds);
              return newVendorIds;
            })
          }
        />
      )}
    </VendorFieldContainer>
  );
};

