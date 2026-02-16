import {  ApplicationStatus, type Application, type ApplicationOneResp, type PaginationResult, type Program } from '$lib/types';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchApplicationByProgram(program: string, page: number, limit: number): Promise<PaginationResult<Application>> {
	try {
		const params = new URLSearchParams();

		if (program) params.set('programId', program);
		if (page) params.set('page', String(page));
		if (limit) params.set('limit', String(limit));

		const resp = await api<PaginationResult<Application>>(`/applications?${params}`, {
			method: "GET"
		});

		return resp;
		
	} catch (err) {
		if (err instanceof Error) {
			throw error(
				500,
				new Error('Failed to load applications: ' + err.message, {
				  cause: {
					source: 'loadApplications',
					code: 'APP_LOAD_FAILED',
				  },
				}),
			  );
		  };
	  
		  throw error(500, {
			message: 'Unknown error while get applications',
		  });
	}	
}

export async function fetchApplicationByUUID(uuid: string): Promise<ApplicationOneResp> {
	try {
		const params = new URLSearchParams();

		params.set('program', String(true))

		const response = await api<ApplicationOneResp>(`/applications/${uuid}?${params}`, {
			method: 'GET',
		});
		return response;
	} catch (error) {
		console.error('Failed to get application by UUID :', error);
		throw error;
	}
}


export async function fetchPrograms(): Promise<Program[]> {
	try {
		const resp = await api<Program[]>('/programs/active', {
			method: "GET"
		});

		return resp;
		
	} catch (err) {
		if (err instanceof Error) {
			throw error(
				500,
				new Error('Failed to load programs: ' + err.message, {
				  cause: {
					source: 'loadApplications',
					code: 'APP_LOAD_FAILED',
				  },
				}),
			  );
		  };
	  
		  throw error(500, {
			message: 'Unknown error while get programs',
		  });
	}	
}


export async function updateApplicationStatus(
	uuid: string, 
	status: ApplicationStatus
): Promise<Application> {
	try {
		const response = await api<Application>(`/applications/${uuid}/status`, {
			method: 'PATCH',
			body: JSON.stringify({ status })
		});
		return response;
	} catch (error) {
		console.error('Failed to update status:', error);
		throw error;
	}
}