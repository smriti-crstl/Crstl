import { AxiosError } from "axios";
import {
  CreateCommentReq,
  DeleteCommentReq,
  DeleteCommentRes,
  GetCommentsRes,
  OrdersSummaryRes,
  OrganizationConfigModelRes,
  PurchaseOrderResTransformed,
  TransformedChannels,
  UpdateConfigurableChipsQueryReq,
  UpdateConfigurableChipsRes,
  ShopifyOrdersCountRes,
} from "domain/entity/orders/models";
import {
  changeChipStatus,
  createComment,
  deleteComment,
  getChannels,
  getComments,
  getOrdersSummary,
  getOrganizationConfig,
  getSinglePurchaseOrderDetails,
  getShopifyCount,
} from "domain/entity/orders/repositories";
import { StatusLabelFE } from "domain/entity/shared/models";
import { setMessage, setNotification } from "domain/services/notification";
import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

const getChipStatusMappings = (
  label: StatusLabelFE
): keyof OrdersSummaryRes | undefined => {
  switch (true) {
    case label === "orderStatus":
      return "status";
    case label === "paymentStatus":
      return "paymentStatus";
    case label === "fulfillmentStatus":
      return "fulfillmentStatus";
    case label === "deliveryStatus":
      return "deliveryStatus";
    case label === "invoiceStatus":
      return "invoiceStatus";
    case label === "chargebackStatus":
      return "chargebackStatus";
  }
  return undefined;
};

const ORDERS_QUERY_KEYS = {
  GET_CHANNELS: "GET_CHANNELS",
  GET_ORDERS: "GET_ORDERS",
  GET_ORGANIZATION_CONFIG: "GET_ORGANIZATION_CONFIG",
  GET_PURCHASE_ORDER_DETAILS: "GET_PURCHASE_ORDER_DETAILS",
  GET_COMMENTS: "GET_COMMENTS",
  GET_SHOPIFY_COUNT: "GET_SHOPIFY_COUNT",
};

const useChannelsQuery = (): QueryObserverResult<
  TransformedChannels,
  AxiosError
> => {
  return useQuery<TransformedChannels, AxiosError>(
    ORDERS_QUERY_KEYS.GET_CHANNELS,
    getChannels
  );
};

const useOrdersSummaryQuery = <TData = OrdersSummaryRes[]>(
  orgId: string,
  includeShopify: string,
  includeAmazon: string,
  includeB2B: string,
  options?: UseQueryOptions<OrdersSummaryRes[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [
      ORDERS_QUERY_KEYS.GET_ORDERS,
      orgId,
      includeShopify,
      includeAmazon,
      includeB2B,
    ],
    getOrdersSummary,
    options
  );
};

const useShopifyOrdersCount = <TData = ShopifyOrdersCountRes>(
  orgId: string,
  options?: UseQueryOptions<ShopifyOrdersCountRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ORDERS_QUERY_KEYS.GET_SHOPIFY_COUNT, orgId],
    getShopifyCount,
    options
  );
};

const useOrganizationConfigQuery = <TData = OrganizationConfigModelRes>(
  options?: UseQueryOptions<OrganizationConfigModelRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ORDERS_QUERY_KEYS.GET_ORGANIZATION_CONFIG],
    getOrganizationConfig,
    options
  );
};

const usePurchaseOrderDetailsQuery = <TData = PurchaseOrderResTransformed>(
  poId: string,
  options?: UseQueryOptions<PurchaseOrderResTransformed, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ORDERS_QUERY_KEYS.GET_PURCHASE_ORDER_DETAILS, poId],
    getSinglePurchaseOrderDetails,
    options
  );
};

const useCreateCommentQuery = (
  poId: string,
  options?: UseMutationOptions<GetCommentsRes, AxiosError, CreateCommentReq>
): UseMutationResult<
  GetCommentsRes,
  AxiosError,
  CreateCommentReq,
  GetCommentsRes[]
> => {
  const queryClient = useQueryClient();

  return useMutation<
    GetCommentsRes,
    AxiosError,
    CreateCommentReq,
    GetCommentsRes[]
  >(createComment, {
    onSuccess: (data, ...args) => {
      if (options && options.onSuccess) {
        options?.onSuccess(data, ...args);
      }

      // TODO: Fire Notification
      // TODO: Test if comment is appending correctly

      // setMessage({
      //   type: "success",
      //   content: data.,
      // });

      // Snapshot the previous value
      // const previousComments = queryClient.getQueryData<GetCommentsRes[]>([
      //   ORDERS_QUERY_KEYS.GET_COMMENTS,
      //   poId,
      // ]);

      // if (previousComments) {
      //   queryClient.setQueryData<GetCommentsRes[]>(
      //     [ORDERS_QUERY_KEYS.GET_COMMENTS, poId],
      //     [data, ...previousComments]
      //   );
      // }
    },
    onSettled: () => {
      // Refetch comments
      queryClient.invalidateQueries([ORDERS_QUERY_KEYS.GET_COMMENTS, poId]);
    },
  });
};

