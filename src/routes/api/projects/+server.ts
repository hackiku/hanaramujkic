// routes/api/projects/+server.ts

import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

const AUTH = () => ({ id: "fakeId" }); // Fake auth function, replace with real auth

const DATA_FILE = path.join(process.cwd(), 'src', 'lib', 'data', 'portfolio-data.json');

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.middleware(async ({ req }) => {
			const user = AUTH();
			if (!user) throw new Error("Unauthorized");
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);
			console.log("file url", file.url);
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

async function readData() {
	const data = await fs.readFile(DATA_FILE, 'utf-8');
	return JSON.parse(data);
}

async function writeData(data) {
	await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
	try {
		const data = await readData();
		return json(data);
	} catch (error) {
		console.error('Error reading portfolio data:', error);
		return json({ projects: [] }, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const newProject = await request.json();
		const data = await readData();

		newProject.id = Date.now().toString();
		newProject.images = newProject.images || [];
		if (newProject.image) {
			newProject.images.unshift(newProject.image);
			delete newProject.image;
		}

		data.projects.push(newProject);

		await writeData(data);
		return json({ success: true, project: newProject });
	} catch (error) {
		console.error('Error saving project:', error);
		return json({ success: false, error: 'Failed to save project' }, { status: 500 });
	}
}

export async function PUT({ params, request }) {
	try {
		const { id } = params;
		const updatedProject = await request.json();
		const data = await readData();

		const index = data.projects.findIndex(p => p.id === id);
		if (index === -1) {
			return json({ success: false, error: 'Project not found' }, { status: 404 });
		}

		updatedProject.images = updatedProject.images || [];
		if (updatedProject.image) {
			updatedProject.images.unshift(updatedProject.image);
			delete updatedProject.image;
		}

		data.projects[index] = { ...data.projects[index], ...updatedProject };

		await writeData(data);
		return json({ success: true, project: data.projects[index] });
	} catch (error) {
		console.error('Error updating project:', error);
		return json({ success: false, error: 'Failed to update project' }, { status: 500 });
	}
}

export async function DELETE({ params }) {
	try {
		const { id } = params;
		const data = await readData();

		const index = data.projects.findIndex(p => p.id === id);
		if (index === -1) {
			return json({ success: false, error: 'Project not found' }, { status: 404 });
		}

		data.projects.splice(index, 1);

		await writeData(data);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting project:', error);
		return json({ success: false, error: 'Failed to delete project' }, { status: 500 });
	}
}