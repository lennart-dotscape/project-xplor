export {};

declare global {
	type Waypoint = {
		lat: number;
		lng: number;
	};
	type Route = {
		slug: string;
		title: string;
		description: string;
		image: string;
		type: string;
		distance: number;
		waypoints: Waypoint[];
		creator: string;
	};
}
