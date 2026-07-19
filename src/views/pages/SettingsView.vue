<script setup>
import ModalConfirm from "@/components/custom/ModalConfirm.vue";
import ModalSettingsComponent from "@/components/custom/ModalSettingsComponent.vue";
import ButtonPrimaryComponent from "@/components/main/ButtonPrimaryComponent.vue";
import HeaderComponent from "@/components/main/HeaderComponent.vue";
import SidebarComponent from "@/components/main/SidebarComponent.vue";
import TableBaseComponent from "@/components/main/TableBaseComponent.vue";
import SettingsService from "@/services/settings";
import DateHelper from "@/utils/dateHelper";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import { computed, onMounted, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const seasons = ref([]);
const dataEdit = ref(null);
const dataDel = ref(null);
const searchQuery = ref("");

const isLoading = ref(false);
const showModal = ref(false);
const showConfirm = ref(false);

const headerTable = [
	{ key: "no", text: "No" },
	{ key: "action", text: "Action" },
	{ key: "tgl", text: "Date" },
];

const bodyTable = ref([]);

const showCreateModal = () => {
	showModal.value = true;
};

const handleSubmit = async (tgl) => {
	isLoading.value = true;
	try {
		const response = await SettingsService.createSeason(tgl);
		fetchDataSeasons();
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

const handleDelete = (id) => {
	showConfirm.value = true;
	dataDel.value = id;
};

const handleConfirmSubmit = async (id) => {
	isLoading.value = true;
	try {
		const response = await SettingsService.deleteSeason(id);
		fetchDataSeasons();
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

const fetchDataSeasons = async () => {
	isLoading.value = true;
	try {
		const response = await SettingsService.getSeasons();
		seasons.value = null;
		seasons.value = response.data.season;

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

const handleSearch = debounce((event) => {
	searchQuery.value = event.target.value;
}, 500);

const filteredTableData = computed(() => {
	if (!searchQuery.value) {
		return bodyTable.value;
	}

	return bodyTable.value.filter((row) => {
		return Object.values(row).some((value) => {
			return String(value).toLowerCase().includes(searchQuery.value.toLowerCase());
		});
	});
});

watch(seasons, () => {
	bodyTable.value = [];
	seasons.value.forEach((element) => {
		bodyTable.value.push({
			id: element.id,
			tgl: DateHelper.formatLocalDate(element.tgl),
		});
	});
});

onMounted(() => {
	fetchDataSeasons();
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
				<span>Season Management</span>
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
								placeholder="Search for season"
								@input="handleSearch"
							/>
						</div>
					</div>
					<FontAwesomeIcon
						:icon="faArrowsRotate"
						class="text-2xl"
						:class="isLoading && 'animate-spin'"
						@click="fetchDataSeasons"
					/>
				</div>
				<div class="">
					<ButtonPrimaryComponent class="text-sm h-10" text="Create" @click="showCreateModal" />
				</div>
			</div>
			<TableBaseComponent
				:headers="headerTable"
				:body="filteredTableData"
				:is-loading="isLoading"
				:handle-delete="handleDelete"
			/>

			<ModalSettingsComponent
				:show-modal="showModal"
				:on-close="handleOnClose"
				:is-loading="isLoading"
				@handle-submit="handleSubmit"
			/>

			<ModalConfirm
				:show-modal="showConfirm"
				:on-close="handleOnClose"
				:is-loading="isLoading"
				:data-del="dataDel"
				message="Are you sure you want to permanently remove this data?"
				@handle-confirm-submit="handleConfirmSubmit"
			/>
		</div>
	</div>
</template>
