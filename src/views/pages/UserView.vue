<script setup>
import ButtonPrimaryComponent from "@/components/main/ButtonPrimaryComponent.vue";
import HeaderComponent from "@/components/main/HeaderComponent.vue";
import SidebarComponent from "@/components/main/SidebarComponent.vue";
import TableUserComponent from "@/components/custom/TableUserComponent.vue";
import UserService from "@/services/users";
import DateHelper from "@/utils/dateHelper";
import { onMounted, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "@/components/custom/ModalConfirm.vue";
import ModalUserComponent from "@/components/custom/ModalUserComponent.vue";
import KelasService from "@/services/kelas";

const $toast = useToast();
const users = ref([]);
const dataEdit = ref(null);
const dataDel = ref(null);
const dataOptionsKelas = ref(null);

const isLoading = ref(false);
const showModal = ref(false);
const showConfirm = ref(false);

const headerTable = [
	{ key: "action", text: "Action" },
	{ key: "username", text: "Username" },
	{ key: "class", text: "Class" },
	{ key: "status", text: "Status" },
];
const bodyTable = ref([]);

const showCreateModal = async () => {
	// users.value = [{ id: "-", username: "-", tglLahir: "2024-01-01", isActive: "-", kelas: { nama: "-" } }];
	isLoading.value = true;
	try {
		const response = await KelasService.getKelas();
		dataOptionsKelas.value = response.data.kelas.map((data) => {
			return { label: data.nama, value: data.id };
		});

		showModal.value = true;
	} catch (error) {
		$toast.error(error, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	} finally {
		isLoading.value = false;
	}
};

const handleSubmit = async (data) => {
	isLoading.value = true;
	try {
		const response = await UserService.storeOrUpdateUser(data);
		fetchDataUsers();
		handleOnClose();
		$toast.success(response.message, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	} catch (error) {
		$toast.error(error, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	} finally {
		isLoading.value = false;
	}
};

const handleEdit = async (id) => {
	console.log(id);
	// isLoading.value = true;
	// try {
	// 	const response = await KelasService.getKelasById(id);
	// 	dataEdit.value = null;
	// 	dataEdit.value = response.data.kelas;
	// 	showModal.value = true;

	// 	$toast.success(response.message, {
	// 		position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
	// 	});
	// } catch (error) {
	// 	$toast.error(error, {
	// 		position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
	// 	});
	// } finally {
	// 	isLoading.value = false;
	// }
};

const handleDelete = (id) => {
	// showConfirm.value = true;
	// dataDel.value = id;
	console.log(id);
};

const handleConfirmSubmit = async (id) => {
	console.log(id);
	// isLoading.value = true;
	// try {
	// 	const response = await KelasService.deleteKelas(id);
	// 	fetchDataUsers();
	// 	handleOnClose();
	// 	$toast.success(response.message, {
	// 		position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
	// 	});
	// } catch (error) {
	// 	$toast.error(error, {
	// 		position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
	// 	});
	// } finally {
	// 	isLoading.value = false;
	// }
};

const handleOnClose = () => {
	showModal.value = false;
	showConfirm.value = false;
	dataEdit.value = null;
	dataDel.value = null;
};

const fetchDataUsers = async () => {
	isLoading.value = true;
	try {
		const response = await UserService.getUsers();
		users.value = null;
		users.value = response.data.users;

		$toast.success(response.message, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	} catch (error) {
		$toast.error(error, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	} finally {
		isLoading.value = false;
	}
};

watch(users, async () => {
	bodyTable.value = [];
	users.value.forEach((user) => {
		bodyTable.value.push({
			id: user.id,
			username: user.username,
			birth: DateHelper.formatLocalDate(new Date(user.tglLahir)),
			class: user.kelas?.nama || "-",
			status: user.isActive,
		});
	});
});

onMounted(async () => {
	fetchDataUsers();
});
</script>

<template>
	<HeaderComponent />
	<SidebarComponent />

	<div class="p-4 sm:ml-64">
		<div
			class="min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 dark:text-white mt-20"
		>
			<div class="text-2xl font-bold mb-5">
				<span>User Management</span>
			</div>
			<div class="flex justify-between items-center mb-5 flex-wrap gap-3">
				<div class="flex items-center gap-3">
					<div class="input-group">
						<label for="table-search" class="sr-only">Search</label>
						<div class="relative">
							<div
								class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
							>
								<svg
									class="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="text"
								id="table-search"
								class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full xs:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search for users"
							/>
						</div>
					</div>
					<FontAwesomeIcon
						:icon="faArrowsRotate"
						class="text-2xl"
						:class="isLoading && 'animate-spin'"
						@click="fetchDataUsers"
					/>
				</div>
				<div>
					<ButtonPrimaryComponent class="text-sm h-10" text="Create" @click="showCreateModal" />
				</div>
			</div>
			<TableUserComponent
				:headers="headerTable"
				:body="bodyTable"
				:is-loading="isLoading"
				:handle-edit="handleEdit"
				:handle-delete="handleDelete"
			/>

			<ModalUserComponent
				:show-modal="showModal"
				:on-close="handleOnClose"
				:is-loading="isLoading"
				:data-edit="dataEdit"
				:options-kelas="dataOptionsKelas"
				@handle-submit="handleSubmit"
			/>

			<ModalConfirm
				:show-modal="showConfirm"
				:on-close="handleOnClose"
				:is-loading="isLoading"
				:data-del="dataDel"
				message="Are you sure you want to deactive this users?"
				@handle-confirm-submit="handleConfirmSubmit"
			/>
		</div>
	</div>
</template>
