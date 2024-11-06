<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
	<div
		class="w-full h-screen flex justify-center items-center antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
	>
		<!-- overlay -->
		<div
			class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none"
		>
			<div class="w-[108rem] flex-none flex justify-end">
				<picture>
					<source
						srcSet="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
						type="image/avif"
					/>
					<img
						src="https://tailwindcss.com/_next/static/media/docs@tinypng.d9e4dcdc.png"
						alt=""
						class="w-[71.75rem] flex-none max-w-none dark:hidden"
						decoding="async"
					/>
				</picture>
				<picture>
					<source
						srcSet="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif"
						type="image/avif"
					/>
					<img
						src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png"
						alt=""
						class="w-[90rem] flex-none max-w-none hidden dark:block"
						decoding="async"
					/>
				</picture>
			</div>
		</div>
		<!-- end overlay -->

		<header
			class="flex gap-3 justify-center items-center flex-col sm:flex-row p-3"
		>
			<img
				alt="Vue logo"
				class="logo"
				src="/logo.png"
				width="125"
				height="125"
			/>

			<div class="wrapper">
				<HelloWorld msg="KA4J" />

				<!-- <nav>
					<RouterLink to="/">Home</RouterLink>
				</nav> -->
			</div>
		</header>
	</div>
</template>
