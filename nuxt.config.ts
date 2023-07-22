export default {
  nitro: {
    preset: "vercel-edge",
  },
  routeRules: {
    "/": { ssr: false },
    "[id]": { ssr: false },
  },
};
