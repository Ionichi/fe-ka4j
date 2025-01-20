<script setup>
defineProps({
	headers: {
		type: Array,
		required: true,
	},
	body: {
		type: Array,
		required: true,
	},
	isLoading: Boolean,
	handleCheck: Function,
	handleCheckAll: Function,
	isCheckedAll: Boolean,
});
</script>

<template>
	<div class="overflow-x-auto rounded-md">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
			<thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th
						v-for="(header, index) in headers"
						scope="col"
						class="px-6 py-3"
						:key="header['key']"
						:style="index == 0 && 'width: 50%'"
					>
						<div v-if="header['key'] == 'action'" class="flex gap-5 items-center">
							<input type="checkbox" class="w-6 h-6" @change="handleCheckAll" :checked="isCheckedAll" />
							Status
						</div>
						<div v-else>
							{{ header["text"] }}
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="isLoading" class="dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td colspan="4" class="px-6 py-4 text-center">Loading...</td>
				</tr>
				<tr v-else-if="body.length === 0" class="dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td colspan="4" class="px-6 py-4 text-center">No Data</td>
				</tr>
				<tr
					v-else
					v-for="(content, index) in body"
					:key="index"
					class="dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
					:class="[
						index % 2 == 0 ? 'bg-white' : 'bg-gray-50',
						index != body.length - 1 && 'border-b dark:border-gray-700',
					]"
				>
					<td class="px-6 py-4">
						<div class="flex gap-5 cursor-pointer">
							<input
								type="checkbox"
								class="w-6 h-6"
								@change="handleCheck(content['id'])"
								:checked="content['status']"
							/>
							<div class="flex items-center">
								<div
									class="h-2.5 w-2.5 rounded-full me-2"
									:class="content['status'] ? 'bg-green-500' : 'bg-red-500'"
								></div>
								{{ content["status"] ? "Present" : "Absent" }}
							</div>
						</div>
					</td>
					<td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-base">
						{{ content["username"] }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
