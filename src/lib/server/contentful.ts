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
	slug: string;
	title: string;
	venue?: string;
	writer?: string;
	conductor?: string;
	director?: string;
	setDesigner?: string;
	costumeDesigner?: string;
	city?: {
		lat: number;
		lon: number;
	};
	photographer?: string;
	media: {
		url: string;
		title: string;
	}[];
	projectDescription: any;
	spot?: number;
	tags?: string[];
}

export async function getProject(slug: string): Promise<Project | null> {
	try {
		const response = await client.getEntries({
			content_type: 'project',
			'fields.slug': slug,
			limit: 1
		});

		if (response.items.length === 0) {
			return null;
		}

		const item = response.items[0];
		return {
			id: item.sys.id,
			slug: item.fields.slug,
			title: item.fields.title,
			venue: item.fields.venue,
			writer: item.fields.writer,
			conductor: item.fields.conductor,
			director: item.fields.director,
			setDesigner: item.fields.setDesigner,
			costumeDesigner: item.fields.costumeDesigner,
			city: item.fields.city,
			photographer: item.fields.photographer,
			media: item.fields.media?.map((media: any) => ({
				url: `https:${media.fields.file.url}`,
				title: media.fields.title || 'Untitled',
			})) || [],
			projectDescription: item.fields.projectDescription,
			spot: item.fields.spot,
			tags: item.fields.tags,
		};
	} catch (error) {
		console.error('Error fetching project from Contentful:', error);
		return null;
	}
}


export async function getProjects(): Promise<Project[]> {
	try {
		const response = await client.getEntries({
			content_type: 'project',
		});

		return response.items.map((item: any) => {
			console.log('Processing item:', item.sys.id);
			return {
				id: item.sys.id,
				title: item.fields.title,
				venue: item.fields.venue,
				writer: item.fields.writer,
				conductor: item.fields.conductor,
				director: item.fields.director,
				setDesigner: item.fields.setDesigner,
				costumeDesigner: item.fields.costumeDesigner,
				city: item.fields.city,
				photographer: item.fields.photographer,
				media: item.fields.media?.map((media: any) => {
					if (media && media.fields && media.fields.file) {
						return {
							url: `https:${media.fields.file.url}`,
							title: media.fields.title || 'Untitled',
						};
					} else {
						console.warn(`Invalid media for project ${item.sys.id}:`, media);
						return null;
					}
				}).filter(Boolean) || [],
				projectDescription: item.fields.projectDescription,
				spot: item.fields.spot,
				tags: item.fields.tags,
			};
		});
	} catch (error) {
		console.error('Error fetching projects from Contentful:', error);
		return [];
	}
}