export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api');
	const data = await response.json();
	return data;
};
