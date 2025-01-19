<script setup>
import { faPencil, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
	handleEdit: Function,
	handleDelete: Function,
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
						:style="index == 0 && 'width: 80px'"
					>
						<label v-if="header['key'] == 'action'" class="flex gap-3 items-center">
							<input type="checkbox" class="w-6 h-6" />
							Action
						</label>
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
						<div class="flex gap-5 cursor-pointer text-lg">
							<input type="checkbox" class="w-6 h-6" />
							<FontAwesomeIcon
								:icon="faPencil"
								class="text-yellow-500 dark:text-white"
								@click="handleEdit(content['id'])"
							/>
							<FontAwesomeIcon
								:icon="content['status'] ? faToggleOn : faToggleOff"
								:class="content['status'] ? 'text-green-500' : 'text-red-500'"
								@click="handleDelete(content['id'])"
							/>
						</div>
					</td>
					<th
						scope="row"
						class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						<div>
							<div class="text-base font-semibold">{{ content["username"] }}</div>
							<div class="font-normal text-gray-500">
								{{ content["birth"] }}
							</div>
						</div>
					</th>
					<td class="px-6 py-4">{{ content["class"] }}</td>
					<td class="px-6 py-4">
						<div class="flex items-center">
							<div
								class="h-2.5 w-2.5 rounded-full me-2"
								:class="content['status'] ? 'bg-green-500' : 'bg-red-500'"
							></div>
							{{ content["status"] ? "Present" : "Absent" }}
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
