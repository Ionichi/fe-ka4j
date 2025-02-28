<script setup>
import { nextTick, reactive, ref, watch } from "vue";
import ButtonPrimaryComponent from "../main/ButtonPrimaryComponent.vue";
import ModalComponent from "../main/ModalComponent.vue";
import InputGroupComponent from "../main/InputGroupComponent.vue";
import InputSelectComponent from "../main/InputSelectComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
	username: "",
	password: "",
	tglLahir: "",
	kelas: "",
});

const inputUsername = ref(null);
const inputPassword = ref(null);
const inputTglLahir = ref(null);
const inputKelas = ref(null);

const isShowPassword = ref(false);

const isInputValid = () => {
	return (
		userData.username &&
		(dataEdit ? true : userData.password && userData.password.length >= 6) &&
		userData.tglLahir &&
		userData.kelas &&
		(dataEdit ? userData.id : true)
	);
};

const handleEnter = (event) => {
	if (event.key === "Enter") {
		switch (activeElement.value?.dataset?.id) {
			case "username":
				inputPassword.value.inputRef.focus();
				break;
			case "password":
				inputTglLahir.value.inputRef.focus();
				break;
			case "birth":
				inputKelas.value.inputRef.focus();
				break;
			case "className":
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

const viewPassword = () => {
	isShowPassword.value = !isShowPassword.value;
};

watch(
	() => showModal,
	async () => {
		await nextTick();
		if (showModal) {
			inputUsername.value.inputRef.focus();
		} else {
			userData.id = "";
			userData.username = "";
			userData.password = "";
			userData.tglLahir = "";
			userData.kelas = "";
		}
	}
);

watch(
	() => dataEdit,
	(data) => {
		userData.id = data?.id;
		userData.username = data?.username;
		userData.password = data?.password;
		userData.tglLahir = DateHelper.formatISODate(data?.tglLahir);
		userData.kelas = data?.kelasId;
	}
);
</script>

<template>
	<ModalComponent :show-modal="showModal" :on-close="onClose" modal-title="Users Management" :is-loading="isLoading">
		<template #modalContent>
			<form class="mt-8 mb-5 space-y-5 md:space-y-7 text-left" action="#">
				<div class="grid grid-cols-2 gap-5 mb-3">
					<InputGroupComponent
						ref="inputUsername"
						group-name="Username"
						type="text"
						name="username"
						placeholder="Ex: fery"
						:is-required="true"
						v-model="userData.username"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="1"
						:is-read-only="dataEdit ? true : false"
					/>
					<InputGroupComponent
						ref="inputTglLahir"
						group-name="Birth"
						type="date"
						name="birth"
						placeholder="--/--/----"
						:is-required="true"
						v-model="userData.tglLahir"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="3"
					/>
					<div class="grid">
						<InputGroupComponent
							ref="inputPassword"
							group-name="Password"
							:type="isShowPassword ? 'text' : 'password'"
							name="password"
							placeholder="••••••••"
							:is-required="dataEdit ? false : true"
							v-model="userData.password"
							:handleKeyDown="handleEnter"
							class="w-full row-start-1 col-start-1"
							tabindex="2"
						/>
						<FontAwesomeIcon
							:icon="isShowPassword ? faEye : faEyeSlash"
							class="z-10 right-3 top-3.5 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end"
							@click="viewPassword"
						/>
					</div>
					<InputSelectComponent
						ref="inputKelas"
						group-name="Class Name"
						name="className"
						placeholder="Ex: Joy"
						:is-required="true"
						v-model="userData.kelas"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="4"
						:options="optionsKelas"
					/>
				</div>
				<span class="text-sm text-gray-600">- Password field must be at least 6 characters</span>
				<br />
				<span v-if="dataEdit" class="text-sm text-gray-600 mt-2">
					- Leave password field blank to keep current password.
				</span>
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