const useGetCommentsQuery = <TData = GetCommentsRes[]>(
  poId: string,
  options?: UseQueryOptions<GetCommentsRes[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery([ORDERS_QUERY_KEYS.GET_COMMENTS, poId], getComments, options);
};

const useDeleteCommentsQuery = (
  poId: string,
  options?: UseMutationOptions<DeleteCommentRes, AxiosError, DeleteCommentReq>
): UseMutationResult<
  DeleteCommentRes,
  AxiosError,
  DeleteCommentReq,
  GetCommentsRes[]
> => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteCommentRes,
    AxiosError,
    DeleteCommentReq,
    GetCommentsRes[]
  >(deleteComment, {
    onMutate: async (data, ...args) => {
      if (options && options.onMutate) {
        options.onMutate(data, ...args);
      }
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([ORDERS_QUERY_KEYS.GET_COMMENTS, poId]);

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData<GetCommentsRes[]>([
        ORDERS_QUERY_KEYS.GET_COMMENTS,
        poId,
      ]);

      // Optimistically update to the new value

      if (previousComments) {
        queryClient.setQueryData<GetCommentsRes[]>(
          [ORDERS_QUERY_KEYS.GET_COMMENTS, poId],
          [...previousComments.filter((item) => item.id !== data.commentId)]
        );
      }
      // Returning context value
      // Important to maintain the type of return data, it should be equal to return type of context
      return previousComments || [];
    },
    onSuccess: (data) => {
      setMessage({
        type: "success",
        content: data.message,
      });
    },
    onError: (err, _variables, context) => {
      // Here context represents previous comments
      if (context) {
        queryClient.setQueryData<GetCommentsRes[]>(
          [ORDERS_QUERY_KEYS.GET_COMMENTS, poId],
          context
        );
      }
      setNotification({
        type: "error",
        moduleName: err.response?.data.general,
        description: err.response?.data.message,
      });
    },
    onSettled: (...args) => {
      if (options && options.onSettled) {
        options?.onSettled(...args);
      }
      // Refetch comments
      queryClient.invalidateQueries([ORDERS_QUERY_KEYS.GET_COMMENTS, poId]);
    },
  });
};

// changeChipStatus

const useChangeChipStatusQuery = (
  ordId: string,
  _options?: UseMutationOptions<
    UpdateConfigurableChipsRes,
    AxiosError,
    UpdateConfigurableChipsQueryReq
  >
): UseMutationResult<
  UpdateConfigurableChipsRes,
  AxiosError,
  UpdateConfigurableChipsQueryReq,
  OrdersSummaryRes[]
> => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateConfigurableChipsRes,
    AxiosError,
    UpdateConfigurableChipsQueryReq,
    OrdersSummaryRes[]
  >(changeChipStatus, {
    onMutate: async (data) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([ORDERS_QUERY_KEYS.GET_ORDERS, ordId]);

      // Snapshot the previous value
      const previousOrders = queryClient.getQueryData<OrdersSummaryRes[]>([
        ORDERS_QUERY_KEYS.GET_ORDERS,
        ordId,
      ]);

      // Optimistically update to the new value
      if (previousOrders) {
        queryClient.setQueryData<OrdersSummaryRes[]>(
          [ORDERS_QUERY_KEYS.GET_ORDERS, ordId],
          [
            ...previousOrders.map((item) => {
              const statusKey = getChipStatusMappings(data.label);
              if (item.id === data.poId && statusKey) {
                const value = data.value;
                return {
                  ...item,
                  [statusKey]: value,
                };
              } else {
                return item;
              }
            }),
          ]
        );
      }
      // Returning context value
      // Important to maintain the type of return data, it should be equal to return type of context
      return previousOrders || [];
    },
    // onSuccess: (data) => {
    //   setMessage({
    //     type: "success",
    //     content: data.message,
    //   });
    // },
    onError: (err, _variables, context) => {
      // Here context represents previous comments
      if (context) {
        queryClient.setQueryData<OrdersSummaryRes[]>(
          [ORDERS_QUERY_KEYS.GET_ORDERS, ordId],
          context
        );
      }
      setNotification({
        type: "error",
        moduleName: err.response?.data.general,
        description: err.response?.data.message,
      });
    },
    // onSettled: (...args) => {
    //   if (options && options.onSettled) {
    //     options?.onSettled(...args);
    //   }
    //   // Refetch comments
    //   queryClient.invalidateQueries([ORDERS_QUERY_KEYS.CHAN, poId]);
    // },
  });
};

export {
  useChannelsQuery,
  useOrdersSummaryQuery,
  useOrganizationConfigQuery,
  usePurchaseOrderDetailsQuery,
  useCreateCommentQuery,
  useGetCommentsQuery,
  useDeleteCommentsQuery,
  useChangeChipStatusQuery,
  useShopifyOrdersCount,
};
