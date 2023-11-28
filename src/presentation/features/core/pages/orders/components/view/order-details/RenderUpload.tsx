import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

import { UploadButton } from "@crstl/components/atoms/buttons";
import {
  GenericHeading,
  GenericSubHeading,
} from "@crstl/components/atoms/typography";

export const RenderUploadOfOrderDetails = (): ReactElement => {
  return (
    <div>
      <GenericHeading weight="MEDIUM" size="XS">
        {CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.ATTACHMENT_TITLE}
      </GenericHeading>
      <GenericSubHeading isGreyDisabled weight="REGULAR" size="XXS">
        {CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.ATTACHMENTS_INFO}
      </GenericSubHeading>
      <UploadButton>
        {CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.UPLOAD_BUTTON_TEXT}
      </UploadButton>
    </div>
  );
};
