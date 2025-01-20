<script setup>
import ButtonPrimaryComponent from "@/components/main/ButtonPrimaryComponent.vue";
import HeaderComponent from "@/components/main/HeaderComponent.vue";
import SidebarComponent from "@/components/main/SidebarComponent.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsRotate, faSave } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
import TableAttandanceComponent from "@/components/custom/TableAttandanceComponent.vue";
import InputGroupComponent from "@/components/main/InputGroupComponent.vue";
import TeacherAttendanceService from "@/services/teacherAttendance";
import DateHelper from "@/utils/dateHelper";

const $toast = useToast();
const attendance = ref([]);
const searchQuery = ref("");
const attendanceDate = ref(DateHelper.formatISODate(new Date()));

const isLoading = ref(false);
const isCheckedAll = ref(false);

const headerTable = [
	{ key: "action", text: "Action" },
	{ key: "username", text: "Username" },
];
const bodyTable = ref([]);

const handleSubmit = async () => {
	isLoading.value = true;
	try {
		const response = await TeacherAttendanceService.storeOrUpdateAttendance(attendanceDate.value, attendance.value);
		fetchDataAttendance();

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

const handleCheck = (id) => {
	attendance.value = attendance.value.map((data) => (data.id == id ? { ...data, isPresent: !data.isPresent } : data));
};

const handleCheckAll = (event) => {
	const isCheckAll = event.target.checked;
	attendance.value = attendance.value.map((data) => ({ ...data, isPresent: isCheckAll }));
};

const fetchDataAttendance = async () => {
	isLoading.value = true;
	try {
		const response = await TeacherAttendanceService.getAttendance(attendanceDate);
		attendance.value = null;
		attendance.value = response.data.absensiMentor;
		isCheckedAll.value = attendance.value.every((data) => data.isPresent);

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

watch(attendance, () => {
	bodyTable.value = [];
	attendance.value.forEach((data) => {
		bodyTable.value.push({
			id: data.id,
			username: data.username,
			status: data.isPresent,
		});
	});

	isCheckedAll.value = attendance.value.every((data) => data.isPresent);
});

watch(attendanceDate, () => {
	fetchDataAttendance();
});

onMounted(() => {
	fetchDataAttendance();
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
				<span>Teacher's Attendance</span>
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
								@input="handleSearch"
							/>
						</div>
					</div>
					<FontAwesomeIcon
						:icon="faArrowsRotate"
						class="text-2xl"
						:class="isLoading && 'animate-spin'"
						@click="fetchDataAttendance"
					/>
				</div>
				<InputGroupComponent
					ref="inputTgl"
					group-name=""
					type="date"
					name="date"
					placeholder="--/--/----"
					v-model="attendanceDate"
					class="w-40"
					tabindex="3"
				/>
			</div>
			<TableAttandanceComponent
				:headers="headerTable"
				:body="filteredTableData"
				:is-loading="isLoading"
				:handle-check="handleCheck"
				:handle-check-all="handleCheckAll"
				:is-checked-all="isCheckedAll"
			/>
			<div class="flex justify-end items-center mt-5">
				<div>
					<ButtonPrimaryComponent
						class="text-sm h-10"
						text="Save"
						:is-loading="isLoading"
						:is-disabled="isLoading"
						@click="handleSubmit"
					>
						<template #icon>
							<FontAwesomeIcon :icon="faSave" />
						</template>
					</ButtonPrimaryComponent>
				</div>
			</div>
		</div>
	</div>
</template>
