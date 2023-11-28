import moment from "moment";

export interface SourceJSON {
  ST_01_143: string;
  CTT_01_354: string;
  SE_01_96: string;
  BSN_05_1005: string;
  ST_02_329: string;
  BSN_01_353: string;
  BSN_02_396?: string;
  BSN_03_373?: string | moment.Moment;
  BSN_04_337?: string | moment.Moment;
  HL_S_01_628: string;
  HL_S_03_735: string;
  HL_S_TD1_01_103: string;
  HL_S_TD1_02_80: string;
  TD5_S_01_133: string;
  TD5_S_02_66: string;
  TD5_S_03_67?: string;
  TD5_S_04_91?: string;
  TD5_S_05_387?: string;
  REF_BM_S_01_128: string;
  REF_BM_S_02_127?: string;
  REF_CN_S_01_128: string;
  REF_CN_S_02_127?: string;

  N1_S_ST_01_98: string;
  N1_S_ST_02_93: string;
  N1_S_ST_03_66: string;
  N1_S_ST_04_67: string;
  N1_S_ST_05_706: string;
  N1_S_ST_06_98: string;

  N3_S_ST_01_166: string;
  N3_S_ST_02_166: string;

  N4_S_ST_01_19: string;
  N4_S_ST_02_156: string;
  N4_S_ST_03_116: string;
  N4_S_ST_04_26: string;
  N4_S_ST_05_309: string;

  HL_O_01_628: string;
  HL_O_02_734: string;
  HL_O_03_735: string;
  HL_O_PRF_01_324: string;
  HL_O_N1_01_98: string;
  HL_O_N1_03_66: string;
  HL_O_N1_04_67: string;
  HL_P_loop?: HLPLoop[];
}

export interface HLPLoop {
  HL_01_628: string;
  HL_02_734: string;
  HL_03_735: string;
  P04_01_356: string;
  MAN_01_88: string;
  MAN_02_87?: string;
  HL_I_Loop?: HLILoop[];
  containerIds?: string[];
  packCount?: number;
  totalQuantityShipped?: number;
}

export interface HLILoop {
  HL_01_628: string;
  HL_02_734: string;
  HL_03_735: string;
  LIN_01_350: string;
  LIN_02_235: string;
  LIN_03_234: string;
  LIN_04_235: string;
  LIN_05_234: string;
  LIN_07_234: string;
  SN1_02_382: string;
  SN1_03_355: string;
  PO4_01_356: string;
  PO4_14_810: string;
}
