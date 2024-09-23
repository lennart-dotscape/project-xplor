<template>
	<div class="container py-28 md:py-32">
		<div class="grid grid-cols-12">
			<div class="col-span-12 lg:col-span-8 lg:col-start-3">
				<a class="underline inline-block mb-12" href="/plan">< Go back</a>

				<form @submit.prevent="submitForm">
					<div class="mb-4">
						<label for="title" class="block font-medium text-gray-700">Title</label>
						<input v-model="route.title" type="text" id="title" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter title" required />
					</div>
					<div class="mb-4">
						<label for="description" class="block font-medium text-gray-700">Description</label>
						<textarea v-model="route.description" id="description" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter description" required></textarea>
					</div>
					<div class="mb-4">
						<label for="image" class="block font-medium text-gray-700">Image URL</label>
						<input v-model="route.image" type="text" id="image" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter image URL" required />
					</div>
					<div class="mb-4">
						<label for="type" class="block font-medium text-gray-700">Type</label>
						<select v-model="route.type" id="type" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
							<option value="" disabled>Select route type</option>
							<option value="Walk">Walk</option>
							<option value="Roadbike">Roadbike</option>
							<option value="Mountainbike">Mountainbike</option>
						</select>
					</div>
					<div class="mb-4">
						<label for="distance" class="block font-medium text-gray-700">Distance (in km)</label>
						<input v-model.number="route.distance" type="number" id="distance" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter distance" disabled />
					</div>
					<div class="">
						<button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Create Route</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { storeRoute, getRoutes } = localStorageHandler();
const props = defineProps<{
	distance: number;
	waypoints: Waypoint[];
}>();

const route = ref<Route>({
	slug: "",
	title: "",
	description: "",
	image: "",
	type: "",
	distance: 0,
	waypoints: [],
	creator: "",
});

onMounted(() => {
	route.value.distance = props.distance;
	route.value.waypoints = props.waypoints;
});
const submitForm = async () => {
	route.value.creator = "guest";
	route.value.slug = route.value.title;
	storeRoute(route.value);
	await navigateTo("/account");
};
</script>
