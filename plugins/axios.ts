// import axios, { AxiosInstance } from "axios";

import { appSettings } from "~/app-settings";

import axios from "axios";
import { httpEndpoint } from "~/services/https/endpoints";
export default defineNuxtPlugin(async () => {
  let api = axios.create({
    baseURL: appSettings.baseURL,
    headers: {
      common: {
        Accept: "text/plain, */*",
      },
      LMApiKey: "YWljb2tleW5heW1vaWR1b2N0cnV5Y2FwdmFvZGF5",
    },
  });
  // axios.request((config: { url: string; }) => {
  //       console.log("Making request to " + config.url)
  //   })
  const baseURL = appSettings.baseURL;
  axios
    .request({
      url: `${baseURL}${httpEndpoint.auth.getAuthenInfo}`,
    })
    .then((response) => {
      console.log("Making request to " + response.config.url);
    })
    .catch((error) => {
      console.error(error);
    });
  return {
    provide: {
      api: api,
      baseURL: baseURL,
    },
  };
});
