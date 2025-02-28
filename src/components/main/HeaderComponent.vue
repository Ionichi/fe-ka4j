<script setup>
import { useAuthStore } from "@/stores/authentication";
import { useMenu } from "@/stores/menu";
import DateHelper from "@/utils/dateHelper";
import { faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const authStore = useAuthStore();
const menu = useMenu();
const $toast = useToast();
const router = useRouter();
const user = authStore.getUser;
const isProfileOpen = ref(false);

const handleOpenProfile = () => {
	isProfileOpen.value = !isProfileOpen.value;
};

const handleOpenMenu = () => {
	menu.handleMenuOpen();
};

const handleLogout = async () => {
	try {
		await authStore.logout();

		$toast.success("Logged out sucessfully!", {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
		router.push("/auth/login");
	} catch (error) {
		$toast.error(error, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "top" : "top-right",
		});
	}
};
</script>

<template>
	<nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
		<div class="px-3 py-3 lg:px-5 lg:pl-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-start rtl:justify-end">
					<button
						data-drawer-target="logo-sidebar"
						data-drawer-toggle="logo-sidebar"
						aria-controls="logo-sidebar"
						type="button"
						class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						@click="handleOpenMenu"
					>
						<span class="sr-only">Open sidebar</span>
						<svg
							class="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								clip-rule="evenodd"
								fill-rule="evenodd"
								d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
							></path>
						</svg>
					</button>
					<RouterLink to="/dashboard" class="flex ms-2 md:me-24">
						<picture>
							<source srcset="/logo-dark.png" media="(prefers-color-scheme: light)" />
							<img src="/logo.png" class="h-12 me-3" alt="KA4J Logo" />
						</picture>
						<span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
							KA4J
						</span>
					</RouterLink>
				</div>
				<div class="flex items-center">
					<div class="flex items-center ms-3">
						<div>
							<button
								type="button"
								class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								aria-expanded="false"
								data-dropdown-toggle="dropdown-user"
								@click="handleOpenProfile"
							>
								<span class="sr-only">Open user menu</span>
								<img class="w-12 h-12 rounded-full" src="/default-profile.jpg" alt="user photo" />
							</button>
						</div>
						<div
							class="z-50 my-4 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-12 right-0"
							:class="!isProfileOpen ? 'hidden' : 'block'"
							id="dropdown-user"
						>
							<div class="px-4 py-3" role="none">
								<p class="text-sm text-gray-900 dark:text-white" role="none">
									{{ user.username || "-" }}
								</p>
								<p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
									{{ DateHelper.formatLocalDate(user.tglLahir) || "-" }}
								</p>
							</div>
							<ul class="py-1" role="none">
								<li>
									<a
										href="#"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem"
									>
										<FontAwesomeIcon :icon="faGear" />
										Settings
									</a>
								</li>
								<li>
									<a
										href="#"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem"
										@click="handleLogout"
									>
										<FontAwesomeIcon :icon="faSignOut" />
										Logout
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
