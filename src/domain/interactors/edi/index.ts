import { AxiosError } from "axios";
import {
  AddEdiCommentReq,
  AddEdiCommentRes,
  GetAppMarketplaceTokenRes,
  PostAutoFillReq,
  PostAutoFillRes,
  PostPOChangeStateReq,
  PostPOChangeStateRes,
  PutUpdateOrderStateReq,
  PutUpdateOrderStateRes,
  SaveCustomSortReq,
  SaveCustomSortRes,
  ShippingLabelModel,
} from "domain/entity/edi/models";
import {
  ShipmentDocsUrlRes,
  ShipmentDocUrlParams,
  CarrierDocsUrlReq,
  CarrierDocsUrlRes,
} from "domain/entity/edi/models/v2";
import {
  createEdiComment,
  deleteEdiComment,
  getAdditionalASNData,
  getAppMarketplaceToken,
  getAssociatedPOChangeDocs,
  getEdiComments,
  getEdiEventLogCSV,
  getEdiOrdersCSV,
  getEdiSearchCSV,
  getEventLog,
  getInvoiceAdditionalData,
  getListDocumentSchema,
  getOrdersSummaryCount,
  getPOVersions,
  getPurchaseOrderErrors,
  getShippingLabels,
  getWorkflow,
  listDocumentById,
  postAutofill,
  postPOChangeState,
  putUpdateOrderStatus,
  resetDocument,
  saveCustomSortOrder,
  searchOrders,
  updateDocument810,
  updateDocument855,
  updateDocument856,
  updateDocumentGeneric,
  updateDocumentRTS,
} from "domain/entity/edi/repositories";
import {
  postCarrierDocsUrls,
  getShipmentDocsUrls,
  getCarrierDocsUrls,
} from "domain/entity/edi/repositories/v2";
import {
  DeleteCommentReq,
  DeleteCommentRes,
} from "domain/entity/orders/models";
import { ShipNoticeSortByOption } from "presentation/features/core/pages/edi-shipment/sub-components/ShipNoticeConfig";
import { TableConfig } from "presentation/features/core/pages/edi/event-log/types";
import {
  QueryObserverResult,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

import {
  DocumentUpdatedResponseModel,
  UpdateDocumentInput,
} from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";

const EDI_QUERY_KEYS = {
  LIST_DOCUMENT: "LIST_DOCUMENT",
  SEARCH_ORDERS: "SEARCH_ORDERS",
  SEARCH_ORDER_SUMMARY_COUNT: "SEARCH_ORDER_SUMMARY_COUNT",
  POST_AUTOFILL: "POST_AUTOFILL",
  GET_COMMENTS: "GET_COMMENTS",
  GET_INVOICE_ADDITIONAL_DATA: "GET_INVOICE_ADDITIONAL_DATA",
  GET_ASSOCIATED_PO_CHANGE_DOCS: "GET_ASSOCIATED_PO_CHANGE_DOCS",
  GET_PO_VERSIONS: "GET_PO_VERSIONS",
  GET_SHIPPING_LABELS: "GET_SHIPPING_LABELS",
  GET_SHIPPING_LABEL_URLS: "GET_SHIPPING_LABEL_URLS",
  GET_SHIPPING_LABEL_URLS_MULTIPLE: "GET_SHIPPING_LABEL_URLS_MULTIPLE",
  DOWNLOAD_SHIPPING_LABELS: "DOWNLOAD_SHIPPING_LABELS",
  LIST_DOCUMENT_SCHEMA: "LIST_DOCUMENT_SCHEMA",
  GET_EVENT_LOG: "GET_EVENT_LOG",
  GET_EVENT_LOG_EXPORT: "GET_EVENT_LOG_EXPORT",
  GET_SEARCH_EXPORT: "GET_SEARCH_EXPORT",
  GET_WORKFLOW: "GET_WORKFLOW",
  GET_APP_MARKETPLACE_TOKEN: "GET_APP_MARKETPLACE_TOKEN",
  GET_CARRIER_DOCS_URLS: "GET_CARRIER_DOCS_URLS",
};

const useListDocumentQuery = (
  documentType: string,
  id: string,
  edit?: string,
  version?: string,
  options?: UseQueryOptions
) => {
  return useQuery(
    [EDI_QUERY_KEYS.LIST_DOCUMENT, documentType, id, edit, version],
    listDocumentById,
    options
  );
};

const useGetListDocumentSchema = (
  documentType: string,
  documentId?: string,
  tradingPartnerId?: string
) => {
  return useQuery(
    [
      EDI_QUERY_KEYS.LIST_DOCUMENT_SCHEMA,
      documentType,
      documentId,
      tradingPartnerId,
    ],
    getListDocumentSchema
  );
};

const useGetInvoiceAdditionalData = (id: string, options?: UseQueryOptions) => {
  return useQuery(
    [EDI_QUERY_KEYS.GET_INVOICE_ADDITIONAL_DATA, id],
    getInvoiceAdditionalData,
    options
  );
};

const useUpdateDocument856 = () => {
  const queryClient = useQueryClient();
  // useMutation(updateDocument856);
  const mutationResult = useMutation(updateDocument856, {
    onSuccess: () => {
      queryClient.invalidateQueries(EDI_QUERY_KEYS.LIST_DOCUMENT);
    },
  });

  return mutationResult;
};

const useUpdateDocument810 = () => {
  const queryClient = useQueryClient();
  const mutationResult = useMutation(updateDocument810, {
    onSuccess: () => {
      queryClient.invalidateQueries(EDI_QUERY_KEYS.LIST_DOCUMENT);
    },
  });
  return mutationResult;
};

const useUpdateDocument = (id: string) => {
  const mutation =
    id === "856"
      ? updateDocument856
      : id === "810"
      ? updateDocument810
      : id === "855"
      ? updateDocument855
      : id === "RTS"
      ? updateDocumentRTS
      : updateDocumentGeneric;
  const queryClient = useQueryClient();
  const mutationResult = useMutation<
    DocumentUpdatedResponseModel | undefined,
    DocumentUpdatedResponseModel,
    UpdateDocumentInput
  >(mutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(EDI_QUERY_KEYS.LIST_DOCUMENT);
    },
  });
  return mutationResult;
};

