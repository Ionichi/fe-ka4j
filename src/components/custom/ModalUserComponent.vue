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
		userData.password &&
		userData.password.length >= 6 &&
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
		}
	}
);

watch(
	() => dataEdit,
	(data) => {
		userData.id = data?.id;
		userData.username = data?.username;
	}
);
</script>

<template>
	<ModalComponent :show-modal="showModal" :on-close="onClose" modal-title="Users Management" :is-loading="isLoading">
		<template #modalContent>
			<form class="mt-8 mb-5 space-y-5 md:space-y-7" action="#">
				<div class="grid grid-cols-2 gap-5">
					<InputGroupComponent
						ref="inputUsername"
						groupName="Username"
						type="text"
						name="username"
						placeholder="Ex: fery"
						:isRequired="true"
						v-model="userData.username"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="1"
					/>
					<InputGroupComponent
						ref="inputTglLahir"
						groupName="Birth"
						type="date"
						name="birth"
						placeholder="--/--/----"
						:isRequired="true"
						v-model="userData.tglLahir"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="3"
					/>
					<div class="grid">
						<InputGroupComponent
							ref="inputPassword"
							groupName="Password"
							:type="isShowPassword ? 'text' : 'password'"
							name="password"
							placeholder="••••••••"
							:isRequired="true"
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
						<span class="text-gray-600 mt-2">Note: must be at least 6 characters*</span>
					</div>
					<InputSelectComponent
						ref="inputKelas"
						groupName="Class Name"
						type="text"
						name="className"
						placeholder="Ex: Joy"
						:isRequired="true"
						v-model="userData.kelas"
						:handleKeyDown="handleEnter"
						class="w-full"
						tabindex="4"
						:options="optionsKelas"
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
