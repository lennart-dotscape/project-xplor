<template>
	<div class="container py-28 md:py-32">
		<div class="grid grid-cols-12">
			<div class="col-span-12 lg:col-span-8 lg:col-start-3">
				<a class="underline inline-block mb-12" href="/">< Go back</a>
				<div class="flex justify-between items-center mb-2">
					<span class="rounded-2xl px-2 py-1 text-white font-bold text-xs" :class="getColor(data.type)">{{ data.type }}</span>
					<span class="font-bold">{{ data.distance }}km</span>
				</div>
				<div class="w-full h-72 rounded-xl overflow-hidden mb-4">
					<img class="object-cover w-full h-full" :src="data.image" :alt="data.title" />
				</div>
				<h1 class="heading-md mb-4">{{ data.title }}</h1>
				<p class="mb-12">{{ data.description }}</p>

				<div class="w-full text-right text-sm" v-if="isSaved">
					This route has been saved, go to your
					<a href="/account" class="underline">account</a>
					to see all your saved routes
				</div>
				<div class="h-96 w-full rounded-xl overflow-hidden relative">
					<button class="p-2 bg-green-500 rounded-md absolute top-4 right-4 z-50 text-white hover:bg-green-700 transition-colors" @click="routeHandler()">{{ isSaved ? "Remove route" : "Save route" }}</button>
					<Map :edit="false" :waypoints="data.waypoints" :view="data.waypoints[0]" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const routeParams = useRoute();
const { data: route } = await useAsyncData(() => queryContent(`routes/${routeParams.params.slug}`).findOne() as Promise<unknown>);
const data = route.value as Route;
const isSaved = ref<boolean>(false);

const { storeRoute, checkStored, removeRoute } = localStorageHandler();

onMounted(() => {
	isSaved.value = checkStored(data);
});

function routeHandler() {
	if (isSaved.value) {
		removeRoute(data);
		isSaved.value = false;
	} else {
		storeRoute(data);
		isSaved.value = true;
	}
}
</script>
