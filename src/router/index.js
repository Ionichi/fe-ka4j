import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import DashboardView from "@/views/pages/DashboardView.vue";
import NotFoundView from "@/views/pages/NotFoundView.vue";
import LoginView from "@/views/pages/LoginView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/:catchAll(.*)",
			redirect: "not-found",
		},
		{
			path: "/",
			name: "landing",
			component: LandingView,
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: DashboardView,
			// component: () => import('@/views/DashboardView.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/auth/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/not-found",
			name: "not-found",
			component: NotFoundView,
			// component: () => import('@/views/pages/NotFoundView.vue'),
		},
	],
});

// router.beforeEach(async (to, from, next) => {
// 	const authStore = useAuthStore();
// 	await authStore.validateAuth();

// 	if (to.matched.some((record) => record.meta.requiresAuth)) {
// 		if (!authStore.getAuthStatus) {
// 			next("/auth/login");
// 		} else {
// 			next();
// 		}
// 	} else {
// 		if (to.path === "/auth/login" && authStore.getAuthStatus) {
// 			next("/");
// 		} else {
// 			next();
// 		}
// 	}
// });

export default router;
