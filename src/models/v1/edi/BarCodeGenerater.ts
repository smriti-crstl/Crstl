export interface BarCodeGenerator {
  TextLocation: TextLocation;
  FontSizeMode: FontSizeMode;
  Resolution: string;
  DimensionX: string;
  Units: string;
  BarHeight: string;
  TypeOfBarcode: string;
}

export enum TextLocation {
  Below = "Below",
  Above = "Above",
  None = "None"
}

export enum FontSizeMode {
  Auto = "Auto",
  Manual = "Manual"
}
