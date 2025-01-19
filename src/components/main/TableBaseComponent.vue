<script setup>
import { faMars, faPencil, faTrashCan, faVenus } from "@fortawesome/free-solid-svg-icons";
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
						{{ header["text"] }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="isLoading" class="dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td :colspan="headers.length" class="px-6 py-4 text-center">Loading...</td>
				</tr>
				<tr v-else-if="body.length === 0" class="dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td :colspan="headers.length" class="px-6 py-4 text-center">No Data</td>
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
					<td class="px-6 py-4">{{ index + 1 }}</td>
					<td v-for="(col, key) in content" :key="key" class="px-6 py-4">
						<div v-if="key === 'id'" class="flex gap-5 cursor-pointer text-lg">
							<FontAwesomeIcon
								:icon="faPencil"
								class="text-yellow-500 dark:text-white"
								@click="handleEdit(col)"
							/>
							<FontAwesomeIcon :icon="faTrashCan" class="text-red-500" @click="handleDelete(col)" />
						</div>
						<div v-else-if="key === 'status'" class="flex items-center">
							<div
								class="h-2.5 w-2.5 rounded-full me-2"
								:class="col ? 'bg-green-500' : 'bg-red-500'"
							></div>
							{{ col ? "Active" : "Inactive" }}
						</div>
						<div v-else-if="key === 'gender'" class="flex items-center gap-1">
							<FontAwesomeIcon
								:icon="col == 'BOY' ? faMars : faVenus"
								:class="col == 'BOY' ? 'text-cyan-500' : 'text-pink-500'"
							/>
							{{ col }}
						</div>
						<div v-else>{{ col }}</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
