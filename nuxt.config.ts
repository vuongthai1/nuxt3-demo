import { NuxtConfig } from "@nuxt/types";
import { createResolver } from "@nuxt/kit";
import { httpEndpoint } from "./services/https/endpoints";
import { appSettings } from "./app-settings";
const { resolve } = createResolver(import.meta.url);
const config: NuxtConfig = {
  // Nuxt configuration options
  head: {
    title: "My Nuxt App",
  },
  axios: {
    baseURL: appSettings.baseURL,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.baseURL,
    },
  },
  plugins: ["~/plugins/axios.ts"],

  auth: {
    redirect: {
      login: false,
      logout: "/",
      //callback: "/auth/signin"*/
      home: false,
    },
    //redirect: false,
    rewriteRedirects: false,
    strategies: {
      local: {
        token: {
          property: "jwtToken",
          global: true,
          required: true,
          type: "Bearer",
          maxAge: 36000,
        },
        user: {
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: { url: httpEndpoint.auth.login, method: "post" },
          logout: false,
          user: false,
        },
      },
    },
  },
  components: true,

  buildModules: ["@nuxt/typescript-build", "@nuxt/sass"],

  sourcemap: {
    server: false,
    client: false,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/scss/index.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  async nuxtServerInit({ dispatch }: any): Promise<void> {
    await dispatch("fetchData");
  },
  server: {
    port: 3000,
    host: "localhost",
  },
};

export default config;
