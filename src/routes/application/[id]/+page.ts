import { fetchApplicationByUUID } from '$lib/service/service';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const application = await fetchApplicationByUUID(params.id);
		return { application };
	} catch (e) {
		throw error(404, {
			message: e instanceof Error ? e.message : 'Товар не найден'
		});
	}
};
