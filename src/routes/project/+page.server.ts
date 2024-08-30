// src/routes/project/+page.server.ts

import { getProjects } from '$lib/server/contentful';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		console.log('Fetching projects from Contentful...');
		const projects = await getProjects();
		console.log(`Fetched ${projects.length} projects successfully`);
		return { projects };
	} catch (error) {
		console.error('Error fetching projects:', error);
		return {
			projects: [],
			error: 'Failed to load projects. Please try again later.'
		};
	}
};