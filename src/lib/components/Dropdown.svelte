<script lang="ts">
	import type { PageData } from '../../routes/$types';

	export let data: PageData;
	export let selectedProgram: string | null = null;
	export let onSelect: (program: string) => void;

	let isOpen = false;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectCategory(program: string) {
		selectedProgram = program;
		isOpen = false;
		onSelect(program);
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.dropdown-container')) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown-container relative w-full max-w-xs">
	<button
		on:click|stopPropagation={toggleDropdown}
		class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left shadow-sm transition hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="block truncate font-medium text-gray-900">
			{selectedProgram ? selectedProgram : 'Choose program'}
		</span>
		<svg
			class="ml-2 h-5 w-5 text-gray-500 transition-transform {isOpen ? 'rotate-180' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<div
			class="absolute z-100 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
			role="listbox"
		>
			{#if data.programs.length === 0}
				<div class="w-full px-4 py-3 text-center">Programs not found</div>
			{:else}
				{#each data.programs as program (program.id)}
					<button
						on:click={() => selectCategory(program.name)}
						class="block w-full px-4 py-3 text-left transition hover:bg-blue-50 focus:bg-blue-50 focus:outline-none {selectedProgram ===
						program.name
							? 'bg-blue-100 font-semibold text-blue-900'
							: 'text-gray-900'}"
						role="option"
						aria-selected={selectedProgram === program.name}
					>
						{program.name}
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>
