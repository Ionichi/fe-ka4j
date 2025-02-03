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
	handleDevotion: Function,
	handleExtras: Function,
	handleNotes: Function,
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
						:colspan="index == headers.length - 1 && '2'"
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
					<td v-for="(col, key) in content" :key="key" class="px-6 py-4">
						<div v-if="key === 'id'" class="flex gap-5 cursor-pointer">
							<input
								type="checkbox"
								class="w-6 h-6"
								@change="handleCheck(col)"
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
						<div v-else-if="key === 'isDevotion'" class="flex items-center">
							<input
								type="checkbox"
								class="w-6 h-6"
								@change="handleDevotion(content['id'])"
								:checked="col"
							/>
						</div>
						<div v-else-if="key === 'status'"></div>
						<div v-else-if="key === 'extras'">
							<input
								type="number"
								min="0"
								:value="col"
								class="bg-transparent w-12 focus:outline-none border-b-2 border-gray-100"
								@keyup="handleExtras(content['id'], $event.target.value)"
							/>
						</div>
						<div v-else-if="key === 'notes'">
							<textarea
								rows="1"
								:value="col"
								class="bg-transparent w-40 focus:outline-none border-b-2 border-gray-100"
								@change="handleNotes(content['id'], $event.target.value)"
							/>
						</div>
						<div v-else>{{ col }}</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style scoped>
input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none;
}
</style>
