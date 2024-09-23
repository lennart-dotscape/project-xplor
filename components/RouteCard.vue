<template>
	<a class="group" :href="created ? '/plan' : '/routes/' + data.slug">
		<div class="rounded-xl overflow-hidden bg-white h-full">
			<div class="w-full h-40 overflow-hidden">
				<img class="object-cover h-full w-full group-hover:scale-110 transition-transform" :src="data.image" :alt="data.title" />
			</div>
			<div class="p-4">
				<div class="flex justify-between items-center mb-2">
					<span class="rounded-2xl px-2 py-1 text-white font-bold text-xs" :class="getColor(data.type)">{{ data.type }}</span>
					<span class="font-bold">{{ data.distance }}km</span>
				</div>
				<h3 class="heading-md mb-2 truncate">{{ data.title }}</h3>
				<p class="line-clamp-3">{{ data.description }}</p>
			</div>
		</div>
	</a>
</template>

<script setup lang="ts">
defineProps<{
	data: Route;
	created: boolean;
}>();
</script>
