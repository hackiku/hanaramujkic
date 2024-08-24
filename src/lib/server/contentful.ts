// $lib/server/contentful.ts

import pkg from 'contentful';
const { createClient } = pkg;
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '$env/static/private';

const client = createClient({
	space: CONTENTFUL_SPACE_ID,
	accessToken: CONTENTFUL_ACCESS_TOKEN,
});

export interface Project {
	id: string;
	title: string;
	company?: string;
	venue?: string;
	director?: string;
	city?: {
		lat: number;
		lon: number;
	};
	media: {
		url: string;
		title: string;
	}[];
	projectDescription: any;
}

export async function getProjects(): Promise<Project[]> {
	try {
		const response = await client.getEntries({
			content_type: 'project',
		});

		return response.items.map((item: any) => ({
			id: item.sys.id,
			title: item.fields.title,
			company: item.fields.company,
			venue: item.fields.venue,
			director: item.fields.director,
			city: item.fields.city,
			media: item.fields.media?.map((media: any) => ({
				url: `https:${media.fields.file.url}`,
				title: media.fields.title,
			})) || [],
			projectDescription: item.fields.projectDescription,
		}));
	} catch (error) {
		console.error('Error fetching projects from Contentful:', error);
		return [];
	}
}
