import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth-store", () => {
	const isAuthenticated = ref(false);
	const user = ref(null);

	const getAuthStatus = computed(() => isAuthenticated.value);

	const login = async (payload) => {
		try {
			const response = await axios.post("/auth/login", payload);
			isAuthenticated.value = true;
			user.value = response.data.user;
		} catch (error) {
			console.log({ error });
		}
	};

	return { isAuthenticated, getAuthStatus, user, login };
});
