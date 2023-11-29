import { useEffect, useState } from "react";
import styled from "styled-components";
import { DollarOutlined } from "@ant-design/icons";
import { Form } from "antd";

import { useGetCarrierDocsUrls } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { DocumentViewer } from "presentation/features/common/components/DocumentViewer";
import { CreateForm } from "@crstl/components/organisms/create-form";
import { Spinner } from "@crstl/components/atoms/loading";
import { Modal } from "@crstl/components/atoms/modal";
import { ColoredButton } from "@crstl/components/atoms/buttons";
import { theme } from "globals/themes";
import { getCarrierLabelFormConfig } from "./utils";
import { carriers, serviceTypes } from "./constants";
import {
  CarrierType,
  ServiceType,
  ShippingLabelInfo,
} from "domain/entity/edi/models/v2";

const viewerHeight = "65vh";

const ViewerContainer = styled.div`
  height: ${viewerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const WarningTextBox = styled.div`
  color: ${theme.palette.colors.INDOCHINE};
  margin-top: 8px;
  margin-bottom: 8px;
  text-align: right;
  font-size: 11px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 8px;
  background: ${theme.palette.colors.POLAR};
  border: 1px solid ${theme.palette.colors.ULTRAMARINE_BLUE};
  border-radius: 4px;
  padding: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 11px;
`;

interface Props {
  asnId: string;
  visible: boolean;
  toggle: () => void;
}

interface ServiceTypeOption {
  label: string;
  value: ServiceType;
}

export const ShipmentDocumentsModalDropShip: React.FC<Props> = ({
  asnId,
  visible,
  toggle,
}) => {
  const [serviceTypeOptions, setServiceTypeOptions] = useState<
    ServiceTypeOption[] | []
  >([]);
  const [form] = Form.useForm();
  const [selectedCarrier, setSelectedCarrier] = useState<string>(
    "selected carrier"
  );
  const [showForm, setShowForm] = useState<boolean | null>(null);
  const [carrierData, setCarrierData] = useState<ShippingLabelInfo | null>(
    null
  );

  const [showErrorNotification, setShowErrorNotification] = useState<boolean>(
    false
  );

  const [queryParams, setQueryParams] = useState<any>({
    asn_id: asnId,
  });

  const carrierLabelFormConfig = getCarrierLabelFormConfig(serviceTypeOptions);

  const { data, isLoading, isError, error, refetch } = useGetCarrierDocsUrls(
    queryParams
  );

  useEffect(() => {
    // This useEffect runs when the data fetching is successful (on page load)
    // You can perform additional actions here after successful data fetch
    // For example:
    if (!isLoading && !isError && data) {
      const label = data?.data[0].signed_url;

      if (label) {
        setShowForm(false);
        setCarrierData(data?.data?.[0]);
      } else {
        setShowForm(true);
      }
    }

    if (isError) {
      if (showErrorNotification) {
        setNotification({
          type: "error",
          description: error.response?.data.general || "",
          moduleName:
            error.response?.data.data?.message ||
            `${TEXT_CONSTANTS.ROUTER.SOMETHING_WENT_WRONG}. Please try again`,
        });
        setShowErrorNotification(false);
      }
      setShowForm(true);
    }
  }, [data, isError, isLoading]);

  useEffect(() => {
    refetch();
  }, [queryParams]);

  const renderBody = () => {
    if (showForm) {
      return (
        <>
          <Form
            form={form}
            layout="vertical"
            name="org-selection"
            style={{
              width: "100%",
              alignItems: "flex-end",
            }}
            onFinish={(payload) => {
              setQueryParams({ ...payload, asn_id: asnId, regenerate: true });
              setShowErrorNotification(true);
            }}
            onValuesChange={(changedValues, allValues, ...rest) => {
              if ("carrier_type" in changedValues) {
                const selected: CarrierType = changedValues["carrier_type"];
                setServiceTypeOptions(serviceTypes[selected] || []);
                const label =
                  carriers.find((c) => c.value === selected)?.label || "";
                setSelectedCarrier(label);
                form.setFieldsValue({ service_type: undefined });
              }
            }}
          >
            <CreateForm
              rowProps={{
                style: {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              }}
              data={carrierLabelFormConfig}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <WarningTextBox>
                {`Note: Creates a shipment on ${selectedCarrier}. Your carrier might charge you shipping fees based on service level and parcel dimensions`}
              </WarningTextBox>
              <ColoredButton
                loading={isLoading}
                buttonProps={{
                  htmlType: "submit",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <div>
                  <DollarOutlined style={{ marginRight: "4px" }} />
                  {"Generate label"}
                </div>
              </ColoredButton>
            </div>
          </Form>
        </>
      );
    }
    if (carrierData)
      return (
        <>
          <ColoredButton onClick={() => setShowForm(true)}>
            {"Generate new label"}
          </ColoredButton>
          <InfoBox>
            <InfoItem>
              <b>Carrier:&nbsp;</b> {carrierData?.carrier_type}
            </InfoItem>
            <InfoItem>
              <b>Service:&nbsp;</b> {carrierData?.service_type}
            </InfoItem>
            <InfoItem>
              <b>Parcel dimension:&nbsp;</b>
              {`${carrierData?.parcel?.length}″ (L) x ${carrierData?.parcel?.width}″ (W) x ${carrierData?.parcel?.height}″ (H)`}
            </InfoItem>
            <InfoItem>
              <b>Parcel weight:&nbsp;</b>{" "}
              {`${carrierData?.parcel?.weight} ounce`}
            </InfoItem>
          </InfoBox>
          <ViewerContainer>
            <DocumentViewer
              height={viewerHeight}
              url={carrierData?.signed_url}
            />
          </ViewerContainer>
        </>
      );
  };
  const heightStyle = !showForm ? { height: `${viewerHeight}` } : {};
  return (
    <Modal
      style={{ top: showForm ? "10vh" : "5vh" }}
      bodyStyle={{ overflowY: "auto" }}
      open={visible}
      width={showForm ? "50%" : "70%"}
      onCancel={toggle}
      title="Shipment Documents"
      footer={null}
    >
      <div style={{ ...heightStyle }}>
        <Spinner spinning={isLoading && !carrierData}>{renderBody()}</Spinner>
      </div>
    </Modal>
  );
};

