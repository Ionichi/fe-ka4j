import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMenu = defineStore("menu-action", () => {
	const isMenuOpen = ref(false);

	const getIsMenuOpen = computed(() => isMenuOpen.value);

	const handleMenuOpen = () => {
		isMenuOpen.value = !isMenuOpen.value;
	};

	return { getIsMenuOpen, handleMenuOpen };
});
