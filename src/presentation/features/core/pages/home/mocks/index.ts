export const BankInfo: Array<{
  color?: string;
  bgColor: string;
  name: string;
  balance: number;
  accountNumber: string;
}> = [
  {
    color: "#FFFFFF",
    bgColor: "#35BFB7",
    name: "Rho",
    balance: 90000000,
    accountNumber: "3456345634563456",
  },
  {
    bgColor: "#F2C94C",
    color: "#000000",
    name: "Mercury",
    balance: 91234567890,
    accountNumber: "4567456745674567",
  },
  {
    bgColor: "#6B66EB",
    color: "#FFFFFF",
    name: "Chase",
    balance: 1456789654,
    accountNumber: "7896789678967896",
  },
  {
    bgColor: "#8FADF4",
    color: "#000000",
    name: "Indigo",
    balance: 785645778985,
    accountNumber: "4577457745774577",
  },
  {
    bgColor: "#EB5757",
    color: "#000000",
    name: "Kig",
    balance: 9988318749821,
    accountNumber: "9988998899889988",
  },
];

export const BalanceChartMockData: Array<{
  color?: string;
  bgColor?: string;
  id: string;
  data: Array<{ x: string; y: number }>;
}> = [
  {
    id: "TotalBalance",
    bgColor:
      "linear-gradient(180deg, rgba(0, 18, 166, 0.192) 0.13%, rgba(0, 18, 166, 0) 116.96%)",
    color: "#0012A6",
    data: [
      { x: "6/23", y: 200 },
      { x: "6/24", y: 300 },
      { x: "6/25", y: 400 },
      { x: "6/26", y: 500 },
      { x: "6/27", y: 600 },
    ],
  },
  {
    id: "Rho",
    color: "rgba(53, 191, 183, 1)",
    data: [
      { x: "6/23", y: 100 },
      { x: "6/24", y: 200 },
      { x: "6/25", y: 350 },
      { x: "6/26", y: 300 },
      { x: "6/27", y: 600 },
    ],
  },
  {
    id: "Mercury",
    color: "rgba(247, 201, 96, 1)",
    data: [
      { x: "6/23", y: 80 },
      { x: "6/24", y: 80 },
      { x: "6/25", y: 40 },
      { x: "6/26", y: 100 },
      { x: "6/27", y: 0 },
    ],
  },
  {
    id: "Chase",
    color: "rgba(215, 90, 54, 1)",
    data: [
      { x: "6/23", y: 20 },
      { x: "6/24", y: 20 },
      { x: "6/25", y: 10 },
      { x: "6/26", y: 100 },
      { x: "6/27", y: 0 },
    ],
  },
];

export interface MarkerProp {
  name: string;
  coordinates: number[];
  color: string;
}

export const GEOMAP_MARKER_MOCK = {
  B2B: [
    {
      name: "Buenos Aires",
      coordinates: [-58.3816, -34.6037],
      color: "#1890FF",
    },
    { name: "La Paz", coordinates: [-68.1193, -16.4897], color: "#1890FF" },
    { name: "Brasilia", coordinates: [-47.8825, -15.7942], color: "#1890FF" },
    { name: "Santiago", coordinates: [-70.6693, -33.4489], color: "#1890FF" },
    { name: "Bogota", coordinates: [-74.0721, 4.711], color: "#1890FF" },
    { name: "Quito", coordinates: [-78.4678, -0.1807], color: "#1890FF" },
  ],
  DTC: [
    { name: "Georgetown", coordinates: [0.1551, 6.8013], color: "#FF781E" },
    { name: "Asuncion", coordinates: [30.5759, -25.2637], color: "#FF781E" },
    { name: "Paramaribo", coordinates: [40.2038, 5.852], color: "#FF781E" },
    {
      name: "Montevideo",
      coordinates: [1200.1645, -34.9011],
      color: "#FF781E",
    },
    { name: "Caracas", coordinates: [-76.9036, 10.4806], color: "#FF781E" },
  ],
};
