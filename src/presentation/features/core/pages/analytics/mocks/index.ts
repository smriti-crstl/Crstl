export const PIE_MOCK_DATA = {
  data: [
    {
      label: "Unfulfilled",
      textColor: "#000000",
      color: "#F3A18F",
      value: 1,
      id: "2797bccd-7a3c-4f61-8e8c-ff2424a49703",
    },
    {
      textColor: "#000000",
      label: "In-Transit",
      id: "f3119b2e-d3c9-4a24-8f15-cad53d8c2554",
      value: 2,
      color: "#F2C94C",
    },
    {
      color: "#1890FF",
      label: "Out For Delivery",
      id: "0ece7ca1-e721-470d-b10f-40813498874f",
      textColor: "#FFFFFF",
      value: 1,
    },
    {
      value: 1,
      color: "#34A853",
      textColor: "#FFFFFF",
      id: "517857f2-a8e2-4129-9209-865cc9468c2f",
      label: "Delivered",
    },
    {
      textColor: "#000000",
      color: "#E2E2E2",
      label: "undefined",
      value: 3,
      id: "a3a81b1d-c101-45d4-82f6-f4864700ac5f",
    },
  ],
  total: 8,
};

export const CASH_ON_HANDS_MOCK_DATA = {
  total: "2210.00",
  data: [
    {
      label: "PNC",
      id: "1",
      balance: "1000.00",
      value: "1",
      color: "#E2E2E2",
    },
    {
      label: "PNC",
      id: "2",
      balance: "100.00",
      value: "95.25",
      color: "#34A853",
    },
    {
      label: "PNC",
      id: "3",
      balance: "3000.00",
      value: "90.25",
      color: "#00A298",
    },
    {
      label: "TD Bank",
      id: "4",
      balance: "1000.00",
      value: "45.25",
      color: "#34A853",
    },
    {
      label: "BB&T - Online Banking",
      id: "Plaid Saving",
      balance: "210.00",
      value: "19.50",
      color: "#34A853",
    },
  ],
};

export const AVERAGE_ORDER_VALUE_MOCK = [
  {
    id: "AverageOrder",
    color: "#7C8599",
    data: [
      {
        x: "CVS",
        y: "634.00",
      },
      {
        x: "Walmart",
        y: "7595.16",
      },
      {
        x: "Target",
        y: "1900.80",
        isEstimated: true,
      },
    ],
  },
];

export const B2B_BAR_GRAPH = [
  {
    x: "13939.20",
    y: "387371",
    percentChange: "-50.00",
  },
  {
    x: "11721.60",
    y: "73749",
    percentChange: "63.64",
  },
  {
    x: "10771.20",
    y: "38",
    percentChange: "23.53",
  },
  {
    x: "9057.60",
    y: "73",
    percentChange: "41.18",
  },
  {
    x: "5860.80",
    y: "7",
    percentChange: "36.36",
  },
  {
    x: "1267.20",
    y: "94",
    percentChange: "0.00",
  },
  {
    x: "633.60",
    y: "387",
    percentChange: "-20.00",
  },
];

export const INVOICE_PROJECTION_MOCK = [
  {
    totalAmount: 633.6,
    currency: "USD",
    customer: "Target Corporation",
    dueDate: "2021-08-06",
  },
  {
    totalAmount: 1598.4,
    currency: "USD",
    customer: "UNFI/MILLBROOK",
    dueDate: "2021-08-06",
  },
  {
    totalAmount: 79.2,
    currency: "USD",
    customer: "Erewhon Natural Foods Market - RS6 Silverlake",
    dueDate: "2021-08-08",
  },
  {
    totalAmount: 1267.2,
    currency: "USD",
    customer: "CVS Stores Wholesale",
    dueDate: "2021-08-09",
  },
  {
    totalAmount: 633.6,
    currency: "USD",
    customer: "CVS Stores Wholesale",
    dueDate: "2021-08-10",
  },
  {
    totalAmount: 633.6,
    currency: "USD",
    customer: "CVS Stores Wholesale",
    dueDate: "2021-08-10",
  },
  {
    totalAmount: 633.6,
    currency: "USD",
    customer: "CVS Stores Wholesale",
    dueDate: "2021-08-10",
  },
  {
    totalAmount: 1900.8,
    currency: "USD",
    customer: "Target Corporation",
    dueDate: "2021-08-10",
  },
  {
    totalAmount: 1267.2,
    currency: "USD",
    customer: "CVS Stores Wholesale",
    dueDate: "2021-08-13",
  },
];

export const INVOICE_AVERAGE_NET_DAYS = [
  {
    customer: "GYFTING",
    count: 1,
    avgNetDays: 1,
  },
  {
    customer: "Erewhon Natural Foods Market - RS4 Santa Monica",
    count: 1,
    avgNetDays: 30,
  },
  {
    customer: "CVS Stores Wholesale",
    count: 23,
    avgNetDays: 46,
  },
  {
    customer: "Erewhon Natural Foods Market - RS6 Silverlake",
    count: 1,
    avgNetDays: 30,
  },
  {
    customer: "Erewhon Natural Foods Market- RS5 Pacific",
    count: 1,
    avgNetDays: 30,
  },
  {
    customer: "Christina Kozlowski",
    count: 1,
    avgNetDays: 1,
  },
  {
    customer: "Erewhon Natural Foods Market - RS3 Venice",
    count: 1,
    avgNetDays: 30,
  },
  {
    customer: "DTTB Global Products",
    count: 1,
    avgNetDays: 4,
  },
];
