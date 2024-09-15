// routes/[slug]/+page.server.ts

import { getProject, getProjects } from '$lib/server/contentful';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const project = await getProject(params.slug);
		const allProjects = await getProjects();

		if (!project) {
			return {
				project: null,
				error: 'Project not found',
				allProjects
			};
		}

		return { project, allProjects };
	} catch (error) {
		console.error('Error fetching project:', error);
		return {
			project: null,
			error: 'Failed to load project. Please try again later.',
			allProjects: []
		};
	}
};