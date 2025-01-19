<script setup>
defineProps({
	showModal: { type: Boolean, default: false },
	onClose: { type: Function, required: false },
	modalTitle: { type: String, required: false },
	modalButton: { type: String, required: false },
	isLoading: { type: Boolean, default: false },
});
</script>
<template>
	<div
		:class="showModal ? 'relative' : 'hidden'"
		class="z-50"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			:class="showModal ? 'fixed' : 'hidden'"
			class="inset-0 bg-gray-500/75 transition-opacity"
			aria-hidden="true"
		></div>

		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div
					class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
				>
					<div class="bg-white dark:bg-slate-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div class="w-full">
							<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								<h3 class="text-3xl font-semibold text-gray-900 dark:text-white" id="modal-title">
									{{ modalTitle }}
								</h3>
								<slot name="modalContent"></slot>
							</div>
						</div>
					</div>
					<div
						class="bg-gray-50 dark:bg-slate-900 dark:border-t-2 dark:border-t-slate-600 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
					>
						<slot name="modalButton"></slot>
						<button
							@click="onClose"
							:disabled="isLoading"
							type="button"
							class="mt-3 inline-flex w-full justify-center items-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
