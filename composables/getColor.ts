export const getColor = (type: string) => {
	switch (type) {
		case "Walk":
			return "bg-orange-500";
			break;
		case "Mountainbike":
			return "bg-green-500";
			break;
		case "Roadbike":
			return "bg-blue-500";
			break;
	}
};
