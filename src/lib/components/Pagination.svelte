<script lang="ts">
	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let onPageChange: (page: number) => Promise<void>;

	$: pages = generatePageNumbers(currentPage, totalPages);

	function generatePageNumbers(current: number, total: number): (number | string)[] {
		if (total <= 7) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [1];

		if (current > 3) {
			pages.push('...');
		}

		const start = Math.max(2, current - 1);
		const end = Math.min(total - 1, current + 1);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (current < total - 2) {
			pages.push('...');
		}

		pages.push(total);

		return pages;
	}

	function generateMobilePages(current: number, total: number): (number | string)[] {
		if (total <= 3) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [];

		if (current > 1) {
			pages.push(1);
		}

		if (current > 2) {
			pages.push('...');
		}

		if (current > 1) {
			pages.push(current - 1);
		}

		pages.push(current);

		if (current < total) {
			pages.push(current + 1);
		}

		if (current < total - 1) {
			pages.push('...');
		}

		if (current < total) {
			pages.push(total);
		}

		return pages;
	}

	$: mobilePages = generateMobilePages(currentPage, totalPages);

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	}
</script>

<nav class="flex items-center justify-center gap-1 sm:gap-2" aria-label="Pagination">
	<button
		on:click={() => goToPage(currentPage - 1)}
		disabled={currentPage === 1}
		class="flex flex-shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white sm:px-4"
		aria-label="Previous page"
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		<span class="ml-1 hidden sm:inline">Back</span>
	</button>

	<div class="hidden sm:flex sm:gap-1">
		{#each pages as page}
			{#if page === '...'}
				<span class="flex items-center px-2 text-gray-500">...</span>
			{:else}
				<button
					on:click={() => goToPage(Number(page))}
					class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border text-sm font-medium transition focus:ring-2 focus:ring-blue-500 focus:outline-none {currentPage ===
					page
						? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
						: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}"
					aria-label="Page {page}"
					aria-current={currentPage === page ? 'page' : undefined}
				>
					{page}
				</button>
			{/if}
		{/each}
	</div>

	<div class="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto sm:hidden">
		{#each mobilePages as page}
			{#if page === '...'}
				<span class="flex items-center px-1 text-xs text-gray-500">...</span>
			{:else}
				<button
					on:click={() => goToPage(Number(page))}
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border text-xs font-medium transition focus:ring-2 focus:ring-blue-500 focus:outline-none {currentPage ===
					page
						? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
						: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}"
					aria-label="Page {page}"
					aria-current={currentPage === page ? 'page' : undefined}
				>
					{page}
				</button>
			{/if}
		{/each}
	</div>

	<button
		on:click={() => goToPage(currentPage + 1)}
		disabled={currentPage === totalPages}
		class="flex flex-shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white sm:px-4"
		aria-label="Next page"
	>
		<span class="mr-1 hidden sm:inline">Next</span>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>
</nav>

<div class="mt-2 text-center text-xs text-gray-500 sm:hidden">
	Page {currentPage} of {totalPages}
</div>
