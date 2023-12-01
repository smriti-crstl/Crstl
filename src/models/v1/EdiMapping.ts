export enum TradingPartners {
  Target = "Target",
  CVS = "CVS",
  Walmart = "Walmart",
  UNFI = "UNFI",
  KeHE = "KeHE",
  Unknown = "Unknown"
}

export interface EdiMappingOutput {
  code: string;
  output: any;
}

export enum MappingType {
  autofill = "autofill",
  generation = "generation"
}
