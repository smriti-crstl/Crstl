import axios from "axios";
import moment from "moment";
import { useMutation } from "react-query";

const testData = {
  "143_ST_01": "856",
  "96_SE_01": "112312",
  "1005_BSN_05": "0001",
  "329_ST_02": "Ctrl No",
  "353_BSN_01": "00",
  "396_BSN_02": "123",
  "373_BSN_03": moment("2022-04-04T19:46:17.176Z"),
  "337_BSN_04": moment("2022-04-04T19:00:00.559Z"),
  detail_HL: [
    {
      HL_01_628: "1",
      HL_02_734: "1",
      HL_03_735: "S",
      TD5_04_91: "A",
      TD5_02_66: "2",
      TD5_03_67: "Id code",
      TD5_01_133: "B",
      TD5_05_387: "Routing",
      REF_01_128: "CN",
      REF_02_127: "Ref Id",
      N1_01_98: "BS",
      N1_03_66: "91",
      N1_04_67: "Id code 2",
      N3_01_166: "Address info",
    },
    {
      HL_01_628: "1",
      HL_02_734: "1",
      HL_03_735: "S",
      TD5_04_91: "A",
      TD5_02_66: "2",
      TD5_03_67: "Id code",
      TD5_01_133: "B",
      TD5_05_387: "Routing 2",
      REF_01_128: "CN",
      REF_02_127: "Ref Id",
      N1_01_98: "BS",
      N1_03_66: "91",
      N1_04_67: "Id code 2",
      N3_01_166: "Address info",
    },
    {
      HL_01_628: "1",
      HL_02_734: "1",
      HL_03_735: "S",
      TD5_04_91: "A",
      TD5_02_66: "2",
      TD5_03_67: "Id code",
      TD5_01_133: "B",
      TD5_05_387: "Routing 3",
      REF_01_128: "CN",
      REF_02_127: "Ref Id",
      N1_01_98: "BS",
      N1_03_66: "91",
      N1_04_67: "Id code 2",
      N3_01_166: "Address info",
    },
  ],
};

const API_KEY = "";

async function postSourceJson(requestData: any) {
  return axios.post(
    "https://mappings.stedi.com/2021-06-01/mappings/01FZCNTXCCFX0MZNZMXE5SQCKX/map",
    requestData,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
}

async function postTranslate(requestData: any) {
  return axios.post(
    "https://edi-core.stedi.com/2021-06-05/translate",
    requestData,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
}

function usePostSourceJson() {
  return useMutation(postSourceJson);
}

function usePostTranslate() {
  return useMutation(postTranslate);
}

declare global {
  interface Window {
    postSourceJson: any;
  }
}

window.postSourceJson = postSourceJson;

export { usePostSourceJson, usePostTranslate, postSourceJson, testData };
