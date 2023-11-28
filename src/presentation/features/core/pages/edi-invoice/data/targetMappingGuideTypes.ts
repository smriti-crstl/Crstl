export interface DropdownOption {
  value: string;
  label: string;
  paragraph_number: string;
  notes?: Note[];
}

export interface Note {
  content: string;
  paragraph_number: string;
}

export interface TargetMappingGuide {
  created_at: string;
  id: string;
  updated_at: string;
  title: string;
  release: string;
  set: string;
  customizations: Customizations;
  overrides: Customizations;
  appendix: string;
  guide_id: string;
}

export interface Customizations {
  "heading.030_NTE": InputType;
  "heading.040_CUR": InputType;
  "heading.050_REF": InputType;
  "heading.055_YNQ": InputType;
  "heading.060_PER": InputType;
  "heading.070_N1": InputType;
  "heading.070_N1.080_N2": InputType;
  "heading.070_N1.090_N3": InputType;
  "heading.070_N1.100_N4": InputType;
  "heading.070_N1.110_REF": InputType;
  "heading.070_N1.120_PER": InputType;
  "heading.070_N1.125_DMG": InputType;
  "heading.130_ITD": InputType;
  "heading.140_DTM": InputType;
  "heading.150_FOB": InputType;
  "heading.160_PID": InputType;
  "heading.170_MEA": InputType;
  "heading.180_PWK": InputType;
  "heading.190_PKG": InputType;
  "heading.200_L7": InputType;
  "heading.212_BAL": InputType;
  "heading.213_INC": InputType;
  "heading.214_PAM": InputType;
  "heading.220_LM": InputType;
  "heading.240_N9": InputType;
  "heading.260_V1": InputType;
  "heading.260_V1.270_R4": InputType;
  "heading.260_V1.280_DTM": InputType;
  "heading.290_FA1": InputType;
  "detail.010_IT1": InputType;
  "detail.010_IT1.012_CRC": InputType;
  "detail.010_IT1.015_QTY": InputType;
  "detail.010_IT1.020_CUR": InputType;
  "detail.010_IT1.030_IT3": InputType;
  "detail.010_IT1.040_TXI": InputType;
  "detail.010_IT1.050_CTP": InputType;
  "detail.010_IT1.055_PAM": InputType;
  "detail.010_IT1.059_MEA": InputType;
  "detail.010_IT1.060_PID": InputType;
  "detail.010_IT1.060_PID.070_MEA": InputType;
  "detail.010_IT1.080_PWK": InputType;
  "detail.010_IT1.090_PKG": InputType;
  "detail.010_IT1.100_PO4": InputType;
  "detail.010_IT1.110_ITD": InputType;
  "detail.010_IT1.120_REF": InputType;
  "detail.010_IT1.125_YNQ": InputType;
  "detail.010_IT1.130_PER": InputType;
  "detail.010_IT1.140_SDQ": InputType;
  "detail.010_IT1.150_DTM": InputType;
  "detail.010_IT1.160_CAD": InputType;
  "detail.010_IT1.170_L7": InputType;
  "detail.010_IT1.175_SR": InputType;
  "detail.010_IT1.180_SAC": InputType;
  "detail.010_IT1.180_SAC.190_TXI": InputType;
  "detail.010_IT1.200_SLN": InputType;
  "detail.010_IT1.200_SLN.205_DTM": InputType;
  "detail.010_IT1.200_SLN.210_REF": InputType;
  "detail.010_IT1.200_SLN.220_PID": InputType;
  "detail.010_IT1.200_SLN.230_SAC": InputType;
  "detail.010_IT1.200_SLN.235_TC2": InputType;
  "detail.010_IT1.200_SLN.237_TXI": InputType;
  "detail.010_IT1.240_N1": InputType;
  "detail.010_IT1.240_N1.250_N2": InputType;
  "detail.010_IT1.240_N1.260_N3": InputType;
  "detail.010_IT1.240_N1.270_N4": InputType;
  "detail.010_IT1.240_N1.280_REF": InputType;
  "detail.010_IT1.240_N1.290_PER": InputType;
  "detail.010_IT1.240_N1.295_DMG": InputType;
  "detail.010_IT1.300_LM": InputType;
  "detail.010_IT1.320_V1": InputType;
  "detail.010_IT1.320_V1.330_R4": InputType;
  "detail.010_IT1.320_V1.340_DTM": InputType;
  "detail.010_IT1.350_FA1": InputType;
  "summary.020_TXI": InputType;
  "summary.030_CAD": InputType;
  "summary.035_AMT": InputType;
  "summary.040_SAC": InputType;
  "summary.040_SAC.050_TXI": InputType;
  "summary.060_ISS": InputType;
  "summary.060_ISS.065_PID": InputType;
  "summary.070_CTT": InputType;
  "heading.010_ST.01": DropdownType;
  "heading.020_BIG.01": LivingstoneSouthernWhiteFacedOwl;
  "heading.020_BIG.02": LivingstoneSouthernWhiteFacedOwl;
  "heading.020_BIG.03": LivingstoneSouthernWhiteFacedOwl;
  "heading.020_BIG.04": LivingstoneSouthernWhiteFacedOwl;
  "heading.020_BIG.07": DropdownType;
  "heading.020_BIG.08": InputType;
  "heading.020_BIG.09": InputType;
  "heading.020_BIG.10": InputType;
  "heading.030_NTE.01": DropdownType;
  "heading.050_REF.01": DropdownType;
  "heading.050_REF.02": LivingstoneSouthernWhiteFacedOwl;
  "heading.050_REF.03": InputType;
  "heading.050_REF.04": InputType;
  "heading.070_N1.070_N1.01": DropdownType;
  "heading.070_N1.070_N1.03": DropdownType;
  "heading.070_N1.070_N1.04": DetailType;
  "heading.070_N1.070_N1.02": LivingstoneSouthernWhiteFacedOwl;
  "heading.070_N1.070_N1.05": InputType;
  "heading.070_N1.070_N1.06": InputType;
  "heading.070_N1.100_N4.04": InputType;
  "heading.070_N1.100_N4.06": InputType;
  "heading.130_ITD.01": DropdownType;
  "heading.130_ITD.02": Heading130_ITD02;
  "heading.130_ITD.09": InputType;
  "heading.130_ITD.12": InputType;
  "heading.130_ITD.14": InputType;
  "heading.130_ITD.15": InputType;
  "heading.140_DTM.01": DropdownType;
  "heading.140_DTM.04": InputType;
  "heading.140_DTM.02": LivingstoneSouthernWhiteFacedOwl;
  "heading.240_N9.240_N9.01": DropdownType;
  "heading.240_N9.240_N9.02": LivingstoneSouthernWhiteFacedOwl;
  "heading.240_N9.240_N9.06": InputType;
  "heading.240_N9.240_N9.07": InputType;
  "heading.240_N9.240_N9.04": InputType;
  "heading.240_N9.250_MSG.01": LivingstoneSouthernWhiteFacedOwl;
  "heading.240_N9.250_MSG.03": InputType;
  "detail.010_IT1.010_IT1.03": DropdownType;
  "detail.010_IT1.010_IT1.04": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.010_IT1.06": DropdownType;
  "detail.010_IT1.010_IT1.08": DropdownType;
  "detail.010_IT1.010_IT1.10": DropdownType;
  "detail.010_IT1.060_PID.060_PID.01": DropdownType;
  "detail.010_IT1.060_PID.060_PID.02": DropdownType;
  "detail.010_IT1.060_PID.060_PID.04": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.060_PID.060_PID.06": InputType;
  "detail.010_IT1.060_PID.060_PID.08": InputType;
  "detail.010_IT1.060_PID.060_PID.07": InputType;
  "detail.010_IT1.060_PID.060_PID.09": InputType;
  "detail.010_IT1.100_PO4.02": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.100_PO4.06": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.100_PO4.08": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.100_PO4.09": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.100_PO4.10": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.100_PO4.11": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.100_PO4.12": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.100_PO4.14": DetailType;
  "detail.010_IT1.100_PO4.15": InputType;
  "detail.010_IT1.100_PO4.17": InputType;
  "detail.010_IT1.100_PO4.18": InputType;
  "detail.010_IT1.180_SAC.180_SAC.01": DropdownType;
  "detail.010_IT1.180_SAC.180_SAC.02": DropdownType;
  "detail.010_IT1.180_SAC.180_SAC.03": DropdownType;
  "detail.010_IT1.180_SAC.180_SAC.12": DropdownType;
  "detail.010_IT1.180_SAC.180_SAC.16": InputType;
  "summary.010_TDS.02": LivingstoneSouthernWhiteFacedOwl;
  "summary.010_TDS.01": LivingstoneSouthernWhiteFacedOwl;
  "summary.010_TDS.03": InputType;
  "summary.010_TDS.04": InputType;
  "summary.030_CAD.01": DropdownType;
  "summary.030_CAD.02": DetailType;
  "detail.010_IT1.180_SAC.180_SAC.05": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.180_SAC.180_SAC.08": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.180_SAC.180_SAC.09": DropdownType;
  "detail.010_IT1.180_SAC.180_SAC.10": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.180_SAC.180_SAC.11": LivingstoneSouthernWhiteFacedOwl;
  "detail.010_IT1.180_SAC.180_SAC.14": LivingstoneSouthernWhiteFacedOwl;
  "summary.030_CAD.07": DropdownType;
  "summary.030_CAD.09": InputType;
  "summary.040_SAC.040_SAC.01": DropdownType;
  "summary.040_SAC.040_SAC.02": DropdownType;
  "summary.040_SAC.040_SAC.03": DropdownType;
  "summary.040_SAC.040_SAC.04": LivingstoneSouthernWhiteFacedOwl;
  "summary.040_SAC.040_SAC.05": LivingstoneSouthernWhiteFacedOwl;
  "summary.040_SAC.040_SAC.06": DropdownType;
  "summary.040_SAC.040_SAC.12": Summary040_SAC040_SAC12;
  "summary.040_SAC.040_SAC.16": InputType;
  "summary.060_ISS.060_ISS.02": DropdownType;
  "summary.060_ISS.060_ISS.04": DropdownType;
  "summary.060_ISS.060_ISS.07": InputType;
  "summary.060_ISS.060_ISS.08": InputType;
  "summary.070_CTT.02": InputType;
  "summary.070_CTT.07": InputType;
  "heading.070_N1.070_N1": ConditionalType;
  "heading.240_N9.240_N9": ConditionalType;
  "heading.240_N9.240_N9.05": InputType;
  "heading.240_N9.250_MSG": ConditionalType;
  "heading.240_N9.250_MSG.02": InputType;
  "detail.010_IT1.060_PID.060_PID": ConditionalType;
  "detail.010_IT1.100_PO4.01": InputType;
  "detail.010_IT1.180_SAC.180_SAC.06": DropdownType;
}

export interface InputType {
  requirement: Requirement;
}

export enum Requirement {
  Mandatory = "mandatory",
  NotUsed = "not_used",
  Optional = "optional",
}

export interface DropdownType {
  codes: string[];
}

export interface LivingstoneSouthernWhiteFacedOwl {
  definition: string;
}

export interface ConditionalType {
  conditions: Condition[];
}

export interface Condition {
  elements: number[];
  type: Type;
}

export enum Type {
  C = "C",
  R = "R",
}

export interface DetailType {
  definition: string;
  requirement: Requirement;
}

export interface Heading130_ITD02 {
  codes: string[];
  requirement: Requirement;
}

export interface Summary040_SAC040_SAC12 {
  codes: string[];
  custom_code_definitions: CustomCodeDefinitions;
}

export interface CustomCodeDefinitions {
  [key: string]: unknown;
}
