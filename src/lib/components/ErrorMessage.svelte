<script lang="ts">
	export let message: string;
	export let onRetry: (() => void) | null = null;
</script>

<div class="mx-auto max-w-md rounded-lg border border-red-300 bg-red-50 p-6 text-center">
	<svg
		class="mx-auto mb-4 h-12 w-12 text-red-600"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
	<h3 class="mb-2 text-lg font-semibold text-red-900">Error</h3>
	<p class="mb-4 text-red-700">{message}</p>
	{#if onRetry}
		<button
			on:click={onRetry}
			class="rounded-lg bg-red-600 px-6 py-2 text-white transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
		>
			Try again
		</button>
	{/if}
</div>
