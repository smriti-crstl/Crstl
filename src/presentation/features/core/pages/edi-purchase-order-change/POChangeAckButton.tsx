import { Button } from "antd";
import { GetAssociatedPOChangeDocsDataObject } from "domain/entity/edi/models";
import { EDI_QUERY_KEYS, usePostAutofillQuery } from "domain/interactors/edi";
import { CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE } from "globals/configs";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { useQueryClient } from "react-query";
import { generatePath, useHistory } from "react-router-dom";
import { useTheme } from "styled-components";

import { Spinner } from "@crstl/components/atoms/loading";

import { POChangeDocNewStateButtonsContainer } from "./PurchaseOrderChangePage.styles";

interface Props {
  isPOChangeAckSupported: boolean;
  poChangeDoc: GetAssociatedPOChangeDocsDataObject;
  isFetching: boolean;
}

export const POChangeAckButton: React.FC<Props> = ({
  isPOChangeAckSupported,
  poChangeDoc,
  isFetching,
}) => {
  const history = useHistory();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const {
    mutate: autoFillDocument,
    isLoading: isLoadingAutofill,
  } = usePostAutofillQuery();

  const handleAutofill = () => {
    autoFillDocument(
      {
        sourceDocumentId: poChangeDoc.id,
        sourceDocumentType: CoreEDIDocumentNumber.PurchaseOrderChange,
        targetDocumentType: CoreEDIDocumentNumber.PurchaseOrderChangeAck,
      },
      {
        onSuccess: (res) => {
          const path = generatePath(CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE, {
            id: res.data.documentId ?? 0,
            orderId: poChangeDoc.source850DocId,
          });
          history.push(path);
          queryClient.invalidateQueries([
            EDI_QUERY_KEYS.GET_ASSOCIATED_PO_CHANGE_DOCS,
          ]);
        },
      }
    );
  };

  if (isFetching) {
    return <Spinner spinning />;
  }

  if (!isPOChangeAckSupported) {
    return null;
  }

  if (!poChangeDoc?.poChangeAckId) {
    return (
      <POChangeDocNewStateButtonsContainer>
        <span>PO Change Acknowledgement:</span>

        <Button
          onClick={handleAutofill}
          loading={isLoadingAutofill || isFetching}
          style={{
            backgroundColor: theme.palette.colors.ULTRAMARINE_BLUE,
            color: theme.palette.colors.WHITE,
            height: 42,
            width: 126,
            marginLeft: 8,
          }}
        >
          Start
        </Button>
      </POChangeDocNewStateButtonsContainer>
    );
  }

  const ediPoChangeAckPath = generatePath(CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE, {
    id: poChangeDoc.poChangeAckId,
    orderId: poChangeDoc.source850DocId,
  });

  return (
    <POChangeDocNewStateButtonsContainer>
      <span>PO Change Acknowledgement:</span>

      <Button
        loading={isFetching}
        onClick={() => history.push(ediPoChangeAckPath)}
        style={{
          backgroundColor: theme.palette.colors.BRIDESMAID,
          color: theme.palette.colors.FLUSH_ORANGE,
          border: `1px solid ${theme.palette.colors.RAJAH}`,
          height: 42,
          width: 126,
          marginLeft: 8,
        }}
      >
        Continue
      </Button>
    </POChangeDocNewStateButtonsContainer>
  );
};

