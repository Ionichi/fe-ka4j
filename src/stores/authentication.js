import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth-store", () => {
	const isAuthenticated = ref(false);
	const isAdmin = ref(false);
	const user = ref(null);

	const getAuthStatus = computed(() => isAuthenticated.value);
	const getAdminStatus = computed(() => isAdmin.value);
	const getUser = computed(() => user.value);

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
			const message = error.response.data.message;
			const formatMessage = message.charAt(0).toUpperCase() + message.slice(1);

			console.log(formatMessage);
		}
	};

	const logout = async () => {
		try {
			await axios.post("/auth/logout");
			isAuthenticated.value = false;
			user.value = null;
			isAdmin.value = false;
		} catch (error) {
			throw error.response.data.message;
		}
	};

	return { getAuthStatus, getAdminStatus, getUser, login, validateAuth, logout };
});
