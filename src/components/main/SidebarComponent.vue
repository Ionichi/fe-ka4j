<script setup>
import { useMenu } from "@/stores/menu";
import {
	faChalkboard,
	faChildren,
	faClipboardUser,
	faInbox,
	faLandmark,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { RouterLink } from "vue-router";

const menu = useMenu();
</script>

<template>
	<aside
		id="logo-sidebar"
		class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
		aria-label="Sidebar"
		:class="menu.getIsMenuOpen ? 'translate-none' : '-translate-x-full'"
	>
		<div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
			<ul class="space-y-2 font-medium">
				<li>
					<RouterLink
						to="/dashboard"
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<svg
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 21"
						>
							<path
								d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
							/>
							<path
								d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
							/>
						</svg>
						<span class="ms-3">Dashboard</span>
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/teacher-attendance"
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<FontAwesomeIcon :icon="faChalkboard" />
						<span class="flex-1 ms-3 whitespace-nowrap">Teacher's Attendance</span>
					</RouterLink>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<FontAwesomeIcon :icon="faInbox" class="text-xl" />
						<span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
						<span
							class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
							>0</span
						>
					</a>
				</li>
				<li>
					<RouterLink
						to="/users"
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<FontAwesomeIcon :icon="faUsers" class="text-md" />
						<span class="flex-1 ms-3 whitespace-nowrap">Users</span>
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/class"
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<FontAwesomeIcon :icon="faLandmark" class="text-xl" />
						<span class="flex-1 ms-3 whitespace-nowrap">Class</span>
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/children"
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<FontAwesomeIcon :icon="faChildren" />
						<span class="flex-1 ms-3 whitespace-nowrap">Children</span>
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/children-attendance"
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<FontAwesomeIcon :icon="faClipboardUser" />
						<span class="flex-1 ms-3 whitespace-nowrap">Children's Attendance</span>
					</RouterLink>
				</li>
			</ul>
		</div>
	</aside>
</template>
