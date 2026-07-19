<script setup>
import { computed, nextTick, reactive, ref, watch } from "vue";
import ButtonPrimaryComponent from "../main/ButtonPrimaryComponent.vue";
import ModalComponent from "../main/ModalComponent.vue";
import { useToast } from "vue-toast-notification";
import InputGroupComponent from "../main/InputGroupComponent.vue";

const { showModal, optionsChildren } = defineProps({
	showModal: { type: Boolean, required: true },
	onClose: { type: Function, required: true },
	isLoading: { type: Boolean, required: true },
	optionsChildren: { type: [Array, null], required: true },
});
const emit = defineEmits(["handleSubmitChild"]);

const $toast = useToast();

let selectedChild = reactive([]);

const keyword = ref("");
const groupedChildren = computed(() => {
	if (!optionsChildren) {
        return {};
    }
	const filtered = optionsChildren.filter((child) => child.label.toLowerCase().includes(keyword.value.toLowerCase()));

	return filtered.reduce((groups, child) => {
		const kelas = child.kelas;

		if (!groups[kelas]) {
			groups[kelas] = [];
		}

		groups[kelas].push(child);

		return groups;
	}, {});
});

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
		console.log(optionsChildren);
	}
);
</script>

<template>
	<ModalComponent :show-modal="showModal" :on-close="onClose" modal-title="Add Children" :is-loading="isLoading">
		<template #modalContent>
			<InputGroupComponent
				ref="inputSearch"
				type="text"
				groupName=""
				name="keyword"
				placeholder="Search child..."
				:is-required="false"
				v-model="keyword"
				class="w-full"
				tabindex="1"
			/>
			<form class="mt-8 mb-5 space-y-5 md:space-y-7 text-left" action="#">
				<div v-if="Object.keys(groupedChildren).length" class="space-y-6">
					<div v-for="(children, kelas) in groupedChildren" :key="kelas">
						<h3 class="font-semibold text-lg border-b pb-2 mb-3">
							{{ kelas }}
						</h3>

						<div class="grid grid-cols-3 gap-4">
							<div
								v-for="(child, index) in children"
								:key="child.value"
								class="flex items-center gap-3"
							>
								<input
									type="checkbox"
									class="w-6 h-6"
									:id="child.value"
									@change="handleCheck(child.value, child.label)"
									:tabindex="index + 1"
									:checked="selectedChild.some(item => item.childrenId === child.value)"
								/>

								<label :for="child.value" class="cursor-pointer">
									{{ child.label }}
								</label>
							</div>
						</div>
					</div>
				</div>

				<div v-else class="text-center py-5">
					No Data
				</div>
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
