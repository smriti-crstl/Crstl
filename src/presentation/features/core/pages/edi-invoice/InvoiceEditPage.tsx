import { Form } from "antd";
import { useListDocumentQuery } from "domain/interactors/edi";
import { TargetJSON } from "domain/entity/edi/models/TargetJson810";
import { useSearchParams } from "presentation/hooks/common";
import { useParams } from "react-router-dom";
import { createSourceJson } from "./helpers/createSourceJson";
import InvoiceEditPageFullEntryForm from "./InvoiceEditPageFullEntryForm";
import { InvoiceEditPageQuickEntryForm } from "./InvoiceEditPageQuickEntryForm";
import { useEffect } from "react";
import InvoiceEditPageFullEntryDynamicForm from "./v2/InvoiceEditPageFullEntryDynamicForm";
import InvoiceEditPageQuickEntryDynamicForm from "./v2/InvoiceEditPageQuickEntryDynamicForm";

interface PageParams {
  orderId: string;
  id: string;
}

function InvoiceEditPage() {
  const [form] = Form.useForm();
  const pageParams = useParams<PageParams>();
  const searchParams = useSearchParams();
  const isFullEntryForm = searchParams.get("fullEntryForm");
  const isFullEntryFormV2 = searchParams.get("fullEntryForm/v2");
  const isQuickEntryFormV2 = searchParams.get("quickEntryForm/v2");

  const { data: listDocumentData } = useListDocumentQuery("810", pageParams.id);

  const initialValues = createSourceJson(listDocumentData as TargetJSON);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  if (isFullEntryForm) {
    return <InvoiceEditPageFullEntryForm form={form} />;
  }

  if (isFullEntryFormV2) {
    return <InvoiceEditPageFullEntryDynamicForm />;
  }

  if (isQuickEntryFormV2) {
    return <InvoiceEditPageQuickEntryDynamicForm />;
  }

  return <InvoiceEditPageQuickEntryForm form={form} />;
}

export { InvoiceEditPage as default };
