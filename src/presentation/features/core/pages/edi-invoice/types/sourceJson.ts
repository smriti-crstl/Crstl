export interface SourceJSON {
  BIG_373_01: string;
  BIG_373_03: string;
  BIG_76_02: string;
  BIG_324_04: string;
  BIG_640_07: string;
  REF_128_01: string;
  REF_127_02: string;
  heading_N1: { [key: string]: string }[];
  ITD_336_01: string;
  ITD_333_02: string;
  ITD_338_03: string;
  ITD_370_04: string;
  ITD_351_05: string;
  ITD_446_06: string;
  ITD_386_07: string;
  ITD_362_08: string;
  DTM_374_01: string;
  DTM_373_02: string;
  heading_N9: { [key: string]: string }[];
  IT1_loop: IT1Loop[];
  TDS_610_01: string;
  TDS_610_02: string;
  CAD_91_01: string;
  CAD_140_04: string;
  CAD_387_05: string;
  CAD_128_07: string;
  CAD_127_08: string;
  summary_SAC: { [key: string]: string }[];
  summary_ISS: { [key: string]: string }[];
  ST_143_01: string;
  ST_329_02: string;
  ST_363_01: string;
  ST_363_02: string;
  CTT_354_01: string;
  SE_96_01: string;
  SE_329_02: string;
}

export interface IT1Loop {
  IT1_350_01: string;
  IT1_358_02: string;
  IT1_355_03: string;
  IT1_212_04: string;
  IT1_235_06: string;
  IT1_234_07: string;
  IT1_235_08: string;
  IT1_235_10: string;
  IT1_234_11: string;
  IT1_368_03: string;
  PO4_356_01: string;
  PO4_810_14: string;
  PID_loop?: { [key: string]: string }[];
  SAC_loop?: { [key: string]: string }[];
  SLN_loop?: { [key: string]: string }[];
}
