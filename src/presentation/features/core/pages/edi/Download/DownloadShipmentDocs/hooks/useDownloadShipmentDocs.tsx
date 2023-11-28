import { useGetShipmentDocsUrlsMultiple } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface State {
  asnIds: string[];
}

const initialState = {
  asnIds: [],
};

export const MAX_ALLOWED_ASN_IDS = 30;

const downloadFile = async (
  fileURL: string,
  setLoading: (isLoading: boolean) => void
) => {
  try {
    setLoading(true);

    const response = await fetch(fileURL);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = new URL(fileURL)?.pathname?.split("/")?.pop() ?? "file.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  } catch (error) {
    setNotification({
      type: "error",
      description: "Something went wrong while downloading a file",
    });
  } finally {
    setLoading(false);
  }
};

export const DownloadShipmentDocsContext = createContext<{
  downloadShipmentDocsState: State;
  setDownloadShipmentDocsState: Dispatch<SetStateAction<State>>;
  handleBulkDownload: () => void;
  isDownloadingShipmentDocs: boolean;
}>({
  downloadShipmentDocsState: initialState,
  setDownloadShipmentDocsState: () => undefined,
  handleBulkDownload: () => undefined,
  isDownloadingShipmentDocs: false,
});
DownloadShipmentDocsContext.displayName = "DownloadShipmentDocsContext";

export const DownloadShipmentDocsProvider = (props: any) => {
  const [downloadShipmentDocsState, setDownloadShipmentDocsState] = useState(
    initialState
  );

  const [isDownloadingBlob, setIsDownloadingBlob] = useState(false);

  const shipmentDocUrlsRes = useGetShipmentDocsUrlsMultiple({
    asnIds: downloadShipmentDocsState?.asnIds ?? [],
    onSuccess: async (data) => {
      if (!data?.data?.length) {
        return;
      }
      data?.data?.map(({ signed_url }: { signed_url: string }) =>
        downloadFile(signed_url, setIsDownloadingBlob)
      );
    },
  });
  const isFetchingDocUrls = shipmentDocUrlsRes?.some(
    (result) => result.isLoading
  );
  const isDownloadingShipmentDocs = useMemo(
    () => isDownloadingBlob || isFetchingDocUrls,
    [isDownloadingBlob, isFetchingDocUrls]
  );

  const handleBulkDownload = () => {
    if (isDownloadingBlob || isFetchingDocUrls) {
      return;
    }
    if (downloadShipmentDocsState?.asnIds?.length > MAX_ALLOWED_ASN_IDS) {
      setNotification({
        type: "error",
        description: `You can only download documents for up to ${MAX_ALLOWED_ASN_IDS} POs at a time. Please select fewer POs and try again.`,
      });
      return;
    }
    setNotification({
      type: "warning",
      description:
        "This may take a while. Please allow downloading multiple files in your browser settings.",
      duration: 0,
    });
    shipmentDocUrlsRes?.forEach(({ refetch }) => refetch());
  };

  const value = useMemo(
    () => ({
      downloadShipmentDocsState,
      setDownloadShipmentDocsState,
      handleBulkDownload,
      isDownloadingShipmentDocs,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      setDownloadShipmentDocsState,
      downloadShipmentDocsState,
      isDownloadingShipmentDocs,
    ]
  );

  return <DownloadShipmentDocsContext.Provider value={value} {...props} />;
};

export const useDownloadShipmentDocs = () => {
  const context = useContext(DownloadShipmentDocsContext);

  if (!context) {
    throw new Error(
      "useDownloadShipmentDocs must be used within a DownloadShipmentDocsProvider"
    );
  }

  return context;
};

