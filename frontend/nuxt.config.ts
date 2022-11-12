// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // set the target to static 

  target: 'static',

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
