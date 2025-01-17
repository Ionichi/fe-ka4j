<script setup>
import { ref } from "vue";

defineProps({
	groupName: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	placeholder: String,
	isRequired: {
		type: Boolean,
		default: false,
	},
	handleKeyDown: {
		type: Function,
		required: false,
	},
	tabindex: {
		type: String,
		required: false,
	},
	options: {
		type: [Array, null],
		required: true,
	},
});

const inputRef = ref(null);
defineExpose({
	inputRef,
});

const inputModel = defineModel();
</script>

<template>
	<div>
		<label :for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			{{ groupName }} <span v-if="isRequired" class="text-red-500">*</span>
		</label>
		<!-- <input
			ref="inputRef"
			:type="type"
			:name="name"
			:id="name"
			class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			:placeholder="placeholder"
			:required="isRequired"
			@keydown="handleKeyDown"
			v-model="inputModel"
			:tabindex="tabindex"
		/> -->
		<div class="grid">
			<select
				:data-id="name"
				ref="inputRef"
				:name="name"
				:id="name"
				class="w-full appearance-none forced-colors:appearance-auto border row-start-1 col-start-1 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 p-2.5"
				:required="isRequired"
				@keydown="handleKeyDown"
				v-model="inputModel"
				:tabindex="tabindex"
			>
				<option value="">-- Choose --</option>
				<option v-for="(option, index) in options" :key="index" :value="option['value']">
					{{ option["label"] }}
				</option>
			</select>
			<svg
				class="pointer-events-none z-10 right-3 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
				viewBox="0 0 16 16"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				></path>
			</svg>
		</div>
	</div>
</template>