const useSearchOrdersQuery = (
  pageNumber?: number,
  pageSize?: number,
  direction?: string,
  orderState?: string,
  asnState?: string,
  deliveryState?: string,
  paymentState?: string,
  chargebackState?: string
) => {
  return useQuery(
    [
      EDI_QUERY_KEYS.SEARCH_ORDERS,
      pageNumber,
      pageSize,
      direction,
      orderState,
      asnState,
      deliveryState,
      paymentState,
      chargebackState,
    ],
    searchOrders
  );
};

const useGetPurchaseOrderErrorsQuery = (
  pageNo?: number,
  direction?: string
) => {
  return useQuery([pageNo, direction], getPurchaseOrderErrors);
};

// TODO: remove reliance on documentType once BE is updated
const useGetWorkflowQuery = ({
  orderId,
  documentType,
}: {
  orderId: string;
  documentType?: string;
}) => {
  return useQuery(
    [EDI_QUERY_KEYS.GET_WORKFLOW, orderId, documentType],
    getWorkflow
  );
};

const useGetEDIOrdersCSV = (ids: string, options?: UseQueryOptions) => {
  return useQuery(ids, getEdiOrdersCSV, options);
};

const useGetEDIEventLogCSV = (
  ids: string,
  config?: TableConfig,
  options?: UseQueryOptions
) => {
  return useQuery(
    [EDI_QUERY_KEYS.GET_EVENT_LOG_EXPORT, ids, config],
    getEdiEventLogCSV,
    options
  );
};

