// routes/api/projects/+server.ts

import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'lib', 'data', 'portfolio-data.json');

export async function GET() {
	try {
		const data = await fs.readFile(DATA_FILE, 'utf-8');
		return json(JSON.parse(data));
	} catch (error) {
		console.error('Error reading portfolio data:', error);
		return json({ projects: [] }, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const newProject = await request.json();
		const data = await fs.readFile(DATA_FILE, 'utf-8');
		const portfolioData = JSON.parse(data);

		// Generate a unique ID for the new project
		newProject.id = Date.now().toString();

		portfolioData.projects.push(newProject);

		await fs.writeFile(DATA_FILE, JSON.stringify(portfolioData, null, 2));
		return json({ success: true, project: newProject });
	} catch (error) {
		console.error('Error saving project:', error);
		return json({ success: false, error: 'Failed to save project' }, { status: 500 });
	}
}