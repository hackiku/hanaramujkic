// src/routes/+page.server.ts

import { getProjects } from '$lib/server/contentful';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const projects = await getProjects();
		if (projects.length === 0) {
			console.log('No projects found');
		}
		return { projects };
	} catch (error) {
		console.error('Error fetching projects:', error);
		return {
			projects: [],
			error: 'Failed to load projects. Please try again later.'
		};
	}
};
