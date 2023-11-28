import { Spinner } from "@crstl/components/atoms/loading";
import { InputNumber, Radio, Select } from "antd";
import { GetIntakeFormRes } from "domain/entity/edi-setup/models";
import {
  useGetOrgDataQuery,
  usePutOrgDataOptimisticMutation,
} from "domain/interactors/edi-setup";
import { cloneDeep, debounce, set } from "lodash";
import { useCallback, useState } from "react";
import { QUESTIONS } from "../constants";
import { FieldContainer, Question } from "../styles";
import { QuestionKeys } from "../types";

export const QuestionForm = () => {
  const [formData, setFormData] = useState<
    Partial<GetIntakeFormRes["questions"]>
  >();

  const { data: orgDataRes, isLoading } = useGetOrgDataQuery(
    { intakeForm: true },
    {
      onSuccess: (response) =>
        setFormData(response?.data?.intakeForm?.questions),
    }
  );

  const { mutate: mutateIntakeFormData } = usePutOrgDataOptimisticMutation({
    intakeForm: true,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQuestionFormData = useCallback(
    debounce((formData) => {
      const clone = cloneDeep(orgDataRes?.data ?? { id: "" });
      set(clone, "intakeForm.questions", formData);
      mutateIntakeFormData(clone);
    }, 2000),
    [orgDataRes]
  );

  const handleFieldChange = (fieldKey: QuestionKeys, value: any) => {
    setFormData((oldVal) => {
      const newFormData = { ...oldVal, [fieldKey]: value };
      updateQuestionFormData(newFormData);
      return newFormData;
    });
  };

  return (
    <Spinner spinning={isLoading}>
      <FieldContainer>
        <Question>{QUESTIONS.NUMBER_OF_EDI_TRADING_PARTNERS}</Question>
        <InputNumber
          min={0}
          placeholder="e.g., 3"
          value={formData?.numberOfEdiTradingPartners}
          onChange={(newVal) =>
            handleFieldChange(
              QuestionKeys.NUMBER_OF_EDI_TRADING_PARTNERS,
              newVal
            )
          }
        />
      </FieldContainer>
      <FieldContainer>
        <Question>{QUESTIONS.AVERAGE_MONTHLY_PO_PROCESSED}</Question>
        <InputNumber
          min={0}
          placeholder="e.g., 10"
          value={formData?.averageMonthlyPoProcessed}
          onChange={(newVal) =>
            handleFieldChange(QuestionKeys.AVERAGE_MONTHLY_PO_PROCESSED, newVal)
          }
        />
      </FieldContainer>
      <FieldContainer>
        <Question>{QUESTIONS.SUPPORT_DROPSHIP_ORDERS}</Question>
        <Radio.Group
          value={formData?.supportDropshipOrders}
          onChange={(e) =>
            handleFieldChange(
              QuestionKeys.SUPPORT_DROPSHIP_ORDERS,
              e.target.value
            )
          }
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </FieldContainer>
      <FieldContainer>
        <Question>{QUESTIONS.WORK_WITH_3PL}</Question>
        <Radio.Group
          value={formData?.workWith3pl}
          onChange={(e) =>
            handleFieldChange(QuestionKeys.WORK_WITH_3PL, e.target.value)
          }
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </FieldContainer>
      <FieldContainer>
        <Question>{QUESTIONS.INTERACT_WITH_EDI_DOCUMENTS}</Question>
        <Radio.Group
          value={formData?.interactWithEdiDocuments}
          onChange={(e) =>
            handleFieldChange(
              QuestionKeys.INTERACT_WITH_EDI_DOCUMENTS,
              e.target.value
            )
          }
        >
          <Radio value="ERP system">ERP system</Radio>
          <br />
          <Radio value="Web based EDI product">Web based EDI product</Radio>
          <br />
          <Radio value="Other">Other</Radio>
        </Radio.Group>
      </FieldContainer>
      <FieldContainer>
        <Question>{QUESTIONS.INTEGRATIONS_NEEDED}</Question>
        <Select
          mode="tags"
          placeholder="e.g., NetSuite, Quickbooks, etc."
          value={formData?.integrationsNeeded}
          onChange={(newVal) =>
            handleFieldChange(QuestionKeys.INTEGRATIONS_NEEDED, newVal)
          }
          notFoundContent={null}
          tokenSeparators={[","]}
          dropdownStyle={{ display: "none" }}
        />
      </FieldContainer>
    </Spinner>
  );
};

