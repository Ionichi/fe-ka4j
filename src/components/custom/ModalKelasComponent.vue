<script setup>
import { nextTick, ref, watch } from "vue";
import ButtonPrimaryComponent from "../main/ButtonPrimaryComponent.vue";
import ModalComponent from "../main/ModalComponent.vue";
import InputGroupComponent from "../main/InputGroupComponent.vue";

const { showModal, dataEdit } = defineProps({
	showModal: { type: Boolean, required: true },
	onClose: { type: Function, required: true },
	isLoading: { type: Boolean, required: true },
	dataEdit: { type: [Object, null], required: true },
});
const emit = defineEmits(["handleSubmit"]);

const className = ref({
	id: "",
	nama: "",
});
const inputClassName = ref(null);

const isInputValid = () => {
	return className.value.nama && (dataEdit ? className.value.id : true);
};

const handleEnter = (event) => {
	if (event.key === "Enter") {
		handleSubmit(event);
	}
};

const handleSubmit = (event) => {
	event.preventDefault();
	if (isInputValid()) {
		emit("handleSubmit", className.value);
	}
};

watch(
	() => showModal,
	async () => {
		await nextTick();
		if (showModal) {
			inputClassName.value.inputRef.focus();
		} else {
			className.value.id = "";
			className.value.nama = "";
		}
	}
);

watch(
	() => dataEdit,
	(data) => {
		className.value.id = data?.id;
		className.value.nama = data?.nama;
	}
);
</script>

<template>
	<ModalComponent :show-modal="showModal" :on-close="onClose" modal-title="Class Management" :is-loading="isLoading">
		<template #modalContent>
			<form class="mt-8 mb-5 space-y-5 md:space-y-7" action="#">
				<InputGroupComponent
					ref="inputClassName"
					groupName="Class Name"
					type="text"
					name="nama"
					placeholder="Ex: Joy"
					:isRequired="true"
					v-model="className.nama"
					:handleKeyDown="handleEnter"
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
