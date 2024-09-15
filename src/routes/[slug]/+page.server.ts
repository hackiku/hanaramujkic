// routes/[slug]/+page.server.ts

import { getProject, getProjects } from '$lib/server/contentful';
import type { PageServerLoad } from './$types';

const slugMap = {
	"Die Riesen vom Berge": "die-riesen-vom-berge",
	"Kapitän Nemos Bibliothek": "kapitan-nemos-bibliothek",
	"Dippel. Diagnose Cin 3": "dippel-diagnose-cin-3",
	"Reigen": "reigen",
	"Melancholia": "melancholia",
	"Der Kopf der Ariadne!": "der-kopf-der-ariadne",
	"Cinderella": "cinderella"
};

export const load: PageServerLoad = async ({ params }) => {
	try {
		let project = await getProject(params.slug);

		if (!project) {
			// Try to find the project by title if slug doesn't match
			const allProjects = await getProjects();
			project = allProjects.find(p => slugMap[p.title] === params.slug);
		}

		if (!project) {
			return {
				status: 404,
				error: 'Project not found'
			};
		}

		return { project };
	} catch (error) {
		console.error('Error fetching project:', error);
		return {
			status: 500,
			error: 'Failed to load project. Please try again later.'
		};
	}
};