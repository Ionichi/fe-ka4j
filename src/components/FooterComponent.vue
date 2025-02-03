<script setup>
const thisYear = new Date().getFullYear();
</script>
<template>
	<footer
		class="text-slate-500 border-t border-slate-200 dark:border-slate-200/5 dark:bg-gray-800 dark:text-gray-400 py-6"
	>
		<div class="container mx-auto flex items-center justify-end">
			<div>© 2024 - {{ thisYear }} Ionichi, Inc. All rights reserved.</div>
			<div class="flex space-x-4">
				<a href="#" class="hover:text-gray-300">
					<i class="fab fa-facebook-f"></i>
				</a>
				<a href="#" class="hover:text-gray-300">
					<i class="fab fa-instagram"> </i>
				</a>
				<a href="#" class="hover:text-gray-300">
					<i class="fab fa-twitter"></i>
				</a>
				<a href="#" class="hover:text-gray-300">
					<i class="fab fa-github"></i>
				</a>
				<a href="#" class="hover:text-gray-300">
					<i class="fab fa-youtube"></i>
				</a>
			</div>
		</div>
	</footer>
</template>
