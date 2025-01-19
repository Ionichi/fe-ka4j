<script setup>
import LoadingComponent from "./LoadingComponent.vue";

defineProps({
	text: {
		type: String,
		required: true,
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
	onClick: Function,
	isDisabled: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<button
		type="button"
		class="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center gap-3 dark:highlight-white/20"
		@click="onClick"
		:disabled="isDisabled"
		:class="
			isLoading
				? 'bg-slate-500 dark:bg-sky-300'
				: 'bg-slate-900 hover:bg-slate-700 dark:bg-sky-500 dark:hover:bg-sky-400'
		"
	>
		<slot v-if="!isLoading" name="icon"></slot>
		<LoadingComponent v-if="isLoading" />
		{{ isLoading ? "Loading..." : text }}
	</button>
</template>
