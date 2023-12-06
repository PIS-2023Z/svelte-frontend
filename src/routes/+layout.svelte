<nav>
	<a href="/">Home</a>
	<a href="/offers">Manage offers</a>
</nav>
<slot />

<style>
	nav {
		background-color: rgb(13, 13, 26);
		width: 100%;
	}
	nav a {
		color: beige;
		font-family: Poppins, Helvetica, Arial, sans-serif;
	}
	:global(body) {
		background-color: rgb(40, 40, 70);
	}
</style>
