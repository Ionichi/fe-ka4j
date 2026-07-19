<script setup>
import { nextTick, reactive, ref, watch } from "vue";
import ButtonPrimaryComponent from "../main/ButtonPrimaryComponent.vue";
import ModalComponent from "../main/ModalComponent.vue";
import InputGroupComponent from "../main/InputGroupComponent.vue";

const { showModal } = defineProps({
	showModal: { type: Boolean, required: true },
	onClose: { type: Function, required: true },
	isLoading: { type: Boolean, required: true },
});
const emit = defineEmits(["handleSubmit"]);

const seasonDate = reactive({
	id: "",
	tgl: "",
});
const inputSeasonDate = ref(null);

const isInputValid = () => {
	return seasonDate.tgl;
};

const handleEnter = (event) => {
	if (event.key === "Enter") {
		handleSubmit(event);
	}
};

const handleSubmit = (event) => {
	event.preventDefault();
	if (isInputValid()) {
		emit("handleSubmit", seasonDate);
	}
};

watch(
	() => showModal,
	async () => {
		await nextTick();
		if (showModal) {
			inputSeasonDate.value.inputRef.focus();
		} else {
			seasonDate.id = "";
			seasonDate.tgl = "";
		}
	}
);
</script>

<template>
	<ModalComponent :show-modal="showModal" :on-close="onClose" modal-title="Class Management" :is-loading="isLoading">
		<template #modalContent>
			<form class="mt-8 mb-5 space-y-5 md:space-y-7" action="#">
				<InputGroupComponent
					ref="inputSeasonDate"
					group-name="Season Date"
					type="date"
					name="tgl"
					placeholder="--/--/----"
					:is-required="true"
					v-model="seasonDate.tgl"
					:handleKeyDown="handleEnter"
					class="w-full"
					tabindex="5"
				/>
			</form>
		</template>
		<template #modalButton>
			<ButtonPrimaryComponent
				class="text-sm w-full sm:ml-3 sm:w-auto"
				text="Save"
				:isDisabled="isLoading"
				:isLoading="isLoading"
				:onClick="handleSubmit"
			/>
		</template>
	</ModalComponent>
</template>
