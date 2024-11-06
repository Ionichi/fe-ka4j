import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "@/views/WelcomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/welcome",
			name: "welcome",
			component: WelcomeView,
		},
		{
			path: "/",
			name: "landing",
			redirect: "welcome",
		},
	],
});

export default router;
