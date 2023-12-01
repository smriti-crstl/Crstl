import { Affix } from "antd";
import clsx from "clsx";
import {
  useGetOnboardingSetupConfigQuery,
  useGetOnboardingSetupRequestQuery,
  usePostOnboardingRequestMutation,
} from "domain/interactors/setup";
import { useGetTradingPartners } from "domain/interactors/shared";
import { setNotification } from "domain/services/notification";
import { useRef, useState } from "react";

import { Spinner } from "components/atoms/loading";

import {
  ButtonsContainer,
  ContainerBordered,
  FormContainer,
  FormHeader,
  FormHeaderContainer,
  FormTitle,
  PageWrapper,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "../../../../edi-edit/EdiEditPage.styles";
import { EdiForm } from "../../../../edi-edit/EdiForm";
import { getTemplates } from "../../../../edi-edit/templates";
import { customWidgets } from "../../../../edi-edit/widgets";
import { StyledModal } from "../styles";

interface PublicProps {
  tradingPartnerId?: string;
  requestType?: string;
  onboardingTaskId?: string;
}

export const OnboardingRequestModal: React.FC<
  {
    isVisible: boolean;
    toggleModal: () => void;
  } & PublicProps
> = ({ isVisible, toggleModal, ...rest }) => (
  <StyledModal
    centered
    open={isVisible}
    onCancel={toggleModal}
    footer={null}
    width="70%"
  >
    <ModalBody {...rest} />
  </StyledModal>
);

const ModalBody: React.FC<PublicProps> = ({
  tradingPartnerId = "",
  requestType = "",
  onboardingTaskId = "",
}) => {
  const form = useRef<HTMLFormElement>(null);
  const customTemplates = getTemplates();
  const [liveValidate, setLiveValidate] = useState(false);
  const [isHeaderPinned, pinHeader] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingAsDraft, setIsSavingAsDraft] = useState(false);

  const {
    data: tradingPartners,
    isLoading: isTradingPartnersLoading,
  } = useGetTradingPartners();

  const { name: tradingPartnerName = "", flavor: tradingPartnerFlavor = "" } =
    tradingPartners?.data?.find(({ id }) => id === tradingPartnerId) ?? {};

  const {
    data: schema,
    isFetching: isFetchingSchemaData,
  } = useGetOnboardingSetupConfigQuery({
    tradingPartnerId,
    requestType,
  });

  const {
    data,
    isFetching: isFetchingFormData,
  } = useGetOnboardingSetupRequestQuery({
    tradingPartnerId,
    requestType,
  });

  const {
    mutate: mutateUploadForm,
    isLoading: isFetching,
  } = usePostOnboardingRequestMutation();

  const formSchema = schema?.data?.config?.formConfig?.schema ?? {};
  const onboardingConfigId = schema?.data?.config?.id ?? "";
  const formData = data?.data?.formData;
  const isSubmitted = data?.data?.isSubmitted;

  function resetButtons() {
    setIsSavingAsDraft(false);
    setIsSaving(false);
  }

  function triggerSubmit() {
    if (form.current?.formElement) {
      form.current?.formElement.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
      setLiveValidate(true);
    }
  }

  function submitForm(sendAfterSave = false) {
    const { formData } = (form.current as any).state;

    mutateUploadForm(
      {
        tradingPartnerId,
        onboardingConfigId,
        relatedOnboardingTaskId: onboardingTaskId,
        sendAfterSave,
        formData,
        requestType,
      },
      {
        onSuccess: (_) => {
          const description = sendAfterSave
            ? "Changes Saved"
            : "Draft saved successfully";

          setNotification({
            type: "success",
            description,
          });
        },
        onError: (error: any) => {
          const description =
            error?.response?.data?.data?.error ??
            "Something went wrong, please try again";

          setNotification({
            type: "error",
            description,
          });
        },
        onSettled: resetButtons,
      }
    );
  }

  const formTitle = `${
    tradingPartnerFlavor
      ? `${tradingPartnerName} - ${tradingPartnerFlavor}`
      : tradingPartnerName
  } ${requestType} Setup Form`;

  if (isFetchingSchemaData || isFetchingFormData || isTradingPartnersLoading) {
    return (
      <PageWrapper>
        <Spinner />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ContainerBordered>
        <FormContainer>
          <Affix
            offsetTop={0}
            onChange={(affixed) => {
              pinHeader(affixed ?? false);
            }}
            className={clsx({ "pinned-header": isHeaderPinned })}
          >
            <FormHeaderContainer>
              <FormHeader>
                <FormTitle title={formTitle}>{formTitle}</FormTitle>
                <ButtonsContainer>
                  <StyledSecondaryButton
                    disabled={isFetching || isSubmitted}
                    onClick={() => {
                      submitForm(false);
                      setIsSavingAsDraft(true);
                    }}
                    loading={isSavingAsDraft}
                  >
                    Save as Draft
                  </StyledSecondaryButton>
                  <StyledPrimaryButton
                    disabled={isFetching || isSubmitted}
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      triggerSubmit();
                    }}
                    loading={isSaving}
                  >
                    Submit
                  </StyledPrimaryButton>
                </ButtonsContainer>
              </FormHeader>
            </FormHeaderContainer>
          </Affix>
          <EdiForm
            disabled={isSubmitted}
            schema={formSchema}
            formData={formData}
            ref={form}
            widgets={customWidgets}
            liveValidate={liveValidate}
            onSubmit={(e) => {
              submitForm(true);
              setIsSaving(true);
            }}
            {...customTemplates}
          />
        </FormContainer>
      </ContainerBordered>
    </PageWrapper>
  );
};

