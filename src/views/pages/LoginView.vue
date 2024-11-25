<script setup>
import BGOverlayComponent from "@/components/BGOverlayComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ButtonPrimaryComponent from "@/components/main/ButtonPrimaryComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import { useAuthStore } from "@/stores/authentication";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const loading = ref(false);
const username = ref("");
const password = ref("");
const inputUsername = ref(null);
const inputPassword = ref(null);

const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
	inputUsername.value.focus();
});

const handleEnter = (event, trigger) => {
	if (event.key === "Enter") {
		switch (trigger) {
			case "username":
				inputPassword.value.focus();
				break;
			case "password":
				handleLogin(event);
				break;
		}
	}
};

const handleLogin = async (event) => {
	event.preventDefault();
	loading.value = true;
	if (!username.value || !password.value) {
		$toast.error("Please enter a username and password!", {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "bottom" : "top-right",
		});
		loading.value = false;

		return;
	}

	try {
		const data = {
			username: username.value,
			password: password.value,
		};
		await authStore.login(data);

		$toast.success("Login successfully!", {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "bottom" : "top-right",
		});
		loading.value = false;

		router.push("/dashboard");
	} catch (error) {
		$toast.error(error, {
			position: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "bottom" : "top-right",
		});
		loading.value = false;
	}
};
</script>

<template>
	<NavbarComponent />
	<div class="w-full h-screen antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
		<BGOverlayComponent />

		<section class="bg-gray-50 dark:bg-gray-900">
			<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					class="flex flex-col justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white gap-3"
				>
					<picture>
						<source srcset="/logo-dark.png" media="(prefers-color-scheme: light)" />
						<img class="w-28 h-28" src="/logo.png" alt="logo" />
					</picture>
					Kids Army For Jesus
				</a>
				<div
					class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
				>
					<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1
							class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
						>
							Sign in to your account
						</h1>
						<form class="space-y-5 md:space-y-7" action="#">
							<div>
								<label
									for="username"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Username
								</label>
								<input
									ref="inputUsername"
									type="username"
									name="username"
									id="username"
									class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Ex: ionichi"
									required
									v-model="username"
									@keydown="(event) => handleEnter(event, 'username')"
								/>
							</div>
							<div>
								<label
									for="password"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									ref="inputPassword"
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
									v-model="password"
									@keydown="(event) => handleEnter(event, 'password')"
								/>
							</div>
							<ButtonPrimaryComponent
								text="Sign in"
								:isDisabled="loading"
								:isLoading="loading"
								:onClick="handleLogin"
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
	<FooterComponent />
</template>
