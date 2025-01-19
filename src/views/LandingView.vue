<script setup>
import BGOverlayComponent from "@/components/BGOverlayComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
	<NavbarComponent />
	<div
		class="w-full h-screen flex justify-center items-center antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
	>
		<BGOverlayComponent />

		<header class="flex gap-3 justify-center items-center flex-col sm:flex-row p-3">
			<picture>
				<source srcset="/logo-dark.png" media="(prefers-color-scheme: light)" />
				<img alt="KA4J Logo" class="logo" src="/logo.png" width="125" height="125" />
			</picture>

			<div class="wrapper">
				<HelloWorld msg="KA4J" />
			</div>
		</header>
	</div>
	<FooterComponent />
</template>
