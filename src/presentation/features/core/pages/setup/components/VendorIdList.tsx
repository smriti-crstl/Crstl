import { Spinner } from "components/atoms/loading";
import {
  useGetOrgDataQuery,
  usePutOrgDataOptimisticMutation,
} from "domain/interactors/edi-setup";
import { cloneDeep, get, set } from "lodash";
import { useCallback, useState } from "react";
import { Note, Question } from "../styles";
import { HandleListChangeFn, UpdateVendorIdsDataFn, VendorIds } from "../types";
import { VendorIdForm } from "./VendorIdForm";

export const VendorIdList = () => {
  const [vendorIds, setVendorIds] = useState<VendorIds>([{}]);

  const { data: orgDataRes, isLoading } = useGetOrgDataQuery(
    { intakeForm: true },
    {
      onSuccess: (response) => {
        if (response?.data?.intakeForm?.vendorIds?.length) {
          const vendorIdsToSet = response?.data?.intakeForm?.vendorIds;

          setVendorIds(vendorIdsToSet);
        }
      },
    }
  );

  const { mutate: mutateIntakeFormData } = usePutOrgDataOptimisticMutation({
    intakeForm: true,
  });

  const updateVendorIdsData: UpdateVendorIdsDataFn = useCallback(
    (vendorIds: VendorIds) => {
      const clone = cloneDeep(orgDataRes?.data ?? { id: "" });
      set(clone, "intakeForm.vendorIds", vendorIds);
      mutateIntakeFormData(clone);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orgDataRes]
  );

  const handleListChange: HandleListChangeFn = ({ arrIndex, field, value }) => {
    setVendorIds((prevArr) => {
      const clone = cloneDeep(prevArr);
      let newVendorIds = set(clone, `${arrIndex}.${field}`, value);

      // !! Note: the `processed` values may be misleading when the user changes `tradingPartnerId` in the array
      const processed = get(newVendorIds, `${arrIndex}.processed`);

      if (!processed) {
        newVendorIds = set(newVendorIds, `${arrIndex}.processed`, "No");
      }

      return newVendorIds;
    });
  };

  return (
    <Spinner spinning={isLoading}>
      <div>
        <Question>Add Trading Partners and the associated Vendor IDs</Question>
        <Note>
          Note: We may reach out to the trading partner on your behalf for
          testing and onboarding instructions.
        </Note>
      </div>
      {vendorIds?.map(
        ({ tradingPartnerId, vendorId, tradingPartnerName }, idx) => (
          <VendorIdForm
            key={tradingPartnerId ?? "new-vendor-id"}
            {...{
              tradingPartnerId,
              tradingPartnerName,
              vendorId,
              idx,
              vendorIds,
              setVendorIds,
              handleListChange,
              updateVendorIdsData,
            }}
          />
        )
      )}
    </Spinner>
  );
};

