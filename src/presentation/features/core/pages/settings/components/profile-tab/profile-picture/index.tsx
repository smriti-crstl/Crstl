import { Col, Row } from "antd";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";
import styled from "styled-components";

import { AvatarWithBackground } from "components/atoms/avatar";
import { SimpleButtonGroup } from "components/molecules/button-groups";

const Wrapper = styled(Row)`
  margin: ${({ theme }) => `${theme.spacing.LARGE} 0`};
`;

const PhotoTextWrapper = styled(Col)`
  font-weight: ${({ theme }) => theme.typography.WEIGHTS.MEDIUM};
  font-size: ${({ theme }) => theme.typography.SIZES.XS};
  margin-bottom: ${({ theme }) => theme.spacing.SMALL};
`;

export const ProfilePicture = (): ReactElement => {
  return (
    <Wrapper justify="space-between" align="middle" gutter={24}>
      <Col span={7}>
        <Row align="middle" justify="center">
          <PhotoTextWrapper>
            {CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.TEXTS.IMAGE_HEADING_TEXT}
          </PhotoTextWrapper>
          <Col>
            <AvatarWithBackground
              style={{ height: "4rem", width: "4rem", margin: 0 }}
              src="https://i.postimg.cc/FHzJ8hHv/ODTLcjx-Afvqbx-Hn-VXCYX.jpg"
            />
          </Col>
        </Row>
      </Col>
      <Col span={17} style={{ marginTop: "1.5rem" }}>
        <SimpleButtonGroup
          firstButtonProps={{
            text:
              CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.TEXTS
                .UPLOAD_IMAGE_BUTTON_TEXT,
            type: "primary",
          }}
          secondButtonProps={{
            text:
              CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.TEXTS
                .REMOVE_IMAGE_BUTTON_TEXT,
            type: "default",
          }}
        />
      </Col>
    </Wrapper>
  );
};
