<script setup>
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { RouterLink } from "vue-router";

const navigation = [
	{ name: "Home", href: "/" },
	// { name: "Team", href: "/team", current: false },
	// { name: "Projects", href: "/project", current: false },
	// { name: "Calendar", href: "/calender", current: false },
];
</script>

<template>
	<Disclosure as="nav" class="bg-gray-800 p-2" v-slot="{ open }">
		<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div class="relative flex h-16 items-center justify-between">
				<div
					class="absolute inset-y-0 left-0 flex items-center sm:hidden"
				>
					<!-- Mobile menu button-->
					<DisclosureButton
						class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="absolute -inset-0.5" />
						<span class="sr-only">Open main menu</span>
						<FontAwesomeIcon
							:icon="faBars"
							v-if="!open"
							class="block h-6 w-6"
							aria-hidden="true"
						/>
						<FontAwesomeIcon
							:icon="faXmark"
							v-else
							class="block h-6 w-6"
							aria-hidden="true"
						/>
					</DisclosureButton>
					<div class="flex shrink-0 items-center justify-start">
						<img
							class="h-16 w-auto"
							src="/logo.png"
							alt="Your Company"
						/>
					</div>
				</div>
				<div
					class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
				>
					<div class="hidden sm:flex sm:items-center">
						<div class="flex shrink-0 items-center justify-start">
							<img
								class="h-16 w-auto"
								src="/logo.png"
								alt="Your Company"
							/>
						</div>
						<div class="sm:ml-6 flex space-x-4">
							<RouterLink
								v-for="item in navigation"
								:key="item.name"
								:to="item.href"
								class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								active-class="bg-gray-900 text-white"
							>
								{{ item.name }}
							</RouterLink>
						</div>
					</div>
				</div>
				<div
					class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
				>
					<div class="flex shrink-0 items-center">
						<RouterLink
							to="/auth/login"
							class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center gap-3 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
						>
							Get Started
						</RouterLink>
					</div>
				</div>
			</div>
		</div>

		<DisclosurePanel class="sm:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2">
				<RouterLink
					v-for="item in navigation"
					:key="item.name"
					:to="item.href"
					class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 w-full py-2 text-base font-medium"
					active-class="bg-gray-900 text-white"
				>
					{{ item.name }}
				</RouterLink>
			</div>
		</DisclosurePanel>
	</Disclosure>
</template>
