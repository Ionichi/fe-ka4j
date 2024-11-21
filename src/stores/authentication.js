import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth-store", () => {
	const isAuthenticated = ref(false);
	const isAdmin = ref(false);
	const user = ref(null);

	const getAuthStatus = computed(() => isAuthenticated.value);
	const getAdminStatus = computed(() => isAdmin.value);

	const login = async (payload) => {
		try {
			const response = await axios.post("/auth/login", payload).then((res) => res.data);
			isAuthenticated.value = true;
			user.value = response.data.user;
			isAdmin.value = response.data.user.isAdmin;
		} catch (error) {
			isAuthenticated.value = false;
			user.value = null;
			isAdmin.value = false;
			throw error.response.data.message;
		}
	};

	const validateAuth = async () => {
		try {
			const response = await axios.post("/auth/validate").then((res) => res.data);
			isAuthenticated.value = true;
			user.value = response.data.user;
			isAdmin.value = response.data.user.isAdmin;
		} catch (error) {
			isAuthenticated.value = false;
			user.value = null;
			isAdmin.value = false;
			console.log(error.response.data.message);
		}
	};

	return { isAuthenticated, getAuthStatus, getAdminStatus, user, login, validateAuth };
});
