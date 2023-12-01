import { Button, Steps, StepsProps } from "antd";
import {
  useGetWorkflowQuery,
  usePostAutofillQuery,
  usePutUpdateOrderState,
} from "domain/interactors/edi";
import { CORE_EDI } from "globals/configs";
import { COLORS } from "globals/themes/default/colors";
import { useSearchParams } from "presentation/hooks/common";
import { amplitude } from "presentation/utils";
import { useEffect, useState, useRef } from "react";
import { useQueryClient } from "react-query";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  DocumentTitle,
  EdiWorkflowStep,
} from "models/v1/edi/EdiDocuments";
import { Spinner } from "components/atoms/loading";
import { Chip } from "components/molecules/order-chips/Chip";

import {
  getButtonStyles,
  getChipStyles,
  getDocumentTypeFromSlug,
  getSourceDocumentTypeFromSlug,
} from "./helpers";
import { CopyOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import {
  ActionWrapper,
  BorderContainer,
  Container,
  CustomDotStyle,
  PageWrapper,
  StepIcon,
  StepsStyles,
  StepTitle,
  POBox,
} from "./styles";
import { WorkflowStepIcon } from "./WorkflowStepIcon";

export const SOURCE_DOC_TYPE_PARAM = "source-document-type";

export const EdiStepsSection = () => {
  const [loadingId, setLoading] = useState<string | null>(null);
  const [loader, showLoader] = useState<boolean>(false);

  const history = useHistory();
  const location = useLocation();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { documentType: documentTypeSlug, orderId } = useParams<{
    orderId: string;
    documentType: string;
  }>();

  const sourceDocumentType =
    searchParams.get(SOURCE_DOC_TYPE_PARAM) ??
    getSourceDocumentTypeFromSlug(documentTypeSlug);

  const {
    data: workflowData,
    isFetching,
    refetch: refetchWorkFlow,
  } = useGetWorkflowQuery({
    orderId,
    documentType: sourceDocumentType,
  });

  const { mutate: autoFillDocument } = usePostAutofillQuery();
  const { mutate: updateOrderState } = usePutUpdateOrderState();

  useEffect(() => {
    if (workflowData?.data?.length) {
      const purchaseOrder = workflowData?.data?.find(
        (step) =>
          step.slug === "purchase-order" ||
          step.slug === "grocery-purchase-order"
      );
      if (purchaseOrder?.state === "New") {
        showLoader(true);
        updateOrderState(
          {
            orderId: purchaseOrder?.id ?? "",
            stateType: "state",
            newValue: "Open",
            documentType: getDocumentTypeFromSlug(purchaseOrder.slug),
          },
          {
            onSuccess: async () => {
              await refetchWorkFlow();
            },
            onSettled: () => showLoader(false),
          }
        );
      }
    }
  }, [workflowData]);
  const ref = useRef(null);

  useEffect(() => {
    // TODO: remove the logic of refreshWorkflow from all the pages where a redirect is happening
    // TODO: replace it with the `refetch` of `useGetWorkflowQuery`
    if (searchParams.get("refreshWorkflow") === "true") {
      searchParams.delete("refreshWorkflow");
      const search = searchParams.toString();
      history.replace(`${location.pathname}?${search}`);
      refetchWorkFlow();
    }
  }, [searchParams]);

  const handleButtonOnClick = async ({
    disabled,
    type,
    slug,
    id,
    title,
    documentType,
  }: EdiWorkflowStep) => {
    if (disabled) {
      return;
    }

    const tabName = type === "chip" ? "view" : "edit";
    const pathParams = {
      orderId,
      documentType: slug,
      tabName,
    };

    // TODO: remove this logic once the BE is updated
    searchParams.set(SOURCE_DOC_TYPE_PARAM, sourceDocumentType);
    const search = searchParams.toString();

    if (id) {
      const _path = generatePath(CORE_EDI, {
        id,
        ...pathParams,
      });
      history.replace(`${_path}?${search}`);
      await refetchWorkFlow();
    } else {
      setLoading(title);
      const sourceDocumentType = workflowData?.data?.[0].documentType ?? "850"; // setting default as 850 for fallback

      autoFillDocument(
        {
          sourceDocumentId: orderId,
          sourceDocumentType,
          targetDocumentType: documentType,
        },
        {
          onSuccess: (data) => {
            const _path = generatePath(CORE_EDI, {
              id: data.data.documentId ?? 0,
              ...pathParams,
            });
            history.replace(`${_path}?${search}`);
            queryClient.invalidateQueries();
          },
          onSettled: () => setLoading(null),
        }
      );
    }
  };

  const slugIndex =
    workflowData?.data?.map(({ slug }) => slug).indexOf(documentTypeSlug) ?? 0;
  const current = slugIndex > -1 ? slugIndex : 0;

  const customDot: StepsProps["progressDot"] = (
    _: any,
    { index, title }: any
  ) => (
    <CustomDotStyle
      futureState={index > current}
      disabled={title.props.disabled}
    >
      <BorderContainer selected={index === current}>
        <WorkflowStepIcon
          stepTitle={(workflowData?.data?.[index].title ?? "") as DocumentTitle}
        />
      </BorderContainer>
    </CustomDotStyle>
  );

  if (!isFetching && !loader && workflowData?.data?.length === 0) {
    return null;
  }

  const poNumber = workflowData?.data?.[0]?.subTitle;

  const renderPONumber = () => {
    if (isFetching || loader) {
      return null;
    }
    if (poNumber) {
      return (
        <POBox>
          <div> PO Number: </div>
          <Paragraph
            copyable
            tooltip={"Copy PO Number"}
            icon={<CopyOutlined />}
            strong
            style={{ margin: 0 }}
          >
            {poNumber}
          </Paragraph>
        </POBox>
      );
    }
    return null;
  };
  return (
    <PageWrapper>
      <Container>
        {renderPONumber()}
        <StepsStyles>
          {!isFetching && !loader ? (
            <Steps
              progressDot={customDot}
              current={current}
              labelPlacement="vertical"
            >
              {workflowData?.data?.map((item: EdiWorkflowStep) => {
                return (
                  <Steps.Step
                    key={item.title}
                    disabled={item.disabled}
                    icon={
                      <StepIcon selected={documentTypeSlug === item.slug}>
                        <WorkflowStepIcon stepTitle={item.title} />
                      </StepIcon>
                    }
                    title={
                      <StepTitle
                        strong={documentTypeSlug === item.slug}
                        disabled={item.disabled}
                      >
                        {item.title}
                      </StepTitle>
                    }
                    description={
                      <ActionWrapper>
                        {item.type === "chip" ? (
                          <Chip
                            onClick={() => handleButtonOnClick(item)}
                            value={item.label}
                            textColor={
                              item.disabled
                                ? COLORS.SILVER_FOIL
                                : item.color?.textColor
                            }
                            hideDropdown
                            chipStyles={getChipStyles(item)}
                            underline={!item.disabled}
                            showTick={item?.color?.showTick}
                          />
                        ) : (
                          <Button
                            loading={loadingId === item.title}
                            onClick={() => {
                              amplitude.logClickEvent(
                                `EDI Step: ${item.title}`
                              );
                              handleButtonOnClick(item);
                            }}
                            disabled={item.disabled}
                            style={getButtonStyles(item)}
                          >
                            {item.label || ""}
                          </Button>
                        )}
                      </ActionWrapper>
                    }
                  />
                );
              })}
            </Steps>
          ) : (
            <Spinner />
          )}
        </StepsStyles>
      </Container>
    </PageWrapper>
  );
};
