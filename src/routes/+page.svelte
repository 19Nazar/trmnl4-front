<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import ItemCard from '$lib/components/ApplicationsCard.svelte';
	import { fetchApplicationByProgram } from '$lib/service/service';
	import type { PageData } from './$types';
	import ApplicationsCard from '$lib/components/ApplicationsCard.svelte';
	import type { Application, Meta, Program } from '$lib/types';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data: PageData;

	let selectedProgram: string | null = null;
	let applications: Application[] = [];
	let loading = false;
	let error: string | null = null;

	const ITEMS_PER_PAGE = 12;

	let currentPage = 1;

	let paginatedResult: Meta | null = null;

	async function handleProgramSelect(program: string, page = 1) {
		selectedProgram = program;
		loading = true;
		error = null;
		applications = [];
		currentPage = 1;

		try {
			//can do by map
			const idProgram = data.programs.find((p) => p.name === program);
			if (!idProgram) {
				const test = JSON.stringify(data.programs);
				console.log({ idProgram, program, test });
				error = 'Didn`t find id program';
				return;
			}
			const { items, meta } = await fetchApplicationByProgram(idProgram.id, page, ITEMS_PER_PAGE);
			applications = items;
			paginatedResult = meta;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error';
		} finally {
			loading = false;
		}
	}

	async function handlePageChange(newPage: number) {
		currentPage = newPage;
		if (!selectedProgram) {
			error = 'Program not selected';
			return;
		}
		await handleProgramSelect(selectedProgram, newPage);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function retry() {
		if (selectedProgram) {
			await handleProgramSelect(selectedProgram);
		}
	}
</script>

<svelte:head>
	<title>trmnl4</title>
	<meta name="description" content="test task" />
</svelte:head>

<div class="mx-auto h-full max-w-7xl">
	<div class="mb-8 text-center">
		<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Select a program</h2>
		<p class="mb-6 text-gray-600">Find the program you are interested in</p>

		<div class="flex justify-center">
			<Dropdown {data} bind:selectedProgram onSelect={handleProgramSelect} />
		</div>
	</div>

	{#if loading}
		<div class="py-12">
			<Loader size="lg" />
			<p class="mt-4 text-center text-gray-600">Loading applications...</p>
		</div>
	{:else if error}
		<div class="py-12">
			<ErrorMessage message={error} onRetry={retry} />
		</div>
	{:else if applications.length > 0}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each applications as application (application.uuid)}
				<ApplicationsCard applications={application} />
			{/each}
		</div>

		{#if paginatedResult && paginatedResult.totalPages > 1}
			<div class="mt-8">
				<Pagination
					currentPage={paginatedResult.page}
					totalPages={paginatedResult.totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		{/if}
	{:else if selectedProgram}
		<div class="rounded-lg border border-gray-200 bg-white p-12 text-center">
			<svg class="mx-auto mb-4 h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"
				/>
			</svg>
			<p class="text-gray-600">This is program have not applications</p>
		</div>
	{/if}
</div>
