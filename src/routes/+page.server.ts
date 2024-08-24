// src/routes/+page.server.ts

import { getProjects } from '$lib/server/contentful';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await getProjects();
	return { projects };
};

