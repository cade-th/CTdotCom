<script lang="ts">
    import Scene from '$lib/components/scene.svelte'
    import { onMount } from 'svelte';

    // Position variables for the cube
    let cubePosition = { x: 0, y: 0, z: 0 };

    function updateCubePosition() {
        // Adjust these values to position the cube under the GitHub link
        cubePosition.x = 0;
        cubePosition.y = -0.0;
        cubePosition.z = 0;
    }

    onMount(() => {
        updateCubePosition();
        window.addEventListener('resize', updateCubePosition);
	});


</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-800">
        Welcome to Cade Thornton.com!
    </h1>
    <p class="mt-4 text-xl md:text-2xl lg:text-3xl text-gray-600">
        Aspiring FPGA and Linux Embedded Engineer
    </p>
    <h2 class="mt-4 text-lg md:text-xl lg:text-2xl text-gray-700">
        This app has full user-authentication, works on any screen size, and has a full postgreSQL database.
    </h2>
    <a href="https://github.com/cade-th/CTdotCom"
       class="mt-2 text-blue-600 hover:text-blue-800 transition duration-300"
       target="_blank">
        View the Source Code
    </a>

    <div class="canvas-container">
        <Scene {cubePosition} />
    </div>
</div>

<style>
    .canvas-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; /* Place canvas behind all other content */
    }

    
</style>


