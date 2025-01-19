<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Services", href: "/services" },
	{ name: "Contact", href: "/contact" },
];

const isNavbarOpen = ref(false);

const handleOpenNavbar = () => {
	isNavbarOpen.value = !isNavbarOpen.value;
};
</script>

<template>
	<nav
		class="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
	>
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
			<RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
				<picture>
					<source srcset="/logo-dark.png" media="(prefers-color-scheme: light)" />
					<img src="/logo.png" class="h-14" alt="KA4J Logo" />
				</picture>
				<span class="self-center text-2xl font-bold whitespace-nowrap dark:text-white">KA4J</span>
			</RouterLink>
			<div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
				<RouterLink to="/auth/login">
					<button
						type="button"
						class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center gap-3 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
					>
						Get Started
					</button>
				</RouterLink>
				<button
					data-collapse-toggle="navbar-sticky"
					type="button"
					class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="navbar-sticky"
					aria-expanded="false"
					@click="handleOpenNavbar"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>
			</div>
			<div
				class="items-center justify-between w-full md:flex md:w-auto md:order-1"
				:class="!isNavbarOpen && 'hidden'"
				id="navbar-sticky"
			>
				<ul
					class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
				>
					<li v-for="item in navigation" :key="item.name">
						<RouterLink
							:to="item.href"
							class="font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-500 md:p-0 md:dark:hover:text-sky-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							active-class="font-bold block py-2 px-3 text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 md:dark:text-sky-400"
						>
							{{ item.name }}
						</RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
