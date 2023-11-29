import { Popover, Radio, RadioChangeEvent, Tooltip } from "antd";
import { EDI_QUERY_KEYS, useGetShipmentDocsUrls } from "domain/interactors/edi";
import { isEqual } from "lodash";
import { DocumentViewer } from "presentation/features/common/components/DocumentViewer";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";

import { SettingOutlined } from "@ant-design/icons";
import { Spinner } from "@crstl/components/atoms/loading";
import { Modal } from "@crstl/components/atoms/modal";

import { StyledSecondaryButton } from "../../../edi-edit/EdiEditPage.styles";
import { createTitle } from "../../../edi/edi.utils";
import ShipNoticeConfig, {
  ShipNoticeSortByOption,
  SortConfig,
} from "../ShipNoticeConfig";
import {
  getShipmentDocsSortConfigFromLocalStorage,
  setShipmentDocsSortConfigInLocalStorage,
} from "./utils";

interface PublicProps {
  asnId: string;
  visible: boolean;
  toggle: () => void;
}

const viewerHeight = "65vh";

const ViewerContainer = styled.div`
  height: ${viewerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const ShipmentDocumentsModalDefault: React.FC<PublicProps> = ({
  asnId,
  visible,
  toggle,
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>();
  const [currentDocument, setCurrentDocument] = useState<string>();
  const [sortBy, setSortBy] = useState<ShipNoticeSortByOption>(() => {
    const config = getShipmentDocsSortConfigFromLocalStorage();
    return config?.sortKey || ShipNoticeSortByOption.UPC;
  });
  const [isConfigPopoverVisible, setIsConfigPopoverVisible] = useState<boolean>(
    false
  );
  const [regenerate, setRegenerate] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const queryParams = useMemo(
    () => ({
      asn_id: asnId,
      sort_by: sortBy,
      regenerate,
    }),
    [asnId, sortBy, regenerate]
  );

  const {
    data: shipmentDocs,
    isFetching,
    isFetched,
    refetch,
    isError,
  } = useGetShipmentDocsUrls({
    params: queryParams,
    options: {
      enabled: false,
      select: ({ data }) => data,
      onSuccess: (data) => {
        if (!data?.length) {
          return;
        }
        setCurrentUrl(data?.[0].signed_url);
        setCurrentDocument(data?.[0].label_type);
        if (regenerate) {
          // !! NOTE: this is to avoid an extra api call with regenerate=false right after regenerate=true
          queryClient.setQueryData(
            [
              EDI_QUERY_KEYS.GET_SHIPPING_LABEL_URLS,
              { ...queryParams, regenerate: false },
            ],
            { data }
          );
        }
        setRegenerate(false);
      },
    },
  });

  useEffect(() => {
    if (visible) {
      refetch();
    }
  }, [visible]);

  useEffect(() => {
    if (regenerate) {
      refetch();
    }
  }, [regenerate]);

  const documentList = useMemo(() => {
    if (!shipmentDocs?.length) {
      return [];
    }
    return shipmentDocs.map((doc) => ({
      value: doc.label_type,
      label: createTitle(doc.label_type),
    }));
  }, [shipmentDocs]);

  const handleDocumentChange = (e: RadioChangeEvent) => {
    const doc = shipmentDocs?.find((doc) => doc.label_type === e.target.value);
    setCurrentUrl(doc?.signed_url);
    setCurrentDocument(doc?.label_type);
  };

  const handleConfigChange = async (config: SortConfig) => {
    const toRegenerate = !isEqual(
      config,
      getShipmentDocsSortConfigFromLocalStorage()
    );
    setRegenerate(toRegenerate);
    setSortBy(config?.sortKey);
    setShipmentDocsSortConfigInLocalStorage(config);
    setIsConfigPopoverVisible(false);
  };

  return (
    <Modal
      style={{ top: "5vh" }}
      open={visible}
      width="70%"
      onCancel={toggle}
      title="Shipment Documents"
      footer={null}
    >
      <Spinner
        spinning={isFetching}
        tip="Generating documents. This may take a while."
      >
        {isFetched && !!shipmentDocs?.length && (
          <>
            <Radio.Group
              value={currentDocument}
              options={documentList}
              optionType="button"
              onChange={handleDocumentChange}
              style={{ marginRight: 8 }}
            />
            <Popover
              content={() => (
                <>
                  <ShipNoticeConfig onApplyChanges={handleConfigChange} />
                </>
              )}
              title="Configuration"
              trigger="click"
              visible={isConfigPopoverVisible}
              onVisibleChange={setIsConfigPopoverVisible}
            >
              <Tooltip title="Configuration">
                <StyledSecondaryButton
                  onClick={() => setIsConfigPopoverVisible(true)}
                >
                  <SettingOutlined />
                </StyledSecondaryButton>
              </Tooltip>
            </Popover>
          </>
        )}
        <ViewerContainer>
          {isError && (
            <div>
              <h3>Something went wrong. Please try again later.</h3>
              <div>
                Please contact{" "}
                <a href="mailto:support@crstl.so">support@crstl.so</a> if this
                error persists.
              </div>
            </div>
          )}
          {isFetched ? (
            shipmentDocs?.length === 0 ? (
              <h3>No documents found for this shipment.</h3>
            ) : (
              <DocumentViewer height={viewerHeight} url={currentUrl} />
            )
          ) : null}
        </ViewerContainer>
      </Spinner>
    </Modal>
  );
};

