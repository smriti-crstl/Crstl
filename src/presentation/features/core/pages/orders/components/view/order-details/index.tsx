import { usePurchaseOrderDetailsQuery } from "domain/interactors/orders";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
// import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir/core/orders";
import { ReactElement, useState } from "react";
import { useParams } from "react-router";

import { GenericError } from "@crstl/components/atoms/error";
import { SimpleList } from "@crstl/components/atoms/list";

import { createOrderDetailsDataSource } from "../../../config/orderDetails";
import { OrderCollapse } from "./OrderCollapse";
import { RenderOrderDetailsItem } from "./RenderOrderDetailsItem";
import { RenderUploadOfOrderDetails } from "./RenderUpload";

export const OrderViewDetails = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    isError,
    data: purchaseOrderDetails,
  } = usePurchaseOrderDetailsQuery(id);

  const { getZonedTime } = useTimestamp();

  const [activeKeys, setActiveKeys] = useState<string[]>(["0"]);
  const [uploadKey, setUploadKey] = useState<string[]>([]);

  if (isError) {
    return <GenericError />;
  }

  const dataSource = createOrderDetailsDataSource(purchaseOrderDetails).map(
    (item) => {
      const { config } = item;
      const newConfig = config.map(({ key, value, isDates, ...rest }) => {
        if (isDates) {
          return {
            ...rest,
            key,
            value:
              value && value !== "-"
                ? getZonedTime({ ISODateString: value, withAltLabel: true })
                : "-",
          };
        } else {
          return {
            ...rest,
            key,
            value,
          };
        }
      });

      return {
        ...item,
        config: newConfig,
      };
    }
  );
  return (
    <div style={{ width: "100%" }}>
      {[
        ...dataSource.map(({ config, heading }, index) => {
          return (
            <OrderCollapse
              inclusionKey={index}
              activeKeys={activeKeys}
              heading={heading}
              setKeys={setActiveKeys}
              key={index}
            >
              <SimpleList
                loading={isLoading}
                dataSource={config}
                elements={config.map(({ key, ...rest }) => {
                  return <RenderOrderDetailsItem {...rest} key={key} />;
                })}
              />
            </OrderCollapse>
          );
        }),
        <OrderCollapse
          inclusionKey={"upload"}
          activeKeys={uploadKey}
          setKeys={setUploadKey}
          heading={`Order & Related Attachments`}
          key={`Order & Related Attachments`}
        >
          <RenderUploadOfOrderDetails key="upload" />
        </OrderCollapse>,
      ]}
    </div>
  );
};
