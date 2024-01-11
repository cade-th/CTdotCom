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

<div class="relative min-h-screen">

    <!-- Content on top of the canvas -->
    <div class="content-container font-mono">
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

        <div class="footer-container">
            <Footer />
        </div>
        
    </div>
</div>

<style>
    

    .content-container {
        position: relative;
        z-index: 1; /* Ensure content is above the canvas */
    }

    .header-container {
        position: fixed;
        width: 100%;
        z-index: 2; /* Ensure the header is above the content and canvas */
    }

    .footer-container {
        margin-top:400px;
    }

    .welcome-message {
        position: fixed;
        bottom: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        z-index: 2; /* Ensure it's above the content and canvas */
    }

    /* ... rest of your styles ... */
</style>
