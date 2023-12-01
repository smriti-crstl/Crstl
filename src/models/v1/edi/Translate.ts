// TODO: investigate the response types we're sending for various endpoints, etc and standardise the shape
export interface TranslateResponse {
  code: string;
  output: any;
  control_numbers: any;
  errors?: TranslateError[];
}

export interface TranslateError {
  code: string;
  message: string;
  path: string[];
  severity: string;
}

export interface StediGuidesV2X12ToJsonResponse {
  status: number;
  output?: string;
  errors?: TranslateError[];
}

export const stediGuidesV2X12ToJsonResponse = (
  status: number,
  output?: string,
  errors?: TranslateError[]
) => {
  return {
    status: status,
    output: output,
    errors: errors
  };
};

export const stediGuidesV2X12ToJsonOkResponse = (
  output?: string,
  errors?: TranslateError[]
) => {
  return {
    status: 200,
    output: output,
    errors: errors
  };
};

export const stediGuidesV2X12ToJsonBadRequestResponse = (
  errors: TranslateError[]
) => {
  return {
    status: 400,
    errors: errors
  };
};

export const stediGuidesV2X12ToJsonInternalServerErrorResponse = (
  errors: TranslateError[]
) => {
  return {
    status: 400,
    errors: errors
  };
};
