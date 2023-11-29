// /** Sample Data - // TODO: delete after use */
// import enhancedSchema from "./sample/sample-form-schema.json";
// import formUiSchema from "./sample/sample-ui-schema.json";
// import formData from "./sample/sample-data.json";
// /** Sample Data ENDS */

import { Input, Select } from "antd";
import clsx from "clsx";
import { GetOrgDataRes } from "domain/entity/edi-setup/models";
import { useGetListDocumentSchema } from "domain/interactors/edi";
import {
  useGetOrgDataQuery,
  usePutOrgDataMutation,
} from "domain/interactors/edi-setup";
import {
  SHARED_QUERY_KEYS,
  useGetTradingPartnerDocuments,
  useGetTradingPartners,
} from "domain/interactors/shared";
import { setNotification } from "domain/services/notification";
import { cloneDeep, get, isEmpty, set } from "lodash";
import { getTpfName } from "presentation/features/core/pages/edi/edi.utils";
import { useSearchParams } from "presentation/hooks/common";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";
import { Tabs } from "@crstl/components/atoms/tabs";

import { StyledPrimaryButton } from "../../../../edi-edit/EdiEditPage.styles";
import { clean } from "../../../../edi-edit/helpers";
import { customWidgets } from "../../../../edi-edit/widgets";
import { useDocumentTypeTabsConfig } from "../../../hooks/useDocumentTypeTabsConfig";
import {
  DOCUMENT_TYPE_SEARCH_KEY,
  TRADING_PARTNER_ID_SEARCH_KEY,
} from "../constants";
import { filterVisibleErrors } from "../helpers";
import {
  FieldContainer,
  FieldRow,
  FormItemContainer,
  SectionWrapper,
  StyledModal,
  TabsContainer,
  Title,
  TitleContainer,
} from "../styles";
import { FormDocumentType } from "../types";
import { EdiForm } from "./argo-form";
import { customTemplates } from "./argo-form/templates";

