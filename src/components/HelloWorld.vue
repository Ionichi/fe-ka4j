<script setup>
defineProps({
	msg: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="greetings text-center sm:text-left">
		<h1 class="green">{{ msg }}</h1>
		<h3>
			KA4J (Kids Army For Jesus) is managed by
			<a href="https://github.com/ionichi" target="_blank" rel="noopener"> Ionichi </a>
		</h3>
	</div>
</template>

<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	position: relative;
	top: -10px;
}

h3 {
	font-size: 1.2rem;
}

@media (min-width: 1024px) {
	.greetings h1,
	.greetings h3 {
		text-align: left;
	}
}
</style>
