export const ApplicationStatus = {
	NEW: 'new',
	REVIEWED: 'reviewed',
	ACCEPTED: 'accepted',
	REJECTED: 'rejected',
  } as const;
  
  export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
  
  export const APPLICATION_STATUSES = Object.values(ApplicationStatus);
  
  export interface Application {
	uuid: string;
	founderName: string;
	email: string;
	startupName: string;
	programId: string;
	createdAt: string;
	updatedAt: string;
	status: ApplicationStatus;
  }

  export interface ApplicationOneResp extends Application {
	programName?: string;
  }


export interface Review {
	id: string;
	author: string;
	rating: number;
	comment: string;
	date: string;
}


export interface Program {
	id: string;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
  }


  export interface Meta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
  }

  export interface PaginationResult<T> {
	items: T[];
	meta: Meta;
  }