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
		console.log(`Fetching project with slug: ${slug}`);
		const response = await client.getEntries({
			content_type: 'project',
			'fields.slug': slug,
			limit: 1
		});

		if (response.items.length === 0) {
			console.log(`No project found with slug: ${slug}`);
			return null;
		}

		const item = response.items[0];
		console.log(`Found project: ${item.fields.title}`);
		return mapContentfulItemToProject(item);
	} catch (error) {
		console.error('Error fetching project from Contentful:', error);
		return null;
	}
}

export async function getProjects(): Promise<Project[]> {
	try {
		console.log('Fetching all projects');
		const response = await client.getEntries({
			content_type: 'project',
		});

		console.log(`Found ${response.items.length} projects`);
		return response.items.map(mapContentfulItemToProject);
	} catch (error) {
		console.error('Error fetching projects from Contentful:', error);
		return [];
	}
}

function mapContentfulItemToProject(item: any): Project {
	console.log(`Mapping project: ${item.fields.title}`);
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
		media: item.fields.media?.map((media: any) => {
			if (media?.fields?.file) {
				return {
					url: `https:${media.fields.file.url}`,
					title: media.fields.title || 'Untitled',
				};
			}
			return null;
		}).filter(Boolean) || [],
		projectDescription: item.fields.projectDescription,
		spot: item.fields.spot,
		tags: item.fields.tags,
	};
}

export function getProjectRawUrl(slug: string): string {
	return `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=project&fields.slug=${slug}`;
}