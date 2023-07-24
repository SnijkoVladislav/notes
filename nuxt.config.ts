export default {
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  nitro: {
    preset: "vercel-edge",
  },
  routeRules: {
    "/**": { ssr: false },
  },
};
