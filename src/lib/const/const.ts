import type { ApplicationStatus } from "$lib/types";

export const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string }> =
		{
			new: { label: 'New', color: 'text-blue-800', bgColor: 'bg-blue-100' },
			reviewed: { label: 'Reviewed', color: 'text-yellow-800', bgColor: 'bg-yellow-100' },
			accepted: { label: 'Accepted', color: 'text-green-800', bgColor: 'bg-green-100' },
			rejected: { label: 'Rejected', color: 'text-red-800', bgColor: 'bg-red-100' }
		};