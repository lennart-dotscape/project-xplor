<template>
	<div v-if="!isCreating" id="map" class="w-full h-full z-30"></div>
	<div v-if="props.edit && !isCreating" class="w-full top-[92px] bg-white p-4 absolute md:top-32 left-1/2 -translate-x-1/2 z-40 shadow-sm md:w-auto md:mx-0">
		<span v-if="waypoints.length == 0">Click on the map to set your first waypoint</span>
		<span v-if="waypoints.length == 1">Add atleast one more waypoint</span>
		<div v-if="waypoints.length >= 2">
			<span>
				Add more waypoints or
				<span class="underline cursor-pointer" @click="createRoute()">save route</span>
			</span>
		</div>
		<span v-if="waypoints.length > 1">Total distance: {{ distance }}km</span>
	</div>
	<div v-if="isCreating">
		<RouteForm :distance="distance" :waypoints="waypoints" />
	</div>
</template>

<script lang="ts" setup>
import type { Map } from "leaflet";

const map = ref<Map | null>(null);
const routeControl = ref<any>(null);
const waypoints = ref<Waypoint[]>([]);
const view = ref<Waypoint>({ lat: 0, lng: 0 });
const isCreating = ref<boolean>(false);
const distance = ref<number>(0);

const props = defineProps<{
	edit: boolean;
	view: Waypoint;
	waypoints?: Waypoint[];
}>();

onMounted(async () => {
	const L = (await import("leaflet")).default;
	await import("leaflet-routing-machine");

	setMap(L);
});

function setMap(L: any) {
	view.value.lat = props.view.lat;
	view.value.lng = props.view.lng;

	const leafletMap = L.map("map").setView([view.value.lat, view.value.lng], 13);
	map.value = leafletMap;

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
	}).addTo(leafletMap);

	routeControl.value = L.Routing.control({
		waypoints: getWaypoints(),
		routeWhileDragging: true,
	}).addTo(leafletMap);

	if (props.edit) {
		setEditListeners(leafletMap, L);
	}
}

function setEditListeners(leafletMap: Map, L: any) {
	leafletMap.on("click", (event: L.LeafletMouseEvent) => {
		const { lat, lng } = event.latlng;
		const waypoint = L.latLng(lat, lng);

		waypoints.value.push(waypoint);
		routeControl.value.setWaypoints(waypoints.value);

		if (waypoints.value.length > 1) {
			routeControl.value.route();
		}

		routeControl.value.on("routesfound", (e: any) => {
			const routes = e.routes;
			distance.value = parseFloat((routes[0].summary.totalDistance / 1000).toFixed(2));
		});
	});
}

function getWaypoints() {
	if (props.waypoints) {
		return props.waypoints;
	} else {
		return [];
	}
}

function createRoute() {
	isCreating.value = true;
}
</script>
