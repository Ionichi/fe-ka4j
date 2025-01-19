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
	isReadOnly: {
		type: Boolean,
		default: false,
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
		<input
			:data-id="name"
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
			:readonly="isReadOnly"
		/>
	</div>
</template>
