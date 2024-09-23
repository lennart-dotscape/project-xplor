<template>
	<div class="container my-32 md:my-40">
		<div class="grid grid-cols-12">
			<div class="col-span-12 md:col-span-10 md:col-start-2">
				<h1 class="heading-lg mb-12">Account</h1>

				<h2 class="heading-md">Created routes</h2>
				<div v-if="createdRoutes.length == 0" class="mb-8">
					<span>
						No created routes found.
						<a class="underline" href="/plan">Create one here.</a>
					</span>
				</div>
				<div class="grid grid-cols-12 gap-y-8 md:gap-8 mb-12">
					<div v-for="route in createdRoutes" class="col-span-12 md:col-span-6 lg:col-span-4">
						<RouteCard :data="route" :created="true" />
					</div>
				</div>

				<h2 class="heading-md">Saved routes</h2>
				<div v-if="savedRoutes.length == 0" class="mb-8">
					<span>
						No saved routes found.
						<a class="underline" href="/">Find routes here.</a>
					</span>
				</div>
				<div class="grid grid-cols-12 gap-y-8 md:gap-8">
					<div v-for="route in savedRoutes" class="col-span-12 md:col-span-6 lg:col-span-4">
						<RouteCard :data="route" :created="false" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { getCreatedRoutes, getSavedRoutes } = localStorageHandler();
const createdRoutes = ref<Route[]>([]);
const savedRoutes = ref<Route[]>([]);

onMounted(() => {
	createdRoutes.value = getCreatedRoutes();
	savedRoutes.value = getSavedRoutes();
});
</script>
