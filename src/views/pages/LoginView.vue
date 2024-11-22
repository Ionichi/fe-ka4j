<script setup>
import BGOverlayComponent from "@/components/BGOverlayComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import LoadingComponent from "@/components/main/LoadingComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import { useAuthStore } from "@/stores/authentication";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const username = ref("");
const password = ref("");
const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);

const handleSubmit = async (event) => {
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
									>Username</label
								>
								<input
									type="username"
									name="username"
									id="username"
									class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Ex: ionichi"
									required
									v-model="username"
								/>
							</div>
							<div>
								<label
									for="password"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Password</label
								>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
									v-model="password"
								/>
							</div>
							<button
								type="submit"
								class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center gap-3 dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
								@click="handleSubmit"
								:disabled="loading"
								:class="loading && 'bg-slate-700 dark:bg-sky-400'"
							>
								<LoadingComponent v-if="loading" />
								{{ loading ? "Loading..." : "Sign in" }}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
	<FooterComponent />
</template>
