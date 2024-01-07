<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	
	import Header from '$lib/components/header.svelte'
	import Footer from '$lib/components/footer.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	async function logout() {
		await supabase.auth.signOut();
	}
</script>

<svelte:head>
	<title>CTdotCom</title>
	<meta name="description" content="My personal website" />
</svelte:head>

<div class="font-mono min-h-screen flex flex-col body1">
		
	<div class="header-container">
		<Header />
	</div>
		

			{#if session}
				<div class="welcome-message">
					<span class="text-lg tracking-tighter p-1">Welcome, {session.user.email}</span>
					<button on:click={logout} class="text-lg tracking-tighter border-2 border-black p-1">
						Sign Out
					</button>
				</div>
        	{/if}

			<div class="content"> 
				<slot></slot>
			</div>
			
		

		<Footer />
</div>


<style>

	.welcome-message {
        position: fixed; /* Absolute positioning */
        bottom: 0; /* Affix to bottom */
        right: 0; /* Affix to left */
        background: rgba(255, 255, 255, 0.9); /* Optional: for better visibility */
        padding: 10px; /* Optional: for spacing */
    }

	/* Default light theme styles */
	.body1 {
		background-color: white !important;
		
	/* other light theme styles */
	}

	/* Override dark mode if it's set in the user's system preferences */
	@media (prefers-color-scheme: dark) {
		.body1 {
			background-color: white !important;
			
			/* same light theme styles as above */
		}

		/* Apply the light theme styles to other elements as needed */
	}

	.header-container {
		position:fixed;
		width:100%;
	}



</style>