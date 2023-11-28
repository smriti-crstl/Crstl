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
  "heading.040_DTM": InputType;
  "detail.010_HL.020_LIN": InputType;
  "detail.010_HL.030_SN1": InputType;
  "detail.010_HL.040_SLN": InputType;
  "detail.010_HL.050_PRF": InputType;
  "detail.010_HL.060_PO4": InputType;
  "detail.010_HL.070_PID": InputType;
  "detail.010_HL.080_MEA": InputType;
  "detail.010_HL.090_PWK": InputType;
  "detail.010_HL.100_PKG": InputType;
  "detail.010_HL.110_TD1": InputType;
  "detail.010_HL.120_TD5": InputType;
  "detail.010_HL.130_TD3": InputType;
  "detail.010_HL.140_TD4": InputType;
  "detail.010_HL.145_TSD": InputType;
  "detail.010_HL.150_REF": InputType;
  "detail.010_HL.151_PER": InputType;
  "detail.010_HL.152_LH1": InputType;
  "detail.010_HL.152_LH1.153_LH2": InputType;
  "detail.010_HL.152_LH1.154_LH3": InputType;
  "detail.010_HL.152_LH1.155_LFH": InputType;
  "detail.010_HL.152_LH1.156_LEP": InputType;
  "detail.010_HL.152_LH1.157_LH4": InputType;
  "detail.010_HL.152_LH1.158_LHT": InputType;
  "detail.010_HL.152_LH1.159_LHR": InputType;
  "detail.010_HL.152_LH1.160_PER": InputType;
  "detail.010_HL.152_LH1.161_LHE": InputType;
  "detail.010_HL.170_CLD": InputType;
  "detail.010_HL.170_CLD.180_REF": InputType;
  "detail.010_HL.170_CLD.185_DTP": InputType;
  "detail.010_HL.190_MAN": InputType;
  "detail.010_HL.200_DTM": InputType;
  "detail.010_HL.210_FOB": InputType;
  "detail.010_HL.215_PAL": InputType;
  "detail.010_HL.220_N1": InputType;
  "detail.010_HL.220_N1.230_N2": InputType;
  "detail.010_HL.220_N1.240_N3": InputType;
  "detail.010_HL.220_N1.250_N4": InputType;
  "detail.010_HL.220_N1.260_REF": InputType;
  "detail.010_HL.220_N1.270_PER": InputType;
  "detail.010_HL.220_N1.280_FOB": InputType;
  "detail.010_HL.290_SDQ": InputType;
  "detail.010_HL.300_ETD": InputType;
  "detail.010_HL.310_CUR": InputType;
  "detail.010_HL.320_SAC": InputType;
  "detail.010_HL.320_SAC.325_CUR": InputType;
  "detail.010_HL.330_GF": InputType;
  "detail.010_HL.335_YNQ": InputType;
  "detail.010_HL.340_LM": InputType;
  "detail.010_HL.360_V1": InputType;
  "detail.010_HL.360_V1.370_R4": InputType;
  "detail.010_HL.360_V1.380_DTM": InputType;
  "summary.010_CTT": InputType;
  "heading.010_ST.01": DropdownType;
  "heading.020_BSN.01": DropdownType;
  "heading.020_BSN.05": DropdownType;
  "heading.020_BSN.07": InputType;
  "detail.010_HL.010_HL.03": DropdownType;
  "detail.010_HL.010_HL.04": InputType;
  "detail.010_HL.020_LIN.02": DropdownType;
  "detail.010_HL.020_LIN.06": DropdownType;
  "detail.010_HL.030_SN1.02": InputType;
  "detail.010_HL.030_SN1.03": DropdownType;
  "detail.010_HL.030_SN1.04": InputType;
  "detail.010_HL.030_SN1.07": InputType;
  "detail.010_HL.030_SN1.08": InputType;
  "detail.010_HL.050_PRF.02": InputType;
  "detail.010_HL.050_PRF.03": InputType;
  "detail.010_HL.050_PRF.04": InputType;
  "detail.010_HL.050_PRF.05": InputType;
  "detail.010_HL.050_PRF.01": InputType;
  "detail.010_HL.050_PRF.06": InputType;
  "detail.010_HL.050_PRF.07": InputType;
  "detail.010_HL.060_PO4.15": InputType;
  "detail.010_HL.060_PO4.14": InputType;
  "detail.010_HL.060_PO4.17": InputType;
  "detail.010_HL.060_PO4.18": InputType;
  "detail.010_HL.070_PID.01": DropdownType;
  "detail.010_HL.070_PID.03": DropdownType;
  "detail.010_HL.070_PID.04": InputType;
  "detail.010_HL.070_PID.05": InputType;
  "detail.010_HL.070_PID.06": InputType;
  "detail.010_HL.070_PID.07": InputType;
  "detail.010_HL.070_PID.08": InputType;
  "detail.010_HL.070_PID.09": InputType;
  "detail.010_HL.120_TD5.01": DropdownType;
  "detail.010_HL.120_TD5.02": DropdownType;
  "detail.010_HL.120_TD5.04": DropdownType;
  "detail.010_HL.120_TD5.05": InputType;
  "detail.010_HL.120_TD5.03": InputType;
  "detail.010_HL.120_TD5.07": InputType;
  "detail.010_HL.120_TD5.09": InputType;
  "detail.010_HL.120_TD5.10": InputType;
  "detail.010_HL.120_TD5.14": InputType;
  "detail.010_HL.120_TD5.15": InputType;
  "detail.010_HL.150_REF.01": DropdownType;
  "detail.010_HL.150_REF.04": InputType;
  "detail.010_HL.150_REF.02": InputType;
  "detail.010_HL.190_MAN.01": DropdownType;
  "detail.010_HL.190_MAN.02": InputType;
  "detail.010_HL.190_MAN.05": InputType;
  "detail.010_HL.200_DTM.01": DropdownType;
  "detail.010_HL.220_N1.220_N1.03": DropdownType;
  "detail.010_HL.220_N1.220_N1.04": InputType;
  "detail.010_HL.220_N1.220_N1.01": DropdownType;
  "detail.010_HL.220_N1.220_N1.05": InputType;
  "detail.010_HL.220_N1.220_N1.06": DropdownType;
  "summary.010_CTT.01": InputType;
  "summary.010_CTT.02": InputType;
  "summary.010_CTT.07": InputType;
  "detail.010_HL.020_LIN.04": DropdownType;
  "detail.010_HL.060_PO4.05": InputType;
  "detail.010_HL.060_PO4.06": InputType;
  "detail.010_HL.060_PO4.07": InputType;
  "detail.010_HL.060_PO4.10": InputType;
  "detail.010_HL.060_PO4.11": InputType;
  "detail.010_HL.060_PO4.12": InputType;
  "detail.010_HL.060_PO4.13": InputType;
}

export interface DropdownType {
  codes: string[];
  requirement?: Requirement;
  definition?: string;
}

export interface InputType {
  requirement: Requirement;
  conditions?: Condition[];
  definition?: string;
}

export enum Requirement {
  Mandatory = "mandatory",
  NotUsed = "not_used",
  Optional = "optional",
}

export interface InputType {
  requirement: Requirement;
}

export interface Condition {
  elements: number[];
  type: Type;
}

export enum Type {
  C = "C",
  P = "P",
  R = "R",
}
