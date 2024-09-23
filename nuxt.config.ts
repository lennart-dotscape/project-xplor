// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/leaflet", "@nuxtjs/tailwindcss", "@nuxt/content"],
	css: ["leaflet/dist/leaflet.css", "leaflet-routing-machine/dist/leaflet-routing-machine.css", "/assets/css/tailwind.css"],
});
