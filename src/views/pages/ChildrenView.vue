<script setup>
import ButtonPrimaryComponent from "@/components/main/ButtonPrimaryComponent.vue";
import HeaderComponent from "@/components/main/HeaderComponent.vue";
import SidebarComponent from "@/components/main/SidebarComponent.vue";
import UserService from "@/services/users";
import DateHelper from "@/utils/dateHelper";
import { onMounted, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "@/components/custom/ModalConfirm.vue";
import KelasService from "@/services/kelas";
import ModalChildrenComponent from "@/components/custom/ModalChildrenComponent.vue";
import ChildrenService from "@/services/children";
import TableBaseComponent from "@/components/main/TableBaseComponent.vue";

const $toast = useToast();
const children = ref([]);
const dataEdit = ref(null);
const dataDel = ref(null);
const dataOptionsKelas = ref(null);

const isLoading = ref(false);
const showModal = ref(false);
const showConfirm = ref(false);

const headerTable = [
	{ key: "no", text: "No" },
	{ key: "action", text: "Action" },
	{ key: "nama", text: "Name" },
	{ key: "gender", text: "Gender" },
	{ key: "class", text: "Class" },
	{ key: "jemaat", text: "Jemaat" },
	{ key: "birth", text: "Birth" },
	{ key: "parent", text: "Parent" },
	{ key: "contact", text: "Contact" },
	{ key: "status", text: "Status" },
];
const bodyTable = ref([]);

const showCreateModal = async () => {
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
		fetchDataChildren();
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
	isLoading.value = true;
	try {
		const response = await UserService.getUserById(id);
		dataEdit.value = null;
		dataEdit.value = response.data.user;
		await showCreateModal();

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

const handleDelete = (id) => {
	showConfirm.value = true;
	dataDel.value = id;
};

const handleConfirmSubmit = async (id) => {
	isLoading.value = true;
	try {
		const response = await UserService.deleteUser(id);
		fetchDataChildren();
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

const handleOnClose = () => {
	showModal.value = false;
	showConfirm.value = false;
	dataEdit.value = null;
	dataDel.value = null;
};

const fetchDataChildren = async () => {
	isLoading.value = true;
	try {
		const response = await ChildrenService.getChildren();
		children.value = null;
		children.value = response.data.children;

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

watch(children, () => {
	bodyTable.value = [];
	children.value.forEach((child) => {
		bodyTable.value.push({
			id: child.id,
			name: child.nama,
			gender: child.gender,
			class: child.kelas?.nama || "-",
			jemaat: child.isJemaat ? "Jemaat" : "Non-Jemaat",
			birth: DateHelper.formatLocalDate(child.tglLahir) || "-",
			parent: child.namaParent || "-",
			contact: child.kontak || "-",
			status: child.isActive,
		});
	});
});

onMounted(() => {
	fetchDataChildren();
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
				<span>Children Management</span>
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
								placeholder="Search for children"
							/>
						</div>
					</div>
					<FontAwesomeIcon
						:icon="faArrowsRotate"
						class="text-2xl"
						:class="isLoading && 'animate-spin'"
						@click="fetchDataChildren"
					/>
				</div>
				<div>
					<ButtonPrimaryComponent class="text-sm h-10" text="Create" @click="showCreateModal" />
				</div>
			</div>
			<TableBaseComponent
				:headers="headerTable"
				:body="bodyTable"
				:is-loading="isLoading"
				:handle-edit="handleEdit"
				:handle-delete="handleDelete"
			/>

			<ModalChildrenComponent
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
				message="Are you sure you want to permanently remove this data??"
				@handle-confirm-submit="handleConfirmSubmit"
			/>
		</div>
	</div>
</template>
