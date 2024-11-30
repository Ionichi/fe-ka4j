import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import DashboardView from "@/views/pages/DashboardView.vue";
import NotFoundView from "@/views/pages/NotFoundView.vue";
import LoginView from "@/views/pages/LoginView.vue";
import { useAuthStore } from "@/stores/authentication";
import UserView from "@/views/pages/UserView.vue";
import KelasView from "@/views/pages/KelasView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/:catchAll(.*)",
			redirect: "not-found",
		},
		{
			path: "/not-found",
			name: "not-found",
			component: NotFoundView,
			// component: () => import('@/views/pages/NotFoundView.vue'),
		},
		{
			path: "/",
			name: "landing",
			component: LandingView,
		},
		{
			path: "/auth/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/class",
			name: "class",
			component: KelasView,
			meta: {
				requiresAuth: true,
				requiresAdmin: true,
			},
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: DashboardView,
			meta: {
				requiresAuth: true,
				requiresAdmin: true,
			},
		},
		{
			path: "/users",
			name: "users",
			component: UserView,
			meta: {
				requiresAuth: true,
				requiresAdmin: true,
			},
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	await authStore.validateAuth();

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (to.matched.some((record) => record.meta.requiresAdmin)) {
			if (!authStore.getAdminStatus) {
				next("/auth/login");
			} else {
				next();
			}
		} else {
			if (!authStore.getAuthStatus) {
				next("/auth/login");
			} else {
				next();
			}
		}
	} else {
		if (to.path === "/auth/login" && authStore.getAuthStatus) {
			next("/dashboard");
		} else {
			next();
		}
	}
});

export default router;
