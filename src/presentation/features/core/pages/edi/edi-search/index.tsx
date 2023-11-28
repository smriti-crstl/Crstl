import { SearchDocumentsDocumentModelFE } from "domain/entity/shared/models";
import {
  useGetAdvancedSearchDocuments,
  useGetTradingPartners,
} from "domain/interactors/shared";
import { CORE_EDI } from "globals/configs";
import moment from "moment";
import { useSearchFormData } from "presentation/features/common/components/Search/hooks/useSearchFormData";
import { useSearchParams } from "presentation/hooks/common";
import { currencyUSDFormatter } from "presentation/utils";
import { useState } from "react";
import { generatePath, Link } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";
import { SimpleTable } from "@crstl/components/atoms/table";
import { PageWrapper } from "@crstl/components/molecules/page";

import { DownloadEdiSearchCSV } from "../Download/DownloadEdiSearchCSV";
import { exportToCsv, getTpfName } from "../edi.utils";
import { SOURCE_DOC_TYPE_PARAM } from "../EdiStepsSection";
import { DOCUMENT_TYPE_MAP } from "../event-log/constants";
import { TableConfig } from "../event-log/types";
import {
  EDI_LIST_VIEW_TABLE_DATA_INDEXES,
  ediSearchCsvConfig,
  TABLE_PAGE_SIZE,
} from "./constants";
import { generateLoadedCSV } from "./helpers";

const EdiSearchViewPage = () => {
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [downloadDisabled, setDownloadDisabled] = useState<boolean>(false);
  const [tableConfig, setTableConfig] = useState<TableConfig>({});
  const { formData, setFormData } = useSearchFormData();
  const searchParams = useSearchParams();

  const { data, isLoading } = useGetAdvancedSearchDocuments(formData);

  const { data: tradingPartners } = useGetTradingPartners({
    select: (response) => {
      const tradingPartnerConfig: Record<string, string> = {};
      response?.data?.forEach(({ id, name, flavor }) => {
        tradingPartnerConfig[id] = getTpfName({ name, flavor });
      });
      return tradingPartnerConfig;
    },
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedIds(newSelectedRowKeys);
  };

  // used to handle sorting
  const handleChange = (pagination: any, _: any, sorter: any) => {
    const { current: currentPage = 1 } = pagination;

    const { order, field } = sorter;

    let sortOrder = "desc";
    if (field === EDI_LIST_VIEW_TABLE_DATA_INDEXES.DOCUMENT_DATE) {
      sortOrder = order === "ascend" ? "asc" : "desc";
    }

    setFormData({
      ...formData,
      limit: TABLE_PAGE_SIZE,
      offset: (currentPage - 1) * TABLE_PAGE_SIZE,
      sort: {
        date: sortOrder,
      },
    });

    setTableConfig({ sorter });
  };

  const EDI_LIST_VIEW_TABLE_CONFIG = () => [
    {
      title: "Document #",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.REFERENCE_ID,
      key: EDI_LIST_VIEW_TABLE_DATA_INDEXES.REFERENCE_ID,
      width: 120,
      render: function renderDocumentLink(
        value: string,
        record: SearchDocumentsDocumentModelFE
      ) {
        if (!value) {
          return null;
        }
        if (!record?.documentSlug || !record?.documentId) {
          return value;
        }

        let path = generatePath(CORE_EDI, {
          documentType: record.documentSlug,
          tabName: "view",
          id: record.documentId,
          orderId: record?.sourceDocumentId ?? record.documentId, // documentId is used for order id if sourceDocumentId is not present in cases like 850 and 875
        });
        if (record?.sourceDocumentType) {
          searchParams.set(SOURCE_DOC_TYPE_PARAM, record.sourceDocumentType);
          const search = searchParams.toString();
          path = `${path}?${search}`;
        }

        return (
          <Link to={path} target="_blank">
            {value}
          </Link>
        );
      },
    },
    {
      title: "Document Type",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.DOCUMENT_TYPE,
      key: EDI_LIST_VIEW_TABLE_DATA_INDEXES.DOCUMENT_TYPE,
      width: 120,
      render(value: string) {
        return DOCUMENT_TYPE_MAP[value];
      },
    },
    {
      title: "Amount",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.AMOUNT,
      key: EDI_LIST_VIEW_TABLE_DATA_INDEXES.AMOUNT,
      width: 100,
      render(value: number) {
        return value ? currencyUSDFormatter(value) : "";
      },
    },
    {
      title: "Trading Partner",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.TRADING_PARTNER_ID,
      width: 100,
      ellipsis: true,
      render(value: string) {
        return tradingPartners?.[value];
      },
    },
    {
      title: "Status",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.STATUS,
      key: EDI_LIST_VIEW_TABLE_DATA_INDEXES.STATUS,
      width: 120,
      render(value: string) {
        return value?.replaceAll("_", " ");
      },
    },
    {
      title: "Purchase Order #",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.SOURCE_DOCUMENT_REFERENCE_ID,
      key: EDI_LIST_VIEW_TABLE_DATA_INDEXES.SOURCE_DOCUMENT_REFERENCE_ID,
      width: 120,
      render: function renderDocumentLink(
        value: string,
        record: SearchDocumentsDocumentModelFE
      ) {
        if (!value) {
          return null;
        }

        if (!record?.sourceDocumentSlug || !record?.sourceDocumentId) {
          return value;
        }

        let path = generatePath(CORE_EDI, {
          documentType: record.sourceDocumentSlug,
          tabName: "view",
          id: record.sourceDocumentId,
          orderId: record.sourceDocumentId,
        });

        if (record?.sourceDocumentType) {
          searchParams.set(SOURCE_DOC_TYPE_PARAM, record.sourceDocumentType);
          const search = searchParams.toString();
          path = `${path}?${search}`;
        }

        return (
          <Link to={path} target="_blank">
            {value}
          </Link>
        );
      },
    },
    {
      title: "Date",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.DOCUMENT_DATE,
      sorter: true,
      render(value: string) {
        if (!value) {
          return null;
        }
        const dateObj = moment(value).utc();
        return `${dateObj.format("dddd, MMMM D, YYYY, HH:mm:ss")} UTC`;
      },
      width: 180,
      fixed: true,
    },
  ];

  const downloadCsv = (data: any) => {
    setDownloadDisabled(true);
    exportToCsv(
      ediSearchCsvConfig,
      generateLoadedCSV(data, tradingPartners),
      "Crstl Search Results Download"
    );
    setDownloadDisabled(false);
  };

  return (
    <>
      {selectedIds.length !== 0 && (
        <DownloadEdiSearchCSV
          downloadCsv={downloadCsv}
          orderIds={selectedIds}
          downloadDisabled={downloadDisabled}
          tableConfig={tableConfig}
        />
      )}
      <PageWrapper>
        <Spinner spinning={isLoading}>
          <SimpleTable
            rowSelection={{
              type: "checkbox",
              onChange: onSelectChange,
              preserveSelectedRowKeys: true,
            }}
            loading={false}
            dataSource={data?.documents}
            columns={EDI_LIST_VIEW_TABLE_CONFIG()}
            rowKey={(record) => record.id}
            onChange={handleChange}
            scroll={{ x: true, y: "calc(100vh - 240px)" }}
            pagination={{
              pageSize: TABLE_PAGE_SIZE,
              total: data?.totalCount,
              showSizeChanger: false,
              position: ["bottomLeft"],
            }}
          />
        </Spinner>
      </PageWrapper>
    </>
  );
};

export default EdiSearchViewPage;

