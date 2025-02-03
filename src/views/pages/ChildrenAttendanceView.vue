<script setup>
import ButtonPrimaryComponent from "@/components/main/ButtonPrimaryComponent.vue";
import HeaderComponent from "@/components/main/HeaderComponent.vue";
import SidebarComponent from "@/components/main/SidebarComponent.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsRotate, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
import TableAttandanceComponent from "@/components/custom/TableAttandanceComponent.vue";
import InputGroupComponent from "@/components/main/InputGroupComponent.vue";
import DateHelper from "@/utils/dateHelper";
import InputSelectComponent from "@/components/main/InputSelectComponent.vue";
import KelasService from "@/services/kelas";
import ChildrenAttendanceService from "@/services/childrenAttendance";
import ModalChildAttendanceComponent from "@/components/custom/ModalChildAttendanceComponent.vue";
import ChildrenService from "@/services/children";

const $toast = useToast();
const attendance = ref([]);
const searchQuery = ref("");
const attendanceDate = ref(DateHelper.formatISODate(new Date()));
const selectedKelas = ref("");
const dataOptionsKelas = ref(null);
const dataOptionsChildren = ref(null);
const totalCoupon = ref(0);

const isLoading = ref(false);
const isCheckedAll = ref(false);
const isShowModalChild = ref(false);

const headerTable = [
	{ key: "action", text: "Action" },
	{ key: "nama", text: "Name" },
	{ key: "kelas", text: "Class Name" },
	{ key: "tgl", text: "Date" },
	{ key: "isDevotion", text: "Devotion" },
	{ key: "extras", text: "Extras" },
	{ key: "notes", text: "Notes" },
];
const bodyTable = ref([]);

const handleAddChild = async () => {
	if (validationClassAndDate()) {
		const response = await ChildrenService.getChildren();
		dataOptionsChildren.value = response.data.children
			.filter((child) => {
				return !attendance.value.find(
					(item) => selectedKelas.value !== child.kelasId || item.childrenId === child.id
				);
			})
			.map((data) => {
				return {
					label: data.nama,
					value: data.id,
				};
			});
		isShowModalChild.value = true;
	} else {
		$toast.warning("Please choose a class and date first.", {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	}
};

const handleSubmitChild = (data) => {
	for (let child of data) {
		attendance.value = [
			...attendance.value,
			{
				id: child.childrenId,
				childrenId: child.childrenId,
				kelasId: selectedKelas.value,
				tgl: attendanceDate.value,
				isPresent: true,
				isDevotion: false,
				extras: 0,
				notes: "",
				userId: "",
				kelas: dataOptionsKelas.value.find((item) => item.value === selectedKelas.value).label,
				nama: child.nama,
			},
		];
	}

	handleOnClose();
};

const handleOnClose = () => {
	isShowModalChild.value = false;
};

const handleSave = async () => {
	isLoading.value = true;
	try {
		const response = await ChildrenAttendanceService.storeOrUpdateAttendance(
			attendanceDate.value,
			attendance.value
		);
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

const handleDevotion = (id) => {
	attendance.value = attendance.value.map((data) =>
		data.id == id ? { ...data, isDevotion: !data.isDevotion } : data
	);
};

const handleExtras = (id, extras) => {
	attendance.value = attendance.value.map((data) =>
		data.id == id ? { ...data, extras: parseInt(extras || 0) } : data
	);
};

const handleNotes = (id, notes) => {
	attendance.value = attendance.value.map((data) => (data.id == id ? { ...data, notes } : data));
};

const validationClassAndDate = () => {
	return attendance.value && selectedKelas.value;
};

const fetchDataAttendance = async () => {
	if (validationClassAndDate()) {
		isLoading.value = true;
		try {
			const response = await ChildrenAttendanceService.getAttendance(attendanceDate.value, selectedKelas.value);
			attendance.value = null;
			attendance.value = response.data.absensiChildren;
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
	} else {
		$toast.warning("Please choose a class and date first.", {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	}
};

const handleSelectedKelas = () => {
	fetchDataAttendance();
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
			nama: data.nama,
			kelas: data.kelas,
			tgl: DateHelper.formatLocalDate(data.tgl),
			isDevotion: data.isDevotion,
			extras: data.extras,
			notes: data.notes,
			status: data.isPresent,
		});
	});

	totalCoupon.value = attendance.value.reduce((total, data) => {
		return total + (data.isPresent ? 1 : 0) + (data.isDevotion ? 1 : 0) + parseInt(data.extras || 0);
	}, 0);

	isCheckedAll.value = attendance.value.every((data) => data.isPresent);
});

watch(attendanceDate, () => {
	fetchDataAttendance();
});

onMounted(async () => {
	const responseKelas = await KelasService.getKelas();
	dataOptionsKelas.value = responseKelas.data.kelas.map((data) => {
		return { label: data.nama, value: data.id };
	});
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
				<span>Children's Attendance</span>
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
				<div class="flex gap-3 items-center flex-wrap">
					<InputSelectComponent
						ref="inputKelas"
						group-name=""
						name="className"
						placeholder="Ex: Joy"
						v-model="selectedKelas"
						class="w-60"
						:options="dataOptionsKelas"
						default-option-label="-- Choose Class --"
						:onchange="handleSelectedKelas"
					/>
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
					<div class="mt-2">
						<ButtonPrimaryComponent
							class="text-sm h-10"
							text="Add Child"
							:is-loading="isLoading"
							:is-disabled="isLoading"
							@click="handleAddChild"
						>
							<template #icon>
								<FontAwesomeIcon :icon="faPlus" />
							</template>
						</ButtonPrimaryComponent>
					</div>
				</div>
			</div>
			<TableAttandanceComponent
				:headers="headerTable"
				:body="filteredTableData"
				:is-loading="isLoading"
				:handle-check="handleCheck"
				:handle-check-all="handleCheckAll"
				:is-checked-all="isCheckedAll"
				:handle-devotion="handleDevotion"
				:handle-extras="handleExtras"
				:handle-notes="handleNotes"
			/>
			<div class="flex justify-end items-center mt-2 gap-3">
				<span>Total Coupon: </span>
				<span>{{ totalCoupon }}</span>
			</div>
			<div class="flex justify-between items-center mt-5">
				<span class="text-gray-500">Notes: Remember to save when you adding children</span>
				<div>
					<ButtonPrimaryComponent
						class="text-sm h-10"
						text="Save"
						:is-loading="isLoading"
						:is-disabled="isLoading"
						@click="handleSave"
					>
						<template #icon>
							<FontAwesomeIcon :icon="faSave" />
						</template>
					</ButtonPrimaryComponent>
				</div>
			</div>

			<ModalChildAttendanceComponent
				:show-modal="isShowModalChild"
				:on-close="handleOnClose"
				:is-loading="isLoading"
				:options-children="dataOptionsChildren"
				@handle-submit-child="handleSubmitChild"
			/>
		</div>
	</div>
</template>