export const TradingPartnerInfo = () => {
  const [tradingPartner, setTradingPartner] = useState<string>(""); // uuid
  const [documentType, setDocumentType] = useState<FormDocumentType>();
  const [nextTradingPartner, setNextTradingPartner] = useState<string>(""); // uuid
  const [nextDocumentType, setNextDocumentType] = useState<FormDocumentType>();
  const [vendorId, setVendorId] = useState<string>();
  const [gs1Id, setGs1Id] = useState<string>();
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [isArgoFormDirty, setIsArgoFormDirty] = useState<boolean>(false);
  const [liveValidate, setLiveValidate] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(
    false
  );
  const form = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const tradingPartnerId = searchParams.get(TRADING_PARTNER_ID_SEARCH_KEY);
  const documentTypeId = searchParams.get(DOCUMENT_TYPE_SEARCH_KEY);

  useEffect(() => {
    if (tradingPartnerId) {
      handleTpChange(tradingPartnerId);
    }
    if (tradingPartnerId && documentTypeId) {
      handleDocTypeChange(documentTypeId);
    }
  }, [documentTypeId, tradingPartnerId]);

  const {
    data: tradingPartners,
    isLoading: isLoadingTpData,
  } = useGetTradingPartners({
    select: (response) =>
      response?.data
        ?.map(({ id, name, flavor }) => ({
          label: getTpfName({ name, flavor }),
          value: id,
        }))
        ?.sort((a, b) => a.label.localeCompare(b.label)),
    onSuccess: (data) => {
      if (!tradingPartnerId && data?.length) {
        const newTp = data?.[0]?.value;
        handleTpChange(newTp);
      }
    },
  });

  const {
    data: tpBasicData,
    isFetching: isTpBasicInfoLoading,
  } = useGetOrgDataQuery(
    { tradingPartner },
    {
      enabled: !!tradingPartner,
      onSuccess: (data) => {
        setGs1Id(data?.data?.tradingPartnerOverrides?.gs1Id);
        setVendorId(data?.data?.tradingPartnerOverrides?.vendorId);
      },
    }
  );

  const {
    data: tpDocOverride,
    isFetching: isTpDocOverrideLoading,
  } = useGetOrgDataQuery(
    { tradingPartner, documentType },
    {
      enabled: !!tradingPartner && !!documentType,
    }
  );

  const {
    data: tradingPartnerDocuments,
    isLoading: isLoadingTpDocsData,
  } = useGetTradingPartnerDocuments(tradingPartner, {
    select: (response) => response?.data,
    enabled: !!tradingPartner,
    onSuccess: (data) => {
      const documentTypeId = searchParams.get(DOCUMENT_TYPE_SEARCH_KEY);
      if (!documentTypeId && data?.[0]?.value) {
        searchParams.set(DOCUMENT_TYPE_SEARCH_KEY, data?.[0]?.value);
        history.push({
          search: `?${searchParams}`,
        });
        setDocumentType(data?.[0]?.value);
      }
    },
  });

  const overridesFormData = get(
    tpDocOverride,
    "data.tradingPartnerOverrides.documentPreferences.jedi.interchanges[0].groups[0].transaction_sets[0]",
    {}
  );

  const handleTpChange = (newTp: string) => {
    if (isFormDirty || isArgoFormDirty) {
      setNextTradingPartner(newTp);
      setNextDocumentType(undefined);
      setIsConfirmModalVisible(true);
      return;
    }

    setLiveValidate(false);
    setTradingPartner(newTp);
    setDocumentType(undefined);
    searchParams.set(TRADING_PARTNER_ID_SEARCH_KEY, newTp);
    searchParams.delete(DOCUMENT_TYPE_SEARCH_KEY);
    history.push({
      search: `?${searchParams}`,
    });
  };

  const handleDocTypeChange = (newDocType: FormDocumentType) => {
    if (isArgoFormDirty) {
      setNextTradingPartner(tradingPartner);
      setNextDocumentType(newDocType);
      setIsConfirmModalVisible(true);
      return;
    }

    setLiveValidate(false);
    setDocumentType(newDocType);
    searchParams.set(DOCUMENT_TYPE_SEARCH_KEY, newDocType);
    history.push({
      search: `?${searchParams}`,
    });
  };

  const handleModalClose = () => {
    setIsConfirmModalVisible(false);
    setNextTradingPartner("");
    setNextDocumentType(undefined);
  };

  const handleModalConfirm = () => {
    setIsFormDirty(false);
    setIsArgoFormDirty(false);
    setTradingPartner(nextTradingPartner);
    setDocumentType(nextDocumentType);
    setLiveValidate(false);

    searchParams.delete(TRADING_PARTNER_ID_SEARCH_KEY);
    searchParams.delete(DOCUMENT_TYPE_SEARCH_KEY);

    if (nextTradingPartner) {
      searchParams.set(TRADING_PARTNER_ID_SEARCH_KEY, nextTradingPartner);
    }
    if (nextDocumentType) {
      searchParams.set(DOCUMENT_TYPE_SEARCH_KEY, nextDocumentType);
    }
    history.push({
      search: `?${searchParams}`,
    });
    handleModalClose();
  };

  const {
    mutate: updateTpBasicInfo,
    isLoading: isUpdatingTpBasicInfo,
  } = usePutOrgDataMutation({ tradingPartner });

  const {
    mutate: updateTpDocOverrides,
    isLoading: isUpdatingTpDocOverrides,
  } = usePutOrgDataMutation({ tradingPartner, documentType });

  const handleClickSave = () => {
    if (!vendorId) {
      setNotification({
        type: "error",
        moduleName: "Please add Vendor ID",
      });
      return;
    }

    const updateReqData = {
      id: tpBasicData?.data?.id ?? "",
      tradingPartnerOverrides: {
        gs1Id,
        vendorId,
        tradingPartnerId: tradingPartner,
      },
    };

    updateTpBasicInfo(updateReqData, {
      onSuccess: () => {
        setIsFormDirty(false);
        setNotification({
          type: "info",
          moduleName: "Updated successfully",
        });
      },
      onError: () =>
        setNotification({
          type: "error",
          moduleName: "Some error occurred",
        }),
    });
  };

  const { data: schemaData } = useGetListDocumentSchema(
    documentType as string,
    undefined,
    tradingPartner
  );

  const { enhancedSchema, defaultInputSchema: defaultInputUiSchema } =
    schemaData ?? {};

  const [documentTypeTabsConfig] = useDocumentTypeTabsConfig(
    tradingPartnerDocuments ?? []
  );

  const handleClickSaveArgo = useCallback(() => {
    const { formData = {}, errors = [] } = (form.current as any)?.state ?? {};
    const clonedOrgData = cloneDeep(tpDocOverride?.data) ?? { id: "" }; // { id: "" } because id is mandatory
    const cleanedFormData = clean(formData);

    const visibleErrors = filterVisibleErrors(errors, defaultInputUiSchema);

    // in cases where formData is {}
    if (!isEmpty(cleanedFormData)) {
      set<GetOrgDataRes["data"]>(
        clonedOrgData,
        "tradingPartnerOverrides.documentPreferences.jedi.interchanges[0].groups[0].transaction_sets[0]",
        cleanedFormData
      );
    }

    // setting of the is_completed field from the BE
    set(
      clonedOrgData,
      "tradingPartnerOverrides.documentPreferences.isCompleted",
      visibleErrors?.length === 0
    );

    updateTpDocOverrides(clonedOrgData, {
      onSuccess: () => {
        setIsArgoFormDirty(false);
        setNotification({
          type: "info",
          moduleName: `Updated ${
            visibleErrors?.length ? "with errors" : "successfully"
          }`,
        });
        queryClient.invalidateQueries(SHARED_QUERY_KEYS.ORG_TRADING_PARTNERS);
      },
      onError: () =>
        setNotification({
          type: "error",
          moduleName: "Some error occurred",
        }),
    });
  }, [defaultInputUiSchema, tpDocOverride?.data, updateTpDocOverrides]);

  return (
    <SectionWrapper>
      <Spinner spinning={isTpBasicInfoLoading || isUpdatingTpBasicInfo}>
        <TitleContainer>
          <Title>
            Please select trading partner & document type to configure default
            values
          </Title>
          <StyledPrimaryButton
            onClick={handleClickSave}
            disabled={isUpdatingTpBasicInfo || !isFormDirty}
          >
            Save
          </StyledPrimaryButton>
        </TitleContainer>
        <FieldRow>
          <FieldContainer>
            <span>Trading Partner</span>
            <Select
              loading={isLoadingTpData}
              options={tradingPartners ?? []}
              value={tradingPartner}
              onChange={handleTpChange}
              disabled={isUpdatingTpBasicInfo}
            />
          </FieldContainer>
          {tradingPartner ? (
            <>
              <FieldContainer>
                {/* hardcoding custom logic here */}
                <div className="ant-form ant-form-vertical">
                  <FormItemContainer
                    className={clsx(
                      "ant-row ant-form-item",
                      isFormDirty && !vendorId
                        ? "ant-form-item-has-error"
                        : null
                    )}
                  >
                    <div className="ant-col ant-form-item-label">
                      <label
                        htmlFor={"vendorId"}
                        className={clsx("ant-form-label", {
                          "ant-form-item-required": true,
                        })}
                      >
                        <span>Vendor ID</span>
                      </label>
                    </div>
                    <div className="ant-col ant-form-item-control">
                      <div className="ant-form-item-control-input">
                        <Input
                          value={vendorId}
                          onChange={(e) => {
                            setIsFormDirty(true);
                            setVendorId(e.target.value);
                          }}
                          disabled={isUpdatingTpBasicInfo}
                        />
                      </div>
                      {isFormDirty && !vendorId ? (
                        <div className="ant-form-item-explain ant-form-item-explain-error">
                          <div role="alert" key={"error"}>
                            Field required
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </FormItemContainer>
                </div>
              </FieldContainer>
              <FieldContainer>
                <span>Override for GS1 Prefix</span>
                <Input
                  value={gs1Id}
                  onChange={(e) => {
                    setIsFormDirty(true);
                    setGs1Id(e.target.value);
                  }}
                  disabled={isUpdatingTpBasicInfo}
                />
              </FieldContainer>
            </>
          ) : null}
        </FieldRow>
      </Spinner>

      <Spinner spinning={isTpDocOverrideLoading || isUpdatingTpDocOverrides}>
        {tradingPartnerDocuments?.length ? (
          <TabsContainer>
            <Tabs
              activeKey={documentType}
              data={documentTypeTabsConfig}
              onTabClick={handleDocTypeChange}
              tabBarExtraContent={
                <StyledPrimaryButton
                  onClick={() => {
                    setLiveValidate(true);
                    // timeout because the first time liveValidate=true does not trigger errors in the form
                    setTimeout(() => {
                      handleClickSaveArgo();
                    }, 500);
                  }}
                  disabled={isUpdatingTpDocOverrides || !isArgoFormDirty}
                >
                  Save
                </StyledPrimaryButton>
              }
            />
          </TabsContainer>
        ) : null}
        {tradingPartner && documentType && !isTpDocOverrideLoading ? (
          <>
            {enhancedSchema && defaultInputUiSchema?.properties ? (
              <EdiForm
                showErrorList={false}
                schema={enhancedSchema}
                uiSchema={defaultInputUiSchema?.properties}
                formData={overridesFormData}
                widgets={customWidgets}
                liveValidate={liveValidate}
                {...customTemplates}
                controlled
                ref={form}
                // formContext is available throughout the whole form, so passing this fn, so we can modify the isFormDirty variable
                formContext={{ setIsFormDirty: setIsArgoFormDirty }}
              />
            ) : null}
          </>
        ) : null}
      </Spinner>

      <StyledModal
        closable
        open={isConfirmModalVisible}
        onCancel={handleModalClose}
        onOk={handleModalConfirm}
      >
        <h3>You have unsaved changes</h3>
        <div>Are you sure you want to move away?</div>
      </StyledModal>
    </SectionWrapper>
  );
};

