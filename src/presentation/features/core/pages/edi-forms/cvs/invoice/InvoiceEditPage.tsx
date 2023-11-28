import React, { useEffect } from "react";
import { useSearchParams } from "presentation/hooks/common";
import InvoiceEditPageFullEntryForm from "./InvoiceEditPageFullEntryForm";
import { InvoiceEditPageQuickEntryForm } from "./InvoiceEditPageQuickEntryForm";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import { useListDocumentQuery } from "domain/interactors/edi";
import { createSourceJson } from "./helpers/createSourceJson";
import { TargetJSON } from "domain/entity/edi/models/TargetJson810";

interface PageParams {
  orderId: string;
  id: string;
}

function InvoiceEditPage() {
  const [form] = Form.useForm();
  const pageParams = useParams<PageParams>();
  const searchParams = useSearchParams();
  const isFullEntryForm = searchParams.get("fullEntryForm");

  const { data: listDocumentData } = useListDocumentQuery("810", pageParams.id);

  const initialValues = createSourceJson(listDocumentData as TargetJSON);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  if (isFullEntryForm) {
    return <InvoiceEditPageFullEntryForm form={form} />;
  }

  return <InvoiceEditPageQuickEntryForm form={form} />;
}

export { InvoiceEditPage as default };
