export function localStorageHandler() {
	const getRoutes = () => {
		const storedRoutes = localStorage.getItem("routes");
		return storedRoutes ? JSON.parse(storedRoutes) : [];
	};
	const getCreatedRoutes = () => {
		const routesArray: Route[] = getRoutes();
		const updatedRoutesArray = routesArray.filter((item) => item.creator == "guest");

		return updatedRoutesArray;
	};
	const getSavedRoutes = () => {
		const routesArray: Route[] = getRoutes();
		const updatedRoutesArray = routesArray.filter((item) => item.creator != "guest");

		return updatedRoutesArray;
	};
	const storeRoute = (route: Route) => {
		const routesArray: Route[] = getRoutes();
		const exists = routesArray.some((item) => item.slug === route.slug);
		if (!exists) {
			routesArray.push(route);
			localStorage.setItem("routes", JSON.stringify(routesArray));
		}
	};

	const checkStored = (route: Route) => {
		const routesArray: Route[] = getRoutes();
		const exists = routesArray.some((item) => item.slug === route.slug);
		return exists;
	};

	const removeRoute = (route: Route) => {
		const routesArray: Route[] = getRoutes();
		const updatedRoutesArray = routesArray.filter((item) => item.slug !== route.slug);

		localStorage.setItem("routes", JSON.stringify(updatedRoutesArray));
	};

	return {
		getRoutes,
		getCreatedRoutes,
		getSavedRoutes,
		storeRoute,
		checkStored,
		removeRoute,
	};
}
