<script setup>
import { nextTick, reactive, ref, watch } from "vue";
import ButtonPrimaryComponent from "../main/ButtonPrimaryComponent.vue";
import ModalComponent from "../main/ModalComponent.vue";
import InputGroupComponent from "../main/InputGroupComponent.vue";
import InputSelectComponent from "../main/InputSelectComponent.vue";
import { useToast } from "vue-toast-notification";
import { useActiveElement } from "@vueuse/core";
import DateHelper from "@/utils/dateHelper";

const { showModal, dataEdit } = defineProps({
	showModal: { type: Boolean, required: true },
	onClose: { type: Function, required: true },
	isLoading: { type: Boolean, required: true },
	dataEdit: { type: [Object, null], required: true },
	optionsKelas: { type: [Array, null], required: true },
});
const emit = defineEmits(["handleSubmit"]);

const $toast = useToast();
const activeElement = useActiveElement();

const userData = reactive({
	id: "",
	nama: "",
	gender: "",
	tglLahir: "",
	namaParent: "",
	kontak: "",
	isJemaat: false,
	kelas: "",
});

const optionsGender = [
	{ label: "Boy", value: "BOY" },
	{ label: "Girl", value: "GIRL" },
];

const optionsIsJemaat = [
	{ label: "Jemaat", value: true },
	{ label: "Non-Jemaat", value: false },
];

const inputName = ref(null);
const inputGender = ref(null);
const inputTglLahir = ref(null);
const inputParentName = ref(null);
const inputContact = ref(null);
const inputIsJemaat = ref(null);
const inputKelas = ref(null);

const isInputValid = () => {
	return userData.nama && userData.gender && userData.kelas && (dataEdit ? userData.id : true);
};

const handleEnter = (event) => {
	if (event.key === "Enter") {
		switch (activeElement.value?.dataset?.id) {
			case "name":
				inputGender.value.inputRef.focus();
				break;
			case "gender":
				inputKelas.value.inputRef.focus();
				break;
			case "className":
				inputIsJemaat.value.inputRef.focus();
				break;
			case "isJemaat":
				inputTglLahir.value.inputRef.focus();
				break;
			case "birth":
				inputParentName.value.inputRef.focus();
				break;
			case "parentName":
				inputContact.value.inputRef.focus();
				break;
			case "contact":
				handleSubmit(event);
				break;
		}
	}
};

const handleSubmit = (event) => {
	event.preventDefault();
	if (isInputValid()) {
		emit("handleSubmit", userData);
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
		if (showModal) {
			inputName.value.inputRef.focus();
		} else {
			userData.id = "";
			userData.nama = "";
			userData.gender = "";
			userData.tglLahir = "";
			userData.namaParent = "";
			userData.kontak = "";
			userData.isJemaat = false;
			userData.kelas = "";
		}
	}
);

watch(
	() => dataEdit,
	(data) => {
		userData.id = data?.id;
		userData.nama = data?.nama;
		userData.gender = data?.gender;
		userData.tglLahir = DateHelper.formatISODate(data?.tglLahir);
		userData.namaParent = data?.namaParent;
		userData.kontak = data?.kontak;
		userData.isJemaat = data?.isJemaat;
		userData.kelas = data?.kelasId;
	}
);
</script>

<template>
	<ModalComponent
		:show-modal="showModal"
		:on-close="onClose"
		modal-title="Children Management"
		:is-loading="isLoading"
	>
		<template #modalContent>
			<form class="mt-8 mb-5 space-y-5 md:space-y-7 text-left" action="#">
				<div class="grid grid-cols-2 gap-5 mb-3">
					<InputGroupComponent
						ref="inputName"
						group-name="Name"
						type="text"
						name="name"
						placeholder="Ex: Fery"
						:is-required="true"
						v-model="userData.nama"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="1"
					/>
					<InputGroupComponent
						ref="inputTglLahir"
						group-name="Birth"
						type="date"
						name="birth"
						placeholder="--/--/----"
						:is-required="false"
						v-model="userData.tglLahir"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="5"
					/>
					<InputSelectComponent
						ref="inputGender"
						group-name="Gender"
						name="gender"
						placeholder="Ex: Boy"
						:is-required="true"
						v-model="userData.gender"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="2"
						:options="optionsGender"
					/>
					<InputGroupComponent
						ref="inputParentName"
						group-name="Parent Name"
						type="text"
						name="parentName"
						placeholder="Ex: Feryandi"
						:is-required="false"
						v-model="userData.namaParent"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="6"
					/>
					<InputSelectComponent
						ref="inputKelas"
						group-name="Class Name"
						name="className"
						placeholder="Ex: Joy"
						:is-required="true"
						v-model="userData.kelas"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="3"
						:options="optionsKelas"
					/>
					<InputGroupComponent
						ref="inputContact"
						group-name="Contact"
						type="text"
						name="contact"
						placeholder="Ex: 08** **** ****"
						:is-required="false"
						v-model="userData.kontak"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="7"
					/>
					<InputSelectComponent
						ref="inputIsJemaat"
						group-name="Jemaat"
						name="isJemaat"
						placeholder="Ex: Jemaat"
						:is-required="true"
						v-model="userData.isJemaat"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="4"
						:options="optionsIsJemaat"
					/>
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
