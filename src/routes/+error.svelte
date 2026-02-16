<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Error | HOME</title>
</svelte:head>

<div class="mx-auto max-w-2xl py-16 text-center">
	<div class="rounded-lg border border-red-300 bg-red-50 p-8">
		<svg
			class="mx-auto mb-6 h-20 w-20 text-red-600"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/>
		</svg>

		<h1 class="mb-4 text-3xl font-bold text-red-900">
			{$page.status === 404 ? 'Page not found' : 'An error has occurred'}
		</h1>

		<p class="mb-6 text-lg text-red-700">
			{$page.error?.message || 'Something went wrong. Please try returning to the home page.'}
		</p>

		<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="/"
				class="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
				Home
			</a>

			<button
				on:click={() => window.history.back()}
				class="inline-flex cursor-pointer items-center justify-center rounded-lg border border-red-600 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back
			</button>
		</div>
	</div>
</div>
