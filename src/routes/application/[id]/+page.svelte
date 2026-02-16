<script lang="ts">
	import type { PageData } from './$types';
	import Loader from '$lib/components/Loader.svelte';
	import { goto } from '$app/navigation';
	import { statusConfig } from '$lib/const/const';
	import { formatDate } from '$lib/helpers/helpers';

	export let data: PageData;

	function goBack() {
		goto('/');
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

<svelte:head>
	<title>{data.application.startupName} | trmnl4</title>
	<meta name="description" content={data.application.founderName} />
</svelte:head>

{#await data.application}
	<div class="mx-auto max-w-6xl px-4">
		<div class="mb-6">
			<div class="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
		</div>

		<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
			<div class="grid gap-8 p-6 md:grid-cols-2 lg:p-8">
				<div class="aspect-square animate-pulse rounded-lg bg-gray-200"></div>
				<div class="flex flex-col space-y-4">
					<div class="h-8 w-24 animate-pulse rounded-full bg-gray-200"></div>
					<div class="h-10 w-3/4 animate-pulse rounded bg-gray-200"></div>
					<div class="h-16 w-full animate-pulse rounded bg-gray-200"></div>
				</div>
			</div>
		</div>

		<div class="mt-12 py-12">
			<Loader size="lg" />
			<p class="mt-4 text-center text-gray-600">Loading...</p>
		</div>
	</div>
{:then application}
	<div class="min-h-screen bg-gray-50 py-8">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<!-- Header with Back Button -->
			<div class="mb-6">
				<button
					on:click={goBack}
					class="group flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
				>
					<svg
						class="h-5 w-5 transition group-hover:-translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span class="font-medium">Back to applications</span>
				</button>
			</div>

			<div class="overflow-hidden rounded-2xl bg-white shadow-lg">
				<div
					class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10 md:px-12"
				>
					<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div class="min-w-0 flex-1">
							<h1 class="mb-2 truncate text-3xl font-bold text-white sm:text-4xl">
								{application.startupName}
							</h1>
							<p class="text-blue-100">Application Details</p>
						</div>

						<div class="flex max-w-21.75 flex-shrink-0 flex-col gap-2">
							<label for="status" class="text-sm font-medium text-blue-100">Status</label>
							<div class="relative">
								<div
									id="status"
									class="appearance-none rounded-lg border-0 px-4 py-2 text-sm font-semibold shadow-md transition focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50 {statusConfig[
										application.status
									].bgColor} {statusConfig[application.status].color}"
								>
									{statusConfig[application.status].label}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="p-6 sm:p-8 md:p-12">
					<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
						<div class="min-w-0 space-y-1">
							<label class="text-sm font-medium text-gray-500">Founder Name</label>
							<div class="flex min-w-0 items-center gap-2">
								<div
									class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white"
								>
									{application.founderName.charAt(0).toUpperCase()}
								</div>
								<p class="truncate text-lg font-semibold text-gray-900">
									{application.founderName}
								</p>
							</div>
						</div>

						<div class="min-w-0 space-y-1">
							<label class="text-sm font-medium text-gray-500">Email Address</label>
							<button
								on:click={() => copyToClipboard(application.email)}
								class="group flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-left transition hover:bg-gray-50"
								title="Click to copy"
							>
								<svg
									class="h-5 w-5 flex-shrink-0 text-gray-400 transition group-hover:text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<span class="min-w-0 flex-1 truncate text-lg font-medium text-gray-900">
									{application.email}
								</span>
							</button>
						</div>

						<div class="min-w-0 space-y-1">
							<label class="text-sm font-medium text-gray-500">Application ID</label>
							<button
								on:click={() => copyToClipboard(application.uuid)}
								class="group flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-lg px-3 py-2 font-mono text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
								title="Click to copy"
							>
								<svg
									class="h-4 w-4 flex-shrink-0 text-gray-400 transition group-hover:text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
								<span class="min-w-0 flex-1 truncate text-left">
									{application.uuid}
								</span>
							</button>
						</div>

						<div class="min-w-0 space-y-1">
							<label class="text-sm font-medium text-gray-500">Program name</label>
							<p class="truncate rounded-lg bg-gray-50 px-3 py-2 font-mono text-sm text-gray-900">
								{application.programName}
							</p>
						</div>
					</div>

					<div class="my-8 border-t border-gray-200"></div>

					<div class="space-y-6">
						<h3 class="text-lg font-semibold text-gray-900">Timeline</h3>

						<div class="space-y-4">
							<div class="flex items-start gap-4">
								<div
									class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100"
								>
									<svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<div class="min-w-0 flex-1">
									<p class="font-medium text-gray-900">Application Created</p>
									<p class="truncate text-sm text-gray-500">{formatDate(application.createdAt)}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="border-t border-gray-200 bg-gray-50 px-6 py-4 sm:px-8 md:px-12">
					<div class="flex flex-col gap-3 sm:flex-row sm:justify-between">
						<button
							on:click={goBack}
							class="rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							Back to List
						</button>

						<div class="flex gap-3 max-sm:justify-center">
							<a
								class="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 font-medium text-white transition hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
								href={`mailto:${application.email}`}
							>
								Contact Founder
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:catch error}
	<div class="mx-auto max-w-2xl px-4 py-16 text-center">
		<p class="text-red-600">{error.message}</p>
	</div>
{/await}
