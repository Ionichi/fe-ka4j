<script setup>
import HeaderComponent from "@/components/main/HeaderComponent.vue";
import LoadingComponent from "@/components/main/LoadingComponent.vue";
import SidebarComponent from "@/components/main/SidebarComponent.vue";
import DashboardService from "@/services/dashboard";
import { onMounted, reactive, ref } from "vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const dataCard = reactive({
	totalClass: 0,
	totalChildren: 0,
	totalCoupon: 0,
	totalBoyChildren: 0,
	totalGirlChildren: 0,
});
const isLoading = ref(false);

const fetchData = async () => {
	isLoading.value = true;
	try {
		const response = await DashboardService.getData();
		dataCard.totalClass = response.data.totalClass;
		dataCard.totalChildren = response.data.totalChildren;
		dataCard.totalCoupon = response.data.totalCoupon;
		dataCard.totalBoyChildren = response.data.totalBoyChildren;
		dataCard.totalGirlChildren = response.data.totalGirlChildren;

		$toast.success(response.message, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	} catch (error) {
		$toast.error(error, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchData();
});
</script>

<template>
	<HeaderComponent />
	<SidebarComponent />

	<div class="p-4 sm:ml-64 min-h-screen">
		<div v-if="!isLoading" class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
			<div class="grid grid-cols-3 gap-4 mb-4">
				<div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Class</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">
						{{ dataCard.totalClass || "-" }}
					</span>
				</div>
				<div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Children</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">
						{{ dataCard.totalChildren || "-" }}
					</span>
				</div>
				<div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Coupon</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">
						{{ dataCard.totalCoupon || "-" }}
					</span>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4 mb-4">
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Boy</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">
						{{ dataCard.totalBoyChildren || "-" }}
					</span>
				</div>
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Girl</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">
						{{ dataCard.totalGirlChildren || "-" }}
					</span>
				</div>
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p class="text-2xl text-gray-400 dark:text-gray-500">
						<svg
							class="w-3.5 h-3.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</p>
				</div>
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p class="text-2xl text-gray-400 dark:text-gray-500">
						<svg
							class="w-3.5 h-3.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</p>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p class="text-2xl text-gray-400 dark:text-gray-500">
						<svg
							class="w-3.5 h-3.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</p>
				</div>
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p class="text-2xl text-gray-400 dark:text-gray-500">
						<svg
							class="w-3.5 h-3.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</p>
				</div>
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p class="text-2xl text-gray-400 dark:text-gray-500">
						<svg
							class="w-3.5 h-3.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</p>
				</div>
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p class="text-2xl text-gray-400 dark:text-gray-500">
						<svg
							class="w-3.5 h-3.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</p>
				</div>
			</div>
		</div>
		<div
			v-else
			class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20 min-h-screen dark:text-white grid items-center justify-center"
		>
			<div class="loader-overlay flex flex-col gap-3 items-center">
				<LoadingComponent />
				<span class="text-xl loading-text">Loading...</span>
			</div>
		</div>
	</div>
</template>
<style>
.loader-overlay {
	.w-8 {
		width: 8rem !important;
	}
	.h-8 {
		height: 8rem !important;
	}
}

.loading-text {
	display: inline-block;
	clip-path: inset(0 1.3ch 0 0);
	animation: loadingDot 1.5s steps(4, jump-none) infinite;
}

@keyframes loadingDot {
	to {
		clip-path: inset(0);
	}
}
</style>
