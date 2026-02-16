<script lang="ts">
	import '../app.css';
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100">
	<header class="border-b border-gray-200 bg-white shadow-sm">
		<div class="container mx-auto px-4 py-6">
			<a href="/" class="inline-block">
				<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Task trmnl4</h1>
			</a>
		</div>
	</header>

	<main class="container mx-auto h-full px-4 py-8">
		<slot />
	</main>

	<footer class="mt-auto border-t border-gray-200 bg-white py-6">
		<div class="container mx-auto px-4 text-center text-sm text-gray-600">© Test right.</div>
	</footer>
</div>
