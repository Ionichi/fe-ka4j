<script setup>
import NavbarComponent from "@/components/NavbarComponent.vue";
import BGOverlayComponent from "@/components/BGOverlayComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from "vue-router";
</script>
<template>
	<NavbarComponent />
	<div
		class="w-full h-screen flex justify-center items-center antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
	>
		<BGOverlayComponent />

		<header class="flex gap-3 justify-center items-center flex-col p-3">
			<img alt="Vue logo" class="logo" src="/logo.png" width="125" height="125" />
			<div class="flex flex-col items-center gap-5">
				<h1 class="text-9xl">404</h1>
				<p class="text-5xl"><span class="text-red-400">Opps!</span> Page not found.</p>
				<p>The page you're searching for isn't available.</p>
				<RouterLink
					to="/dashboard"
					class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center gap-3 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
				>
					<FontAwesomeIcon :icon="faHouse" />
					Kembali
				</RouterLink>
			</div>
		</header>
	</div>
	<FooterComponent />
</template>
