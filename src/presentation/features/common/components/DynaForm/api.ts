import axios from "axios";
import { useMutation } from "react-query";

const API_KEY = "";

async function postSourceJson(requestData: any) {
  return axios.post(
    "https://mappings.stedi.com/2021-06-01/mappings/01G0BHZ6RDGAWADSDHJP3CM3W9/map",
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

export { usePostSourceJson, usePostTranslate, postSourceJson };
