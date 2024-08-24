// src/routes/api/portfolio/+server.ts

import { json } from '@sveltejs/kit';
import { getProjects } from '$lib/server/contentful';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const projects = await getProjects();
		return json({ projects });
	} catch (error) {
		console.error('Error fetching projects:', error);
		return json({ error: 'Failed to fetch projects' }, { status: 500 });
	}
};