const useGetEDISearchCSV = (
  ids: string,
  config?: TableConfig,
  options?: UseQueryOptions
) => {
  return useQuery(
    [EDI_QUERY_KEYS.GET_SEARCH_EXPORT, ids, config],
    getEdiSearchCSV,
    options
  );
};

const useGetEdiCommentsQuery = (id: string) => {
  return useQuery([EDI_QUERY_KEYS.GET_COMMENTS, id], getEdiComments);
};

const usePostAutofillQuery = (): UseMutationResult<
  PostAutoFillRes,
  AxiosError,
  PostAutoFillReq
> => {
  return useMutation<PostAutoFillRes, AxiosError, PostAutoFillReq>(
    postAutofill
  );
};

const useGetOrdersSummaryCountQuery = () => {
  return useQuery(
    EDI_QUERY_KEYS.SEARCH_ORDER_SUMMARY_COUNT,
    getOrdersSummaryCount
  );
};

const useGetAdditionalASNDataQuery = (
  id: string,
  options?: UseQueryOptions
) => {
  return useQuery([id], getAdditionalASNData, options);
};

const usePutUpdateOrderState = (): UseMutationResult<
  PutUpdateOrderStateRes,
  AxiosError,
  PutUpdateOrderStateReq
> => {
  const queryClient = useQueryClient();

  return useMutation<
    PutUpdateOrderStateRes,
    AxiosError,
    PutUpdateOrderStateReq
  >(putUpdateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

const useDeleteEdiComment = (
  commentId: string,
  options?: UseMutationOptions<DeleteCommentRes, AxiosError, DeleteCommentReq>
): UseMutationResult<DeleteCommentRes, AxiosError, DeleteCommentReq> => {
  const queryClient = useQueryClient();

  return useMutation<DeleteCommentRes, AxiosError, DeleteCommentReq>(
    deleteEdiComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
};

const useCreateEdiCommentQuery = (): UseMutationResult<
  AddEdiCommentRes,
  AxiosError,
  AddEdiCommentReq
> => {
  const queryClient = useQueryClient();

  return useMutation<AddEdiCommentRes, AxiosError, AddEdiCommentReq>(
    createEdiComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      // onSettled: () => {
      //   // Refetch comments
      //   queryClient.invalidateQueries([ORDERS_QUERY_KEYS.GET_COMMENTS, poId]);
      // }
    }
  );
};

const useGetAssociatedPOChangeDocsQuery = (
  id: string,
  sourceDocumentType?: string
) => {
  return useQuery(
    [EDI_QUERY_KEYS.GET_ASSOCIATED_PO_CHANGE_DOCS, id, sourceDocumentType],
    getAssociatedPOChangeDocs
  );
};

const usePostPOChangeState = (): UseMutationResult<
  PostPOChangeStateRes,
  AxiosError,
  PostPOChangeStateReq
> => {
  const queryClient = useQueryClient();

  return useMutation<PostPOChangeStateRes, AxiosError, PostPOChangeStateReq>(
    postPOChangeState,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
};

const useGetPOVersions = (orderId: string, sourceDocumentType: string) => {
  return useQuery(
    [EDI_QUERY_KEYS.GET_PO_VERSIONS, orderId, sourceDocumentType],
    getPOVersions
  );
};

const useGetShippingLabels = (
  poId: string,
  sortBy: ShipNoticeSortByOption,
  options?: UseInfiniteQueryOptions<ShippingLabelModel, AxiosError>
) => {
  return useInfiniteQuery(
    [EDI_QUERY_KEYS.GET_SHIPPING_LABELS, poId, sortBy],
    getShippingLabels,
    {
      getNextPageParam: (lastPage) => lastPage.data?.page,
      ...options,
    }
  );
};

export const useGetShipmentDocsUrls = <TData = ShipmentDocsUrlRes>({
  params,
  options,
}: {
  params: ShipmentDocUrlParams;
  options?: UseQueryOptions<ShipmentDocsUrlRes, AxiosError, TData>;
}) => {
  return useQuery<ShipmentDocsUrlRes, AxiosError, TData>(
    [EDI_QUERY_KEYS.GET_SHIPPING_LABEL_URLS, params],
    getShipmentDocsUrls,
    options
  );
};

export const useGetCarrierDocsUrls = <TData = CarrierDocsUrlRes>(
  params: CarrierDocsUrlReq,
  options?: UseQueryOptions<CarrierDocsUrlRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery([EDI_QUERY_KEYS.GET_CARRIER_DOCS_URLS, params], () =>
    getCarrierDocsUrls(params)
  );
};

export const useGetShipmentDocsUrlsMultiple = ({
  asnIds,
  onSuccess,
}: {
  asnIds: string[];
  onSuccess: (data: any) => void;
}) => {
  return useQueries(
    asnIds?.map((asn_id) => {
      const params: ShipmentDocUrlParams = {
        asn_id,
        sort_by: ShipNoticeSortByOption.UPC,
        regenerate: false,
      };

      return {
        queryKey: [EDI_QUERY_KEYS.GET_SHIPPING_LABEL_URLS_MULTIPLE, params],
        queryFn: getShipmentDocsUrls,
        enabled: false,
        onSuccess,
      };
    })
  );
};

const useDownloadShippingLabels = (
  poId: string,
  sortBy: ShipNoticeSortByOption,
  options?: UseInfiniteQueryOptions<ShippingLabelModel, AxiosError>
) => {
  return useInfiniteQuery(
    [EDI_QUERY_KEYS.DOWNLOAD_SHIPPING_LABELS, poId, sortBy],
    getShippingLabels,
    {
      getNextPageParam: (lastPage) => lastPage.data?.page,
      ...options,
    }
  );
};

const useResetDocument = () => {
  const queryClient = useQueryClient();
  const mutationResult = useMutation(resetDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(EDI_QUERY_KEYS.LIST_DOCUMENT);
    },
  });

  return mutationResult;
};

const useGetEventLogQuery = (config: TableConfig) => {
  return useQuery([EDI_QUERY_KEYS.GET_EVENT_LOG, config], getEventLog);
};

const useSaveCustomSortOrderMutation = (): UseMutationResult<
  SaveCustomSortRes,
  AxiosError,
  SaveCustomSortReq
> => {
  return useMutation<SaveCustomSortRes, AxiosError, SaveCustomSortReq>(
    saveCustomSortOrder
  );
};

const useGetAppMarketplaceTokenQuery = <TData = GetAppMarketplaceTokenRes>(
  options?: UseQueryOptions<GetAppMarketplaceTokenRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [EDI_QUERY_KEYS.GET_APP_MARKETPLACE_TOKEN],
    getAppMarketplaceToken,
    options
  );
};

export {
  EDI_QUERY_KEYS,
  useListDocumentQuery,
  useUpdateDocument856,
  useSearchOrdersQuery,
  useGetWorkflowQuery,
  useUpdateDocument810,
  usePostAutofillQuery,
  useGetOrdersSummaryCountQuery,
  useGetAdditionalASNDataQuery,
  usePutUpdateOrderState,
  useCreateEdiCommentQuery,
  useGetEdiCommentsQuery,
  useGetInvoiceAdditionalData,
  useDeleteEdiComment,
  useGetPurchaseOrderErrorsQuery,
  useGetAssociatedPOChangeDocsQuery,
  usePostPOChangeState,
  useGetPOVersions,
  useGetShippingLabels,
  useDownloadShippingLabels,
  useGetListDocumentSchema,
  useGetEDIOrdersCSV,
  useGetEDIEventLogCSV,
  useGetEDISearchCSV,
  useResetDocument,
  useUpdateDocument,
  useGetEventLogQuery,
  useSaveCustomSortOrderMutation,
  useGetAppMarketplaceTokenQuery,
};

