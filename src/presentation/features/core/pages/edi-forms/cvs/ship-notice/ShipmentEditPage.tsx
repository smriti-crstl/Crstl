import { Form } from "antd";
import { useListDocumentQuery } from "domain/interactors/edi";
import { useSearchParams } from "presentation/hooks/common";
import { useParams } from "react-router-dom";
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import { createSourceJson } from "./helpers";
import { mergeDuplicatePacks } from "./helpers/createSourceJson";

import ShipmentEditPageFullEntryForm from "./ShipmentEditPageFullEntryForm";
import { ShipmentEditPageQuickEntryForm } from "./ShipmentEditPageQuickEntryForm";
import { useEffect } from "react";

interface PageParams {
  orderId: string;
  id: string;
}

function ShipmentEditPage() {
  const [form] = Form.useForm();
  const pageParams = useParams<PageParams>();
  const searchParams = useSearchParams();
  const isFullEntryForm = searchParams.get("fullEntryForm");

  const { data: listDocumentData } = useListDocumentQuery("856", pageParams.id);

  const sourceJson = createSourceJson(listDocumentData as TargetJSON);
  const initialValues = mergeDuplicatePacks(sourceJson);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  if (isFullEntryForm) {
    return <ShipmentEditPageFullEntryForm form={form} />;
  }

  return <ShipmentEditPageQuickEntryForm form={form} />;
}

export default ShipmentEditPage;
