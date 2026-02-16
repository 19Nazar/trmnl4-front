<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeClasses = {
		sm: 'h-6 w-6 border-2',
		md: 'h-12 w-12 border-4',
		lg: 'h-16 w-16 border-4'
	};
</script>

<div class="flex items-center justify-center">
	<div
		class="animate-spin rounded-full border-blue-600 border-t-transparent {sizeClasses[size]}"
		role="status"
		aria-label="Загрузка"
	>
		<span class="sr-only">Loading...</span>
	</div>
</div>
