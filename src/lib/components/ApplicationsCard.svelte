<script lang="ts">
	import type { Application, ApplicationStatus } from '$lib/types';
	import { APPLICATION_STATUSES } from '$lib/types';
	import { updateApplicationStatus } from '$lib/service/service';
	import { statusConfig } from '$lib/const/const';
	import { formatDate } from '$lib/helpers/helpers';

	export let applications: Application;

	let isUpdating = false;
	let error: string | null = null;
	let currentStatus = applications.status;

	async function handleStatusChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const newStatus = select.value as ApplicationStatus;

		event.stopPropagation();
		event.preventDefault();

		if (newStatus === currentStatus) return;

		isUpdating = true;
		error = null;

		try {
			const updated = await updateApplicationStatus(applications.uuid, newStatus);
			currentStatus = updated.status;
			applications = updated;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to update status';
			select.value = currentStatus;
		} finally {
			isUpdating = false;
		}
	}
</script>

<div
	class="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
>
	<a
		href="/application/{applications.uuid}"
		class="block p-4 pr-30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
	>
		<div>
			<h3 class="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
				{applications.founderName}
			</h3>
			<p class="mb-3 line-clamp-2 text-sm text-gray-600">{applications.startupName}</p>
			<p class="mb-1 text-xs text-gray-500">{applications.email}</p>
			<span class="text-xs text-gray-500">{formatDate(applications.createdAt)}</span>
		</div>
	</a>

	<div class="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
		<select
			value={currentStatus}
			on:change={handleStatusChange}
			disabled={isUpdating}
			class="cursor-pointer appearance-none rounded-lg border-0 py-1.5 pr-8 pl-3 text-sm font-medium shadow-sm transition focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 {statusConfig[
				currentStatus
			].bgColor} {statusConfig[currentStatus].color}"
			style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3E%3C/svg%3E'); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.25rem 1.25rem;"
		>
			{#each APPLICATION_STATUSES as status}
				<option value={status}>
					{statusConfig[status].label}
				</option>
			{/each}
		</select>

		{#if isUpdating}
			<span class="text-xs text-gray-500">Updating...</span>
		{/if}

		{#if error}
			<span class="text-xs text-red-600">{error}</span>
		{/if}
	</div>
</div>
