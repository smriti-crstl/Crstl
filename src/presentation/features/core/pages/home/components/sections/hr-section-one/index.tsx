import { Col, Row } from "antd";
import { ReactElement } from "react";

import HomeHrSectionOneVrSectionOne from "./vr-section-one";
import { HrSectionOneVrSectionTwo } from "./vr-section-two";

export const HrSectionOne = (): ReactElement => {
  return (
    <Row style={{ flexWrap: "nowrap" }}>
      <Col style={{ width: "calc(100% - 432px)" }}>
        <HomeHrSectionOneVrSectionOne />
      </Col>
      <Col style={{ height: "45rem", width: "432px" }}>
        <HrSectionOneVrSectionTwo />
      </Col>
    </Row>
  );
};
