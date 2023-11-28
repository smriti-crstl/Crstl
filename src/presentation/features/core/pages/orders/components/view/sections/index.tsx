import { Col, Row } from "antd";
import { ReactElement } from "react";

import { OrderViewComments } from "../comments";
import { OrderViewDetails } from "../order-details";
import { OrderViewTable } from "../table";

export const OrderViewSections = (): ReactElement => {
  return (
    <Row gutter={12}>
      <Col span={14}>
        <Row gutter={[12, 12]}>
          <Col style={{ minHeight: "20rem" }} span={24}>
            <OrderViewTable />
          </Col>
          <Col span={24}>
            <OrderViewComments />
          </Col>
        </Row>
      </Col>
      <Col span={10}>
        <Row style={{ minHeight: "calc(100vh - 200px)", marginBottom: "1rem" }}>
          <OrderViewDetails />
        </Row>
      </Col>
    </Row>
  );
};
