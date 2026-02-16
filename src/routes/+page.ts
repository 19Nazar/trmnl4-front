// src/routes/your-route/+page.ts
import type { PageLoad } from './$types';
import { fetchPrograms } from '$lib/service/service';

export const load: PageLoad = async () => {
	try {
		const programs = await fetchPrograms();
		return {
			programs: programs
		};
	} catch (error) {
		console.error('Failed to load programs:', error);
		throw error;
	}
};