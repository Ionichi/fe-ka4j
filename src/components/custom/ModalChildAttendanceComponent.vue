<script setup>
import { nextTick, reactive, watch } from "vue";
import ButtonPrimaryComponent from "../main/ButtonPrimaryComponent.vue";
import ModalComponent from "../main/ModalComponent.vue";
import { useToast } from "vue-toast-notification";

const { showModal, optionsChildren } = defineProps({
	showModal: { type: Boolean, required: true },
	onClose: { type: Function, required: true },
	isLoading: { type: Boolean, required: true },
	optionsChildren: { type: [Array, null], required: true },
});
const emit = defineEmits(["handleSubmitChild"]);

const $toast = useToast();

let selectedChild = reactive([]);

const isInputValid = () => {
	return selectedChild.length > 0;
};

const handleCheck = (childrenId, nama) => {
	const index = selectedChild.findIndex((item) => item.childrenId === childrenId);

	if (index !== -1) {
		selectedChild.splice(index, 1);
	} else {
		selectedChild.push({ childrenId, nama });
	}
};

const handleSubmit = (event) => {
	event.preventDefault();
	if (isInputValid()) {
		emit("handleSubmitChild", selectedChild);
	} else {
		$toast.warning("Please ensure all required fields are filled correctly.", {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	}
};

watch(
	() => showModal,
	async () => {
		await nextTick();
		if (!showModal) {
			selectedChild = [];
		}
	}
);
</script>

<template>
	<ModalComponent :show-modal="showModal" :on-close="onClose" modal-title="Add Children" :is-loading="isLoading">
		<template #modalContent>
			<form class="mt-8 mb-5 space-y-5 md:space-y-7 text-left" action="#">
				<div v-if="optionsChildren != null && optionsChildren.length" class="grid grid-cols-3 gap-5 mb-3">
					<div
						v-for="(child, index) in optionsChildren"
						:key="Math.random() + index"
						class="flex items-center gap-3"
					>
						<input
							type="checkbox"
							class="w-6 h-6"
							:id="child['value']"
							@change="handleCheck(child['value'], child['label'])"
							:checked="false"
							:tabindex="index + 1"
						/>
						<label :for="'#' + child['value']" class="text-wrap">{{ child["label"] }}</label>
					</div>
				</div>
				<div v-else class="text-center">No Data</div>
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
