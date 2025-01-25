<script setup>
import HeaderComponent from "@/components/main/HeaderComponent.vue";
import SidebarComponent from "@/components/main/SidebarComponent.vue";
</script>

<template>
	<HeaderComponent />
	<SidebarComponent />

	<div class="p-4 sm:ml-64 min-h-screen">
		<div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
			<div class="grid grid-cols-3 gap-4 mb-4">
				<div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Class</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">5</span>
				</div>
				<div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Children</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">3</span>
				</div>
				<div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Coupon</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">30</span>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4 mb-4">
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Boy</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">0</span>
				</div>
				<div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 flex-col">
					<h1 class="text-gray-900 dark:text-white font-semibold text-lg">Total Girl</h1>
					<span class="text-gray-900 dark:text-white font-bold text-3xl">3</span>
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
	</div>
</template>
