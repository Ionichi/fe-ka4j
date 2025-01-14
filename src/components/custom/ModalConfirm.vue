<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LoadingComponent from "../main/LoadingComponent.vue";
import ModalComponent from "../main/ModalComponent.vue";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const { dataDel } = defineProps({
	showModal: { type: Boolean, required: true },
	onClose: { type: Function, required: true },
	isLoading: { type: Boolean, required: true },
	dataDel: { type: [String, null], required: true },
});

const emit = defineEmits(["handleConfirmSubmit"]);

const handleSubmit = () => {
	emit("handleConfirmSubmit", dataDel);
};
</script>
<template>
	<ModalComponent :show-modal="showModal" :on-close="onClose" modal-title="Confirmation!" :is-loading="isLoading">
		<template #modalContent>
			<p class="py-8">Are you sure you want to permanently remove this data?</p>
		</template>
		<template #modalButton>
			<button
				type="button"
				class="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center gap-3 dark:highlight-white/20 text-sm sm:ml-3 sm:w-auto"
				@click="handleSubmit"
				:disabled="isLoading"
				:class="isLoading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-400'"
			>
				<LoadingComponent v-if="isLoading" />
				{{ isLoading ? "Loading..." : "Yes" }}
				<FontAwesomeIcon :icon="faTrashAlt" />
			</button>
		</template>
	</ModalComponent>
</template>
